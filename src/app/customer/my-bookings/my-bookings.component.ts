import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BookingService } from 'src/app/shared/services/booking.service';
import { TableService } from 'src/app/shared/services/table.service';
import { BookingTable } from 'src/app/shared/models/table.model';
import { Bookings } from 'src/app/shared/models/booking';
import { Observable } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss'],
  providers: [DatePipe],

  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0%)'
      })),
      state('out', style({
        transform: 'translateX(-100%)'
      })),
      transition('in => out', animate('300ms ease-out')),
      transition('out => in', animate('300ms ease-in'))
    ])
  ]
})
export class MyBookingsComponent implements OnInit {
  public tables: BookingTable[] = [];
  public bookings: Bookings[] = [];
  public futureBookings: Bookings[] = [];
  public pastBookings: Bookings[] = [];
  public minDate: string = '';
  public bookedTables: Record<string, string[]> = {};
  public searchForm!: FormGroup;

  @HostBinding('@slideInOut') showMenuState = 'out';

    showMenu = false;
    toggleMenu() {
      this.showMenu = !this.showMenu;
    }
  constructor(private bookingsService: BookingService, private tableService: TableService, private datePipe: DatePipe, private authService: AuthService, private router: Router) {}

  bookingForm = new FormGroup({
    date: new FormControl('', [Validators.required]),
    table_name: new FormControl('', [Validators.required])
  });

  addBooking() {
    const dateValue: Date | undefined = this.bookingForm.value.date
        ? new Date(this.bookingForm.value.date)
        : undefined;

    const selectedTableId: string | null | undefined = this.bookingForm.value.table_name;

    if (dateValue && selectedTableId !== null && selectedTableId !== undefined) {
        const selectedTable = this.tables.find((table) => table.id === selectedTableId);

        if (selectedTable && !selectedTable.unavailable) {
            const tableNumber: string = selectedTable.number;
            const tableName: string = `${tableNumber}`;

            this.minDate = ''; // Reset minDate when booking is successful

            this.bookingsService.addBookings({
                id: '',
                date: dateValue,
                table_name: tableName
            }).subscribe(() => {
                // this.loadMenus();
                selectedTable.unavailable = true;

                // Update bookedTables data structure
                const formattedDate = this.datePipe.transform(dateValue, 'yyyy-MM-dd') || '';
                if (formattedDate) {
                    this.bookedTables[formattedDate] = this.bookedTables[formattedDate] || [];
                    this.bookedTables[formattedDate].push(selectedTable.id);
                }

                this.setMinDate(); // Update minDate after successful booking
                this.resetForm(); // Reset the form after a successful booking
            });

        } else {
            console.error('Selected table not found or already booked');
        }
    } else {
        console.error('Date or selected table ID is undefined or null');
    }
}

  resetForm() {
    this.bookingForm.reset(); // Reset the form to its initial state
  }

  setMinDate() {
    const currentDate = new Date();
    this.minDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd') || '';
  }

  loadMenus() {
    this.bookingsService.getBookings().subscribe((data: Bookings[]) => {
      const currentDate = new Date();
  
      this.futureBookings = data.filter(booking => {
        const bookingDate = new Date(booking.date);
        return bookingDate >= currentDate;
      });
  
      this.pastBookings = data.filter(booking => {
        const bookingDate = new Date(booking.date);
        return bookingDate < currentDate;
      });
    });
    
  }

  loadTables() {
    this.tableService.getBookingTables().subscribe(tables => {
      this.tables = tables.map((table) => ({ ...table, unavailable: false }));
    });
  }

  isTableBooked(tableId: string, selectedDate: string | null | undefined): boolean {
    const formattedDate = selectedDate ? this.datePipe.transform(new Date(selectedDate), 'yyyy-MM-dd') || '' : '';
    return !!formattedDate && !!this.bookedTables[formattedDate]?.includes(tableId);
  }
  
  loadBookedTables() {
    this.bookingsService.getBookedTables().subscribe((data: Record<string, string[]>) => {
      this.bookedTables = data;
    });
  }  

  searchBookings() {
    console.log('Search date:', this.searchForm.value.searchDate);
    const searchDate: Date | undefined = this.searchForm.value.searchDate
      ? new Date(this.searchForm.value.searchDate)
      : undefined;
  
    if (searchDate) {
      const formattedSearchDate = this.datePipe.transform(searchDate, 'yyyy-MM-dd') || '';
  
      this.bookingsService.getBookings().subscribe((data: Bookings[]) => {
        const filteredBookings = data.filter(booking => {
          const bookingDate = this.datePipe.transform(new Date(booking.date), 'yyyy-MM-dd') || '';
          return bookingDate === formattedSearchDate;
        });
  
        this.futureBookings = [];
        this.pastBookings = [];
  
        filteredBookings.forEach(booking => {
          const bookingDate = new Date(booking.date);
  
          if (bookingDate >= new Date()) {
            this.futureBookings.push(booking);
          } else {
            this.pastBookings.push(booking);
          }
        });
      });
    } else {
      // If searchDate is not provided, load all bookings
      this.loadMenus();
    }
    console.log('Future bookings:', this.futureBookings);
    console.log('Past bookings:', this.pastBookings);
  }
  
  onLogout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }


  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchDate: new FormControl('')
    });
  
    this.loadBookedTables();
    this.loadTables();
    this.loadMenus(); // Load all bookings initially
    this.setMinDate();
    console.log('Tables:', this.tables);
    console.log('Booked Tables:', this.bookedTables);
  }
  
  
  
}

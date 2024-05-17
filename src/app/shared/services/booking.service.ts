import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bookings } from '../models/booking';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private url='http://localhost:3333/api/bookings';
  
  constructor(private http:HttpClient){ }
  
  public getBookings(): Observable<Bookings[]>{
    return this.http.get<Bookings[]>(this.url);
  }
  
  getBookedTables(): Observable<Record<string, string[]>> {
    const url = `${this.url}`;
    return this.http.get<Record<string, string[]>>(url);
  }
  

  public addBookings(booking:Bookings){
    return this.http.post<Bookings>(this.url, booking);
  }
}

import { Component, HostBinding, OnInit } from '@angular/core';
import { Menu } from 'src/app/shared/models/menu.model';
import { MenuService } from 'src/app/shared/services/menu.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Order } from 'src/app/shared/models/order.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})

export class MyOrdersComponent implements OnInit {
  menus: Menu[] = [];
  orders: Order[] = [];
  display: boolean = false;
  displayAddNewItem: boolean = true;
  totalOrderDisplay: boolean = false;
  public editingOrder?:Order;

  @HostBinding('@slideInOut') showMenuState = 'out';

  showMenu = false;

  orderForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required])
  });

  editForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService, private menuService: MenuService, private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.loadMenus();
    this.loadOrders();
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  loadMenus() {
    this.menuService.getMenus().subscribe(
      (menus: Menu[]) => {
        this.menus = menus;
      },
      (error) => {
        console.error('Error loading menus', error);
      }
    );
  }

  editOrders(order:Order){
    this.editingOrder = order;

    this.editForm.setValue({
      name:this.editingOrder.name,
      quantity:this.editingOrder.quantity
    });
  }

  loadOrders() {
    this.orderService.getOrders().subscribe(o => {
      this.orders = o;
    });
  }

  updateOrder(){
    if(this.editingOrder){
      const updatedOrder:Order={
        id: this.editingOrder.id,
        name: this.editForm.value.name || '' ,
        quantity: this.editForm.value.quantity || ''
      };
      this.orderService.updateOrders(updatedOrder).subscribe(()=>{
        this.editingOrder=undefined;
        this.loadMenus();
      });
    }
  }

  cancelEditOrders(){
    this.editingOrder=undefined;
  }

  deleteOrders(id:string){
    this.orderService.deleteOrders(id).subscribe(()=>{
      this.loadOrders();
    })
  }

 addOrders() {
    const selectedOrderId: string | null | undefined = this.orderForm.value.name;

    if (selectedOrderId !== null && selectedOrderId !== undefined) {
      const selectedMenu = this.menus.find((menu) => menu.id === selectedOrderId);

      if (selectedMenu) {
        const newOrder: Order = {
          id: '',
          name: `${selectedMenu.name} - ${selectedMenu.price}`,
          quantity: this.orderForm.value.quantity!,
        };

        this.orderService.addOrders(newOrder).subscribe(() => {
          this.loadOrders();
          this.calculateTotalPrice();
          this.orderForm.reset();
          
          this.display = false;
        });

      } else {
        console.error('Selected menu not found');
      }
    } else {
      console.error('Selected menu ID or quantity is undefined or null');
    }
  }

  confirmOrder() {
    this.displayAddNewItem = false;
    this.totalOrderDisplay = true;
  }

  calculateTotalPrice() {
    const totalPrice = this.orders.reduce((total, order) => {
      const price = parseFloat(order.name.split('-')[1].trim());
      const quantity = parseInt(order.quantity, 10);
      return total + (price * quantity);
    }, 0);

    console.log('Total Price:', totalPrice);
  }

  getTotalPrice(): number {
    return this.orders.reduce((total, order) => {
      const price = parseFloat(order.name.split('-')[1].trim());
      const quantity = parseInt(order.quantity, 10);
      return total + (price * quantity);
    }, 0);
  }

  showDialog() {
    this.display = true;
  }

  onLogout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
  
}

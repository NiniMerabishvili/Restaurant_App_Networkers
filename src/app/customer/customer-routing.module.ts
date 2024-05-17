import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

const routes: Routes = [{
  path: 'customer',
  children: [
    {
      path: 'dashboard',
      component: CustomerDashboardComponent
    },
      {path: 'my-bookings',
      component: MyBookingsComponent},
     { path: 'my-orders',
      component: MyOrdersComponent,}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }

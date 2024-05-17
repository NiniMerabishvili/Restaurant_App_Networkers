import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { CustomerDashboardComponent } from './customer/customer-dashboard/customer-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { TableManagementComponent } from './admin/table-management/table-management.component';
import { MenuManagementComponent } from './admin/menu-management/menu-management.component';
import { MyBookingsComponent } from './customer/my-bookings/my-bookings.component';
import { MyOrdersComponent } from './customer/my-orders/my-orders.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'registration', component: RegistrationComponent},
  { path: 'sign-in', component: SignInComponent},
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'customer', component: CustomerDashboardComponent },
  { path: 'table-management', component:TableManagementComponent},
  { path: 'menu-management', component:MenuManagementComponent},
  { path: 'my-bookings', component:MyBookingsComponent},
  { path: 'my-orders', component:MyOrdersComponent},
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'app-page', component: AppComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

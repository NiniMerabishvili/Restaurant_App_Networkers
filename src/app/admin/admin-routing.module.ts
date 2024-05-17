import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TableManagementComponent } from './table-management/table-management.component';

const routes: Routes = [{
  path: 'admin',
  children: [
    {
      path: 'dashboard',
      component: AdminDashboardComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

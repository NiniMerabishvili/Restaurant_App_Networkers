import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { TableManagementComponent } from './table-management/table-management.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuManagementComponent } from './menu-management/menu-management.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    TableManagementComponent,
    MenuManagementComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule
  ]
})
export class AdminModule { }

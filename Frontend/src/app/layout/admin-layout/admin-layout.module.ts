import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './admin-layout.component';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AddAnalystComponent } from 'src/app/pages/add-analyst/add-analyst.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardModule } from 'src/app/pages/dashboard/dashboard.module';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    AdminLayoutComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    AddAnalystComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule ,
    NgxPaginationModule,
    CommonModule,
    DashboardModule,
    RouterModule
  ],
  exports: [AdminLayoutComponent]
})
export class AdminLayoutModule {}

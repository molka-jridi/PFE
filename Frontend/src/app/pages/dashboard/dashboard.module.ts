import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    NgxPaginationModule,
    CommonModule,
    FormsModule,
    NgChartsModule
  ],
  providers: [DecimalPipe]
})
export class DashboardModule {}

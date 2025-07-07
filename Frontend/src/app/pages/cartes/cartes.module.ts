import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartesComponent } from './cartes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [CartesComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,           
    ReactiveFormsModule

  ]
})
export class CartesModule {}

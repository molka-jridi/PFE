import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';        // directives Angular communes
import { FormsModule, ReactiveFormsModule } from '@angular/forms';          // si tu utilises [(ngModel)]
import { ComptesComponent } from './comptes.component'; // ton composant
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    ComptesComponent,      
  ],
  imports: [
    CommonModule,
    FormsModule ,
    NgxPaginationModule,
    ReactiveFormsModule         
  ],
  
})
export class ComptesModule { }

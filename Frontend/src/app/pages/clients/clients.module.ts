import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule} from '@angular/forms';
import { ClientsComponent } from './clients.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ClientsComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgxPaginationModule
    
    
  ]
})
export class ClientsModule { }

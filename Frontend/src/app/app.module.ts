import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AuthLayoutModule } from './layout/auth-layout/auth-layout.module';
import { AdminLayoutModule } from './layout/admin-layout/admin-layout.module';

import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { ClientsModule } from './pages/clients/clients.module';
import { ComptesModule } from './pages/comptes/comptes.module';
import { CartesModule } from './pages/cartes/cartes.module';
import { CreditsModule } from './pages/credits/credits.module';
import { ProfilComponent } from './pages/profil/profil.component';



@NgModule({
  declarations: [
    AppComponent,
    ProfilComponent,
  
 
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    AuthLayoutModule,
    AdminLayoutModule,
    ClientsModule,
    CartesModule,
    CreditsModule,
    ComptesModule
    
  ],
  providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
]
,
  bootstrap: [AppComponent]
})
export class AppModule { }

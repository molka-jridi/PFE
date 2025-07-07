import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';

import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { AddAnalystComponent } from './pages/add-analyst/add-analyst.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { CartesComponent } from './pages/cartes/cartes.component';
import { ComptesComponent } from './pages/comptes/comptes.component';
import { CreditsComponent } from './pages/credits/credits.component';
import { ActivateAccountComponent } from './auth/activate-account/activate-account.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfilComponent } from './pages/profil/profil.component';

const routes: Routes = [
  // ✅ Redirection par défaut vers login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'activate-account', component: ActivateAccountComponent }
    ]
  },

  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'profil', component: ProfilComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'addanalyste', component: AddAnalystComponent },
      { path: 'client', component: ClientsComponent },
      { path: 'cartes', component: CartesComponent },
      { path: 'credits', component: CreditsComponent },
      { path: 'comptes', component: ComptesComponent }
    ]
  },

  // ✅ Redirection si la route n’existe pas
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

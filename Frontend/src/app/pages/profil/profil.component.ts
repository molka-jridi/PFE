import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  firstname: string = '';
  lastname: string = '';
  email: string = '';
  roles: string[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserFromToken();
  }

  loadUserFromToken(): void {
    const user = this.authService.getUserFromToken();
    if (user) {
      this.firstname = user.firstname || '---';
      this.lastname = user.lastname || '---';
      this.email = user.email || '';
      this.roles = user.roles || [];
    }
  }
}

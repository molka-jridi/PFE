import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  @Output() openModal = new EventEmitter<void>();
  fullName: string = '';
 constructor(public authService: AuthService) {} 
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.fullName = payload['fullName'] || 'Utilisateur';
    }
  }

  emitAddAnalystModal() {
    this.openModal.emit();
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
}

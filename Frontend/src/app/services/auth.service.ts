import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8081/api/v1/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(data: { email: string; password: string }) {
  return this.http.post<any>(`${this.apiUrl}/authenticate`, data).pipe(
    tap((res) => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('firstname', res.firstname);  // 👈
      localStorage.setItem('lastname', res.lastname);    // 👈
      localStorage.setItem('email', res.email);          // 👈
    })
  );
}


  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data); // Réservé à l'admin
  }

  activateAccount(token: string) {
    return this.http.get(`${this.apiUrl}/activate-account?token=${token}`);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
getUserRole(): string | null {
  const token = this.getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));

    if (payload.roles && Array.isArray(payload.roles)) {
      return payload.roles[0] || null;  // retourne le premier rôle
    }

    return null;
  } catch {
    return null;
  }

}
getUserFromToken(): any {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const payload = JSON.parse(atob(token.split('.')[1]));
  return {
    email: payload.sub,
    firstname: payload.firstname,
    lastname: payload.lastname,
    roles: payload.roles || []
  };
}


getFullName(): string {
  const token = localStorage.getItem('token');
  if (!token) return '';
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload['fullName'] || '';
}

isAdmin(): boolean {
  const token = localStorage.getItem('token');
  if (!token) return false;

  const payload = JSON.parse(atob(token.split('.')[1]));
  const authorities = payload['authorities'] || [];
  return authorities.includes('ADMIN'); // ou 'ROLE_ADMIN' selon ton backend
}

getUsers() {
  return this.http.get(`${this.apiUrl}/users`);
}

resendToken(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/resend-token`, null, {
      params: { email },
      responseType: 'text' 
    });
  }
  

}

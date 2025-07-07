import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:8081/api/users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  createAnalyst(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-analyst`, user);
  }

  updateAnalyst(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  upgradeToAdmin(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/upgrade/${id}`, {});
  }
  downgradeToAnalyst(id: number): Observable<any> {
  return this.http.post(`${this.apiUrl}/downgrade/${id}`, {});
}


}

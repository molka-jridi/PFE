import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Credit {
  numCre?: number;
  numCptDeb?: number;
  statutCredit?: string;
  mntCre?: number;
  tauInt?: number;
  durRem?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CreditService {
  private apiUrl = 'http://localhost:8081/api/dimcredit';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Credit[]> {
    return this.http.get<Credit[]>(`${this.apiUrl}/all`);
  }

  create(credit: Credit): Observable<Credit> {
    return this.http.post<Credit>(`${this.apiUrl}/create`, credit);
  }

  update(id: number, credit: Credit): Observable<Credit> {
    return this.http.put<Credit>(`${this.apiUrl}/update/${id}`, credit);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}

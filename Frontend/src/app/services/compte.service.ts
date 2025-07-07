import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Compte {
  numCpt?: number;
  datOuvCpt?: string;
  codDev?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CompteService {
  private apiUrl = 'http://localhost:8081/api/dimcompte';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Compte[]> {
    return this.http.get<Compte[]>(`${this.apiUrl}/all`);
  }

  create(compte: Compte): Observable<Compte> {
    return this.http.post<Compte>(`${this.apiUrl}/create`, compte);
  }

  update(id: number, compte: Compte): Observable<Compte> {
    return this.http.put<Compte>(`${this.apiUrl}/update/${id}`, compte);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}

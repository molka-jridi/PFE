// src/app/services/carte.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Carte {
dateEmission: string|number|Date;
typeCarte: any;
plafond: any;
  numCar: number;
  codSta: number;
  datFinVal: string;
  plaAutPai: number;
  plaAutRet: number;
  annule: boolean;
  dateMigration: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarteService {
  private apiUrl = 'http://localhost:8081/api/dimcarte'; 
  
  constructor(private http: HttpClient) {}

  getAll(): Observable<Carte[]> {
    return this.http.get<Carte[]>(`${this.apiUrl}/all`);
  }

  create(carte: Carte): Observable<Carte> {
    return this.http.post<Carte>(`${this.apiUrl}/create`, carte);
  }

  update(id: number, carte: Carte): Observable<Carte> {
    return this.http.put<Carte>(`${this.apiUrl}/update/${id}`, carte);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}

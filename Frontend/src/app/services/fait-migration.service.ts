// ✅ FaitMigrationService (Angular)
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FaitMigrationService {
  private baseUrl = 'http://localhost:8081/api/faitmigrations';

  constructor(private http: HttpClient) {}

  getRepartitionMigres() {
    return this.http.get<{ [key: string]: number }>(`${this.baseUrl}/stats/repartition`);
  }

  getNbProduits() {
    return this.http.get<{ [key: number]: number }>(`${this.baseUrl}/stats/nb-produits`);
  }

  getRisqueParAnciennete() {
    return this.http.get<{ [key: number]: number }>(`${this.baseUrl}/stats/risque-par-anciennete`);
  }

  getAllFaitMigrations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  getMigrationsParAnnee(): Observable<{ [key: number]: number }> {
    return this.http.get<{ [key: number]: number }>(`${this.baseUrl}/stats/migrations-par-annee`);
  }

  getTauxDefaultParAnciennete(): Observable<{ [key: number]: number }> {
    return this.http.get<{ [key: number]: number }>(`${this.baseUrl}/stats/taux-default-par-anciennete`);
  }

  getRepartitionParDureeMigration(): Observable<{ [key: number]: number }> {
    return this.http.get<{ [key: number]: number }>(`${this.baseUrl}/stats/repartition-par-duree-migration`);
  }

  getRepartitionParAnciennete(): Observable<{ [key: number]: number }> {
    return this.http.get<{ [key: number]: number }>(`${this.baseUrl}/stats/repartition-par-anciennete`);
  }

  getTauxCartesAnnuleesParAnciennete(): Observable<{ [key: number]: number }> {
    return this.http.get<{ [key: number]: number }>(`${this.baseUrl}/stats/taux-cartes-annulees-par-anciennete`);
  }

  // ✅ Nouveau endpoint : total, migrés, taux de migration
  getStatistiquesGlobales(): Observable<{
    totalClients: number;
    migratedClients: number;
    migrationRate: number;
  }> {
    return this.http.get<{ totalClients: number; migratedClients: number; migrationRate: number }>(
      `${this.baseUrl}/stats/global`
    );
  }
  getMontantParStatutCredit(): Observable<{ [key: string]: number }> {
  return this.http.get<{ [key: string]: number }>(
    `${this.baseUrl}/stats/montant-par-statut`
  );
}

  
}

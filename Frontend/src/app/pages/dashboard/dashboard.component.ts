import { Component, OnInit } from '@angular/core';
import { FaitMigrationService } from 'src/app/services/fait-migration.service';
import { ChartConfiguration, ChartType, ChartData } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  totalClients = 0;
  migratedClients = 0;
  migrationRate = 0;
  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  sortDirection: 'asc' | 'desc' = 'asc';


  allClients: any[] = [];
  filteredClients: any[] = [];
  selectedRisk: string = 'ALL';

  chartConfigs: {
    title: string;
    type: ChartType;
    data: ChartData;
    options?: ChartConfiguration['options'];
    visible: boolean;
  }[] = [];

  constructor(private migrationService: FaitMigrationService) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadCharts();
    this.loadClients();
  }

  loadStats(): void {
    this.migrationService.getStatistiquesGlobales().subscribe(stats => {
      this.totalClients = stats?.totalClients ?? 0;
      this.migratedClients = stats?.migratedClients ?? 0;
      this.migrationRate = stats?.migrationRate ?? 0;
    });
  }

  loadCharts(): void {
    const COLORS = ['#2ecc71', '#e74c3c', '#3498db', '#9b59b6', '#f1c40f', '#1abc9c'];
    const SINGLE_COLOR = '#3498db';

    // 1. Doughnut - Répartition des Migrés
    this.migrationService.getRepartitionMigres().subscribe(data => {
      this.chartConfigs.push({
        title: 'Répartition des Migrés',
        type: 'doughnut',
        data: {
          labels: Object.keys(data),
          datasets: [{
            data: Object.values(data),
            backgroundColor: ['#2ecc71', '#e74c3c']
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { position: 'bottom' } }
        },
        visible: true
      });
    });

    // 2. Line - Risque Moyen par Ancienneté
    this.migrationService.getRisqueParAnciennete().subscribe(data => {
      this.chartConfigs.push({
        title: 'Risque Moyen par Ancienneté',
        type: 'line',
        data: {
          labels: Object.keys(data).map(key => `${key} ans`),
          datasets: [{
            label: 'Risque Moyen',
            data: Object.values(data),
            borderColor: '#e67e22',
            backgroundColor: 'rgba(230, 126, 34, 0.2)',
            fill: true,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          scales: { y: { beginAtZero: true } }
        },
        visible: false
      });
    });

    // 3. Bar - Clients Migrés par Année (couleurs dynamiques)
    this.migrationService.getMigrationsParAnnee().subscribe(data => {
      this.chartConfigs.push({
        title: 'Clients Migrés par Année',
        type: 'bar',
        data: {
          labels: Object.keys(data),
          datasets: [{
            label: 'Clients Migrés',
            data: Object.values(data),
            backgroundColor: Object.values(data).map((_, i) => COLORS[i % COLORS.length])
          }]
        },
        options: {
          responsive: true,
          scales: { y: { beginAtZero: true } }
        },
        visible: false
      });
    });

    // 4. Horizontal Bar - Répartition par Durée de Migration
    this.migrationService.getRepartitionParDureeMigration().subscribe(data => {
      this.chartConfigs.push({
        title: 'Répartition par Durée de Migration',
        type: 'bar',
        data: {
          labels: Object.keys(data).map(k => `${k} mois`),
          datasets: [{
            label: 'Nombre de Clients',
            data: Object.values(data),
            backgroundColor: SINGLE_COLOR
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: { display: true, text: 'Nombre de Clients' }
            },
            x: {
              title: { display: true, text: 'Durée avant migration' }
            }
          }
        },
        visible: false
      });
    });

    // 5. Radar - Répartition par Ancienneté
    this.migrationService.getRepartitionParAnciennete().subscribe(data => {
      this.chartConfigs.push({
        title: 'Répartition par Ancienneté',
        type: 'radar',
        data: {
          labels: Object.keys(data).map(k => `${k} ans`),
          datasets: [{
            label: 'Nombre de Clients',
            data: Object.values(data),
            backgroundColor: 'rgba(52, 152, 219, 0.4)',
            borderColor: '#3498db',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { position: 'top' } }
        },
        visible: false
      });
    });

    // 6. Bar - Taux cartes annulées par ancienneté avec couleur dynamique
   this.migrationService.getMontantParStatutCredit().subscribe(data => {
      this.chartConfigs.push({
        title: 'Montant des Crédits par Statut',
        type: 'bar',
        data: {
          labels: Object.keys(data),
          datasets: [{
            label: 'Montant (en Dinars)',
            data: Object.values(data),
            backgroundColor: Object.keys(data).map((_, i) =>
              ['#3498db', '#2ecc71', '#f1c40f', '#e74c3c', '#9b59b6'][i % 5]
            )
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            tooltip: {
              callbacks: {
                label: (ctx: any) => `${ctx.dataset.label}: ${ctx.raw.toLocaleString()} DT`
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: { display: true, text: 'Montant Total' }
            },
            x: {
              title: { display: true, text: 'Statut Crédit' }
            }
          }
        },
        visible: false
      });
    });

  }

  loadClients(): void {
    this.migrationService.getAll().subscribe(clients => {
      this.allClients = clients;
      this.filteredClients = clients;
    });
  }

  applyFilter(): void {
    let base = this.allClients;

    if (this.selectedRisk !== 'ALL') {
      base = base.filter(client => {
        const score = client.scoreMoyenRisqueMigration ?? 0;
        if (this.selectedRisk === 'HIGH') return score >= 0.7;
        if (this.selectedRisk === 'MEDIUM') return score >= 0.3 && score < 0.7;
        return score < 0.3;
      });
    }

    this.filteredClients = base.filter(client =>
      client.nomClient?.toLowerCase().includes(this.searchText.toLowerCase()) ||
      client.codPer?.toString().includes(this.searchText)
    );
  }

  getRiskLabel(score: number): string {
    if (score >= 0.7) return 'Élevé';
    if (score >= 0.3) return 'Moyen';
    return 'Faible';
  }

  exportToCSV() {
    const header = ['Code', 'Nom', 'Score (%)', 'Risque'];
    const rows = this.filteredClients.map(client => [
      client.codPer,
      client.nomClient,
      (client.scoreMoyenRisqueMigration * 100).toFixed(2),
      this.getRiskLabel(client.scoreMoyenRisqueMigration)
    ]);

    const csvContent = [header, ...rows]
      .map(e => e.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'clients.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  sortByName() {
  const direction = this.sortDirection === 'asc' ? 1 : -1;
  this.filteredClients.sort((a, b) => {
    const nameA = (a.nomClient || '').toLowerCase();
    const nameB = (b.nomClient || '').toLowerCase();
    return nameA.localeCompare(nameB) * direction;
  });
  this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
}


}

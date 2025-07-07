import { Component, OnInit } from '@angular/core';
import { Carte, CarteService } from 'src/app/services/carte.service';
import { AuthService } from 'src/app/services/auth.service';
import { STATUTS_MAP } from 'src/app/constants/status-map';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cartes',
  templateUrl: './cartes.component.html',
  styleUrls: ['./cartes.component.scss']
})
export class CartesComponent implements OnInit {
  cartes: Carte[] = [];
  filteredCartes: Carte[] = [];
  selected: Carte = {} as Carte;
  showModal = false;
  isEdit = false;
  isAdmin = false;
  sortField: 'datFinVal' | 'dateMigration' | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';


  // Pagination
  page = 1;
  itemsPerPage = 10;

  // Recherche
  searchTerm: string = '';

  constructor(private carteService: CarteService, private authService: AuthService) {}

  ngOnInit(): void {
    this.load();
    this.checkAdminRole();
  }

  checkAdminRole() {
    const role = this.authService.getUserRole();
    this.isAdmin = role === 'ADMIN';
  }

  load() {
    this.carteService.getAll().subscribe(data => {
      this.cartes = data;
      this.applyFilter();
    });
  }

  applyFilter() {
    if (!this.searchTerm) {
      this.filteredCartes = this.cartes;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredCartes = this.cartes.filter(c =>
        c.numCar?.toString().toLowerCase().includes(term)
      );
    }
    this.page = 1;
  }

  openModal(carte?: Carte) {
    this.isEdit = !!carte;
    this.selected = carte ? { ...carte } : {} as Carte;
    this.showModal = true;
  }

  save() {
    const action = this.isEdit
      ? this.carteService.update(this.selected.numCar!, this.selected)
      : this.carteService.create(this.selected);

    action.subscribe(() => {
      this.load();
      this.showModal = false;
    });
  }

  remove(id: number) {
    Swal.fire({
      title: 'Suppression',
      text: 'Êtes-vous sûr de vouloir supprimer cette carte ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.carteService.delete(id).subscribe(() => {
          this.load();
          Swal.fire('Supprimée !', 'La carte a été supprimée.', 'success');
        });
      }
    });
  }

  getStatutLabel(code: number): string {
    return STATUTS_MAP[code] || 'Inconnu';
  }$sortByAnnule(value: boolean) {
  this.filteredCartes.sort((a, b) => {
    const aVal = a.annule === value ? 0 : 1;
    const bVal = b.annule === value ? 0 : 1;
    return aVal - bVal; // valeur triée vers le haut
  });
}
sortByAnnule(value: boolean) {
  this.filteredCartes.sort((a, b) => {
    const aVal = a.annule === value ? 0 : 1;
    const bVal = b.annule === value ? 0 : 1;
    return aVal - bVal; // valeur triée vers le haut
  });
}
sortByDate(field: 'datFinVal' | 'dateMigration') {
  if (this.sortField === field) {
    // Inverser le sens de tri si on clique encore
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortField = field;
    this.sortDirection = 'asc';
  }

  this.filteredCartes.sort((a, b) => {
    const dateA = new Date(a[field] || '');
    const dateB = new Date(b[field] || '');

    return this.sortDirection === 'asc'
      ? dateA.getTime() - dateB.getTime()
      : dateB.getTime() - dateA.getTime();
  });
}



}





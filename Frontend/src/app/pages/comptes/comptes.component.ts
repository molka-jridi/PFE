import { Component, OnInit } from '@angular/core';
import { CompteService, Compte } from 'src/app/services/compte.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
})
export class ComptesComponent implements OnInit {
  comptes: Compte[] = [];
  filteredComptes: Compte[] = [];
  selected: Compte = {} as Compte;
  showModal = false;
  isEdit = false;
  isAdmin = false;
  sortDirection: 'asc' | 'desc' = 'asc';

  // Pagination
  page = 1;
  itemsPerPage = 10;

  // Recherche
  searchTerm: string = '';

  constructor(
    private compteService: CompteService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.load();
    this.checkAdminRole();
  }

  checkAdminRole() {
    const role = this.authService.getUserRole();
    this.isAdmin = role === 'ADMIN';
  }

  load() {
    this.compteService.getAll().subscribe((data) => {
      this.comptes = data;
      this.applyFilter();
    });
  }

  applyFilter() {
    if (!this.searchTerm) {
      this.filteredComptes = this.comptes;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredComptes = this.comptes.filter((c) =>
        c.numCpt?.toString().toLowerCase().includes(term)
      );
    }
    this.page = 1;
  }

  openModal(compte?: Compte) {
    this.isEdit = !!compte;
    this.selected = compte ? { ...compte } : {} as Compte;
    this.showModal = true;
  }

  save() {
    const action = this.isEdit
      ? this.compteService.update(this.selected.numCpt!, this.selected)
      : this.compteService.create(this.selected);

    action.subscribe(() => {
      this.load();
      this.showModal = false;
    });
  }

  remove(id: number) {
    Swal.fire({
      title: 'Suppression',
      text: 'Êtes-vous sûr de vouloir supprimer ce compte ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        this.compteService.delete(id).subscribe(() => {
          this.load();
          Swal.fire('Supprimé !', 'Le compte a été supprimé.', 'success');
        });
      }
    });
  }
  sortByDate(): void {
  this.filteredComptes.sort((a, b) => {
    const dateA = a.datOuvCpt ? new Date(a.datOuvCpt).getTime() : 0;
    const dateB = b.datOuvCpt ? new Date(b.datOuvCpt).getTime() : 0;
    return this.sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
  });
  this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
}

}

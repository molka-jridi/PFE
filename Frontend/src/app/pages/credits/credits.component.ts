import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Credit, CreditService } from 'src/app/services/credit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
})
export class CreditsComponent implements OnInit {
  credits: Credit[] = [];
  filteredCredits: Credit[] = []; // tableau filtré
  selected: Credit = {} as Credit;
  showModal = false;
  isEdit = false;
  isAdmin = false;
  sortTauAsc: boolean = true;
  sortMontantAsc: boolean = true;
  sortDureeAsc: boolean = true;


  // Pagination
  page = 1;
  itemsPerPage = 10;

  // Recherche
  searchTerm: string = '';

  constructor(private creditService: CreditService, private authService: AuthService) {}

  ngOnInit(): void {
    this.load();
    this.checkAdminRole();
  }

  checkAdminRole() {
    const role = this.authService.getUserRole();
    this.isAdmin = role === 'ADMIN';
  }

  load() {
    this.creditService.getAll().subscribe(data => {
      this.credits = data;
      this.applyFilter(); // Appliquer le filtre à l'initialisation
    });
  }

  applyFilter() {
    if (!this.searchTerm) {
      this.filteredCredits = this.credits;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredCredits = this.credits.filter(c =>
        c.numCre?.toString().toLowerCase().includes(term)
      );
    }
    this.page = 1; // reset pagination à la 1ère page après filtrage
  }

  openModal(credit?: Credit) {
    this.isEdit = !!credit;
    this.selected = credit ? { ...credit } : {
      numCre: 0,
      numCptDeb: 0,
      statutCredit: '',
      mntCre: 0,
      tauInt: 0,
      durRem: 0,
    };
    this.showModal = true;
  }

  save() {
    const action = this.isEdit
      ? this.creditService.update(this.selected.numCre!, this.selected)
      : this.creditService.create(this.selected);

    action.subscribe(() => {
      this.load();
      this.showModal = false;
    });
  }

  remove(id: number) {
    Swal.fire({
      title: 'Suppression',
      text: 'Êtes-vous sûr de vouloir supprimer ce credit ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.creditService.delete(id).subscribe(() => {
          this.load();
          Swal.fire('Supprimé !', 'Le credit a été supprimé.', 'success');
        });
      }
    });
  }
  sortByTaux(): void {
  this.filteredCredits.sort((a, b) => {
    const valA = a.tauInt ?? 0;
    const valB = b.tauInt ?? 0;
    return this.sortTauAsc ? valA - valB : valB - valA;
  });
  this.sortTauAsc = !this.sortTauAsc;
}

sortByDuree(): void {
  this.filteredCredits.sort((a, b) => {
    const valA = a.durRem ?? 0;
    const valB = b.durRem ?? 0;
    return this.sortDureeAsc ? valA - valB : valB - valA;
  });
  this.sortDureeAsc = !this.sortDureeAsc;
}
sortByMontant(): void {
  this.filteredCredits.sort((a, b) => {
    const valA = a.mntCre ?? 0;
    const valB = b.mntCre ?? 0;
    return this.sortMontantAsc ? valA - valB : valB - valA;
  });
  this.sortMontantAsc = !this.sortMontantAsc;
}


}

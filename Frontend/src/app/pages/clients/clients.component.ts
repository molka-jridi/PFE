import { Component, OnInit } from '@angular/core';
import { Client, ClientService } from 'src/app/services/client.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  filteredClients: Client[] = [];
  selected: Client = {} as Client;
  showModal = false;
  isEdit = false;
  isAdmin = false;
  sortDirection: 'asc' | 'desc' = 'asc';


  // Pagination
  page = 1;
  itemsPerPage = 10;

  // Recherche
  searchTerm: string = '';

  constructor(private service: ClientService, private authService: AuthService) {}

  ngOnInit(): void {
    this.load();
    this.checkAdminRole();
  }

  checkAdminRole() {
    const role = this.authService.getUserRole();
    this.isAdmin = role === 'ADMIN';
  }

  load() {
    this.service.getAll().subscribe(data => {
      this.clients = data;
      this.applyFilter();
    });
  }

  applyFilter() {
    if (!this.searchTerm) {
      this.filteredClients = this.clients;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredClients = this.clients.filter(c =>
        c.nom?.toLowerCase().includes(term)
      );
    }
    this.page = 1;
  }

  openModal(client?: Client) {
    this.isEdit = !!client;
    this.selected = client ? { ...client } : {} as Client;
    this.showModal = true;
  }

  save() {
    const action = this.isEdit
      ? this.service.update(this.selected.id!, this.selected)
      : this.service.create(this.selected);

    action.subscribe(() => {
      this.load();
      this.showModal = false;
    });
  }

  remove(id: number) {
    Swal.fire({
      title: 'Suppression',
      text: 'Êtes-vous sûr de vouloir supprimer ce client ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe(() => {
          this.load();
          Swal.fire('Supprimé !', 'Le client a été supprimé.', 'success');
        });
      }
    });
  }
  sortByName() {
  const direction = this.sortDirection === 'asc' ? 1 : -1;
  this.filteredClients.sort((a, b) => {
    const nameA = (a.nom || '').toLowerCase();
    const nameB = (b.nom || '').toLowerCase();
    return nameA.localeCompare(nameB) * direction;
  });
  this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
}

}



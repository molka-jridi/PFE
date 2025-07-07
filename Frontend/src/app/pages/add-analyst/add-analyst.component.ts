import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-analyst',
  templateUrl: './add-analyst.component.html',
})
export class AddAnalystComponent implements OnInit {
  form!: FormGroup;
  showModal = false;
  analysts: any[] = [];
  filteredAnalysts: any[] = [];
  searchTerm: string = '';
  page = 1;
  itemsPerPage = 5;
  sortNomAsc: boolean = true;
  sortPrenomAsc: boolean = true;


  selectedAnalyst: any = null;
  isAdmin: boolean = false;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getAllUsers();
    this.checkAdminRole();
  }

  buildForm(): void {
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['']
    });
  }

  checkAdminRole(): void {
    this.isAdmin = this.authService.getUserRole() === 'ADMIN';
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.analysts = data;
        this.applyFilter();
      },
      error: (err) => console.error('Erreur chargement analystes', err)
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredAnalysts = this.analysts.filter(user =>
      user.roles?.some((r: any) => r.name === 'ANALYSTE') &&
      (
        !this.searchTerm ||
        user.firstname?.toLowerCase().includes(term) ||
        user.lastname?.toLowerCase().includes(term) ||
        user.email?.toLowerCase().includes(term)
      )
    );
    this.page = 1;
  }

  isAdminUser(user: any): boolean {
    return user.roles?.some((r: any) => r.name === 'ADMIN');
  }

  openModal(user?: any): void {
    this.showModal = true;
    this.isEdit = !!user;
    this.selectedAnalyst = user || null;
    this.form.reset();

    if (this.isEdit) {
      this.form.patchValue({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: ''
      });
      this.form.get('email')?.disable();
    } else {
      this.form.get('email')?.enable();
    }
  }

  onCancel(): void {
    this.showModal = false;
    this.form.reset();
    this.isEdit = false;
    this.selectedAnalyst = null;
  }

  save(): void {
    if (this.form.invalid) return;
    const formValue = this.form.getRawValue();

    if (this.isEdit) {
      const updatedUser = {
        ...this.selectedAnalyst,
        firstname: formValue.firstname,
        lastname: formValue.lastname,
      };

      this.userService.updateAnalyst(this.selectedAnalyst.id, updatedUser).subscribe({
        next: () => {
          Swal.fire('✅ Modifié', 'Utilisateur mis à jour.', 'success');
          this.getAllUsers();
          this.onCancel();
        },
        error: (err) =>
          Swal.fire('❌ Erreur', err.error?.message || 'Échec de la mise à jour.', 'error')
      });

    } else {
      this.userService.createAnalyst(formValue).subscribe({
        next: () => {
          Swal.fire('✅ Créé', 'Analyste ajouté.', 'success');
          this.getAllUsers();
          this.onCancel();
        },
        error: (err) =>
          Swal.fire('❌ Erreur', err.error?.message || 'Échec de la création.', 'error')
      });
    }
  }

  upgrade(id: number): void {
    Swal.fire({
      title: '🔐 Confirmer la promotion',
      text: 'Voulez-vous vraiment promouvoir cet utilisateur au rôle ADMIN ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, promouvoir',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.upgradeToAdmin(id).subscribe({
          next: () => {
            Swal.fire('✅ Succès', 'Utilisateur promu au rôle ADMIN.', 'success');
            this.getAllUsers();
          },
          error: (err) => {
            console.error('Erreur upgrade:', err);
            Swal.fire('❌ Erreur', err?.error || 'Échec de la promotion.', 'error');
          }
        });
      }
    });
  }



  delete(id: number): void {
    Swal.fire({
      title: '❗ Supprimer',
      text: 'Voulez-vous vraiment supprimer cet analyste ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe({
          next: () => {
            Swal.fire('🗑️ Supprimé', 'Utilisateur supprimé avec succès.', 'success');
            this.getAllUsers();
          },
          error: (err) =>
            Swal.fire('❌ Erreur', err.error?.message || 'Échec de la suppression.', 'error')
        });
      }
    });
  }
  unupgrade(id: number): void {
  Swal.fire({
    title: '❗ Supprimer le rôle ADMIN',
    text: 'Voulez-vous vraiment retirer le rôle ADMIN de cet utilisateur ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, retirer',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      this.userService.downgradeToAnalyst(id).subscribe({
        next: () => {
          Swal.fire('✅ Fait', 'Le rôle ADMIN a été retiré.', 'success');
          this.getAllUsers();
        },
        error: (err) => {
          Swal.fire('❌ Erreur', err?.error || 'Échec du retrait.', 'error');
        }
      });
    }
  });
}
sortByNom(): void {
  this.filteredAnalysts.sort((a, b) => {
    const nameA = a.lastname?.toLowerCase() || '';
    const nameB = b.lastname?.toLowerCase() || '';
    return this.sortNomAsc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });
  this.sortNomAsc = !this.sortNomAsc;
}

sortByPrenom(): void {
  this.filteredAnalysts.sort((a, b) => {
    const nameA = a.firstname?.toLowerCase() || '';
    const nameB = b.firstname?.toLowerCase() || '';
    return this.sortPrenomAsc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });
  this.sortPrenomAsc = !this.sortPrenomAsc;
}


}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
})
export class ActivateAccountComponent implements OnInit {
  activationForm = this.fb.group({
    token: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
  });

  email: string | null = null;
  message = '';
  error = '';
  loading = false;

  cooldown = 30; // secondes
  canResend = true;
  intervalId: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || localStorage.getItem('activationEmail');
      if (this.email) {
        localStorage.setItem('activationEmail', this.email);
      }
    });
  }

  get token() {
    return this.activationForm.get('token')!;
  }

  onSubmit(): void {
    if (this.activationForm.invalid) return;

    const token = this.token.value!;
    this.loading = true;

    this.authService.activateAccount(token).subscribe({
      next: () => {
        this.message = '✅ Activation réussie. Redirection vers la page de connexion...';
        this.error = '';
        setTimeout(() => {
          localStorage.removeItem('activationEmail');
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (err) => {
        this.loading = false;
        this.message = '';
        this.error =
          err.error?.businessErrorDescription ||
          err.error?.error ||
          '❌ Erreur lors de l’activation.';
      },
    });
  }

  resendCode(): void {
    if (!this.email) {
      this.error = 'Email manquant. Merci de vous réinscrire.';
      return;
    }

    this.loading = true;

    this.authService.resendToken(this.email).subscribe({
      next: () => {
        this.message = '📧 Code renvoyé avec succès à votre adresse email.';
        this.error = '';
        this.loading = false;
        this.startCooldown();
      },
      error: (err) => {
        this.message = '';
        this.loading = false;
        this.error =
          err.error?.businessErrorDescription ||
          err.error?.error ||
          '❌ Erreur lors du renvoi du code.';
      }
    });
  }

  startCooldown(): void {
    this.canResend = false;
    this.cooldown = 30;

    this.intervalId = setInterval(() => {
      this.cooldown--;

      if (this.cooldown <= 0) {
        this.canResend = true;
        clearInterval(this.intervalId);
      }
    }, 1000);
  }
}

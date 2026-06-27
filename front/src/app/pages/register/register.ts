import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { AuthService, ToastService } from '../../services';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterPage {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  email = '';
  password = '';
  confirmPassword = '';
  error = '';
  loading = signal(false);

  async submit(): Promise<void> {
    this.error = '';
    this.loading.set(true);

    if (this.password !== this.confirmPassword) {
      this.error = 'Las contraseñas no coinciden';
      this.mostrarMsjError();
      this.loading.set(false);
      return;
    }

    try {
      await firstValueFrom(this.authService.register({ email: this.email, password: this.password }));
      this.router.navigate(['/verify-pending']);
    } catch (err: any) {
      this.error = 'Error al registrarse';
      this.mostrarMsjError();
    } finally {
      this.loading.set(false);
    }
  }

  mostrarMsjError(){
    this.toastService.error({message: this.error});
  }
}

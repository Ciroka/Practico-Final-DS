import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { UsersService, ToastService, AuthService } from '../../services';

@Component({
  selector: 'app-change-email',
  imports: [FormsModule, RouterLink],
  templateUrl: './change-email.html',
  styleUrl: './change-email.css',
})
export class ChangeEmail {
  private usersService = inject(UsersService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  private authService = inject(AuthService);

  error = '';
  newEmail = '';
  password = '';
  loading = signal(false);
  showPassword = signal(false);

  async submit(): Promise<void> {
    this.loading.set(true);
    try {
      const res = await firstValueFrom(
        this.usersService.updateEmail({
          newEmail: this.newEmail,
          password: this.password,
        })
      );
      this.mostrarMsjExito(res.message);
      this.authService.logout();
    } catch (err: any) {
      this.error = err?.error?.message ?? 'Error al cambiar el email';
      this.mostrarMsjError();
      this.loading.set(false);
    }
  }

  mostrarMsjExito(message: string): void {
    this.toastService.success({ message });
  }

  mostrarMsjError(): void {
    this.toastService.error({ message: this.error });
  }

  togglePassword(): void {
    this.showPassword.update(v => !v);
  }
}
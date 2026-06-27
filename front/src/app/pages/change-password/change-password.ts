import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { UsersService, ToastService } from '../../services';

@Component({
  selector: 'app-change-password',
  imports: [FormsModule, RouterLink],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePasswordPage {
  private usersService = inject(UsersService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  error = '';
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  loading = signal(false);

  async submit(): Promise<void> {
    if (this.newPassword !== this.confirmPassword) {
      this.mostrarMsjError('Las contraseñas no coinciden');
      return;
    }

    this.loading.set(true);
    try {
      const res = await firstValueFrom(
        this.usersService.updatePassword({
          currentPassword: this.currentPassword,
          newPassword: this.newPassword,
        })
      );
      this.mostrarMsjExito(res.message);
      setTimeout(() => this.router.navigate(['/login']), 3000);
    } catch (err: any) {
      this.error = err?.error?.message ?? 'Error al cambiar la contraseña';
      this.mostrarMsjError(this.error);
    } finally {
      this.loading.set(false);
    }
  }

  mostrarMsjExito(message: string): void {
    this.toastService.success({ message });
  }

  mostrarMsjError(message: string): void {
    this.toastService.error({ message });
  }
}
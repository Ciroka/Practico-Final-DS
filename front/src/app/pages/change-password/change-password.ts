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
export class ChangePassword {
  private usersService = inject(UsersService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  error = '';
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  loading = signal(false);
  showPassword = signal(false);
  showNewPassword = signal(false);
  showNewConfirmPassword = signal(false);

  async submit(): Promise<void> {
    if (this.newPassword !== this.confirmPassword) {
      this.error = 'Las contraseñas no coinciden';
      this.mostrarMsjError();
      return;
    }

    if (this.currentPassword === this.newPassword) {
      this.error = 'No puedes cambiar la contraseña a la misma que ya estás usando';
      this.mostrarMsjError();
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
      setTimeout(() => this.router.navigate(['/']), 3000);
    } catch (err: any) {
      this.error = err?.error?.message ?? 'Error al cambiar la contraseña';
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

  toggleNewPassword(): void {
    this.showNewPassword.update(v => !v);
  }

  toggleNewConfirmPassword(): void {
    this.showNewConfirmPassword.update(v => !v);
  }
}
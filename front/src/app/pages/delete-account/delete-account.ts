import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { UsersService, ToastService } from '../../services';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-delete-account',
  imports: [FormsModule, RouterLink],
  templateUrl: './delete-account.html',
  styleUrl: './delete-account.css',
})
export class DeleteAccount {
  private usersService = inject(UsersService);
  private toastService = inject(ToastService);
  private authService = inject(AuthService);
  private router = inject(Router);

  password = '';
  loading = signal(false);
  error = '';

  async submit(): Promise<void> {
    this.loading.set(true);
    try {
      const res = await firstValueFrom(
        this.usersService.deleteAccount({ password: this.password })
      );

      this.authService.clearToken();
      this.mostrarMsjExito(res.message);
      setTimeout(() => {
        this.router.navigate(['/register']);
      }, 3000);
    } catch (err: any) {
      this.error = err?.error?.message ?? 'Error al eliminar la cuenta';
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
}
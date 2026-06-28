import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { AuthService, ToastService } from '../../services';
import { MessageResponse } from '../../interfaces';

@Component({
  selector: 'app-reset-password',
  imports: [FormsModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute)
  private toastService = inject(ToastService);

  password = '';
  confirmPassword = '';
  error = '';
  token: string | null = '';
  loading = signal(false);
  message!: MessageResponse;
  showPassword = signal(false);
  showConfirmPassword = signal(false);

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    if (!this.token) this.router.navigate(['/forgot-password']);
  }

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
      this.message = await firstValueFrom(this.authService.resetPassword({ token: this.token!, password: this.password }));
      this.mostrarMsjSuccess();

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2500);
    } catch (err: any) {
      this.error = err.error.message;
      this.mostrarMsjError();
    } finally {
      this.loading.set(false);
    }
  }

  togglePassword(): void {
    this.showPassword.update(v => !v);
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword.update(v => !v);
  }

  mostrarMsjError(): void {
    this.toastService.error({ message: this.error });
  }

  mostrarMsjSuccess(): void {
    this.toastService.success(this.message);
  }
}
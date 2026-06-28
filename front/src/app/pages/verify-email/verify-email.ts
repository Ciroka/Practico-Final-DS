import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { AuthService, ToastService } from '../../services';
import { MessageResponse } from '../../interfaces';

@Component({
  selector: 'app-verify-email',
  imports: [RouterLink],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.css',
})
export class VerifyEmail implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private router = inject(Router);
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private toastrService = inject(ToastService);

  message!: MessageResponse;
  status = signal(false);
  loading = signal(true);

  async ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!token) {
      this.router.navigate(["/"]);
      return;
    }

    try {
      this.message = await firstValueFrom(this.authService.verifyEmail({ token }));
      this.mostrarMsjExito();

      this.authService.clearToken();
      this.status.set(true);
    } catch (error: any) {
      const http = error as HttpErrorResponse;
      this.message = { message: http.error.message };
      this.mostrarMsjError();
      this.status.set(false);
    } finally {
      this.loading.set(false);
      this.intervalId = setInterval(() => {
        this.router.navigate(["/login"])
        clearInterval(this.intervalId!);
        this.intervalId = null;
      }, 3000);
    }
  }

  mostrarMsjExito() {
    this.toastrService.success(this.message);
  }

  mostrarMsjError() {
    this.toastrService.error(this.message);
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { firstValueFrom} from 'rxjs';

import { AuthService, ToastService } from '../../services';
import { MessageResponse } from '../../interfaces';

@Component({
  selector: 'app-verify-pending',
  imports: [RouterLink],
  templateUrl: './verify-pending.html',
  styleUrl: './verify-pending.css',
})
export class VerifyPending implements OnInit {
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private unlocksAt: number | null = Date.now() + 20000;
  private intervalId: ReturnType<typeof setInterval> | null = null;
  
  secondsLeft = signal(20);

  ngOnInit(): void {
    this.startCoundown();
  }

  get canResend(): boolean {
    return this.unlocksAt === null || Date.now() >= this.unlocksAt;
  }

  async resend(): Promise<void> {
    if (!this.canResend) return;  
    this.unlocksAt = Date.now() + 20000;
    this.startCoundown();
    const message = await firstValueFrom(this.authService.resendVerification());
    this.mostrarMsjInfo(message);
  }

  private startCoundown(): void {
    if (this.intervalId) clearInterval(this.intervalId);
    this.updateSecondsLeft();

    this.intervalId = setInterval(() => {
      this.updateSecondsLeft();

      if (this.canResend) {
        clearInterval(this.intervalId!);
        this.intervalId = null;
      }
    }, 1000);
  }
  
  private updateSecondsLeft(): void {
    if (!this.unlocksAt) return;
    const diff = Math.ceil((this.unlocksAt - Date.now()) / 1000);
    this.secondsLeft.set(Math.max(0, diff));
  }

  mostrarMsjInfo(message: MessageResponse): void {
    this.toastService.info(message);
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
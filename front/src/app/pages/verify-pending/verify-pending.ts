import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services';
import { firstValueFrom, interval } from 'rxjs';

@Component({
  selector: 'app-verify-pending',
  imports: [],
  templateUrl: './verify-pending.html',
  styleUrl: './verify-pending.css',
})
export class VerifyPending implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);

  // prueba con intervalo
  private unlocksAt: number | null = Date.now() + 20000;
  secondsLeft = signal(20);
  private intervalId: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.startCoundown();
  }

  get canResend() {
    return this.unlocksAt === null || Date.now() >= this.unlocksAt;
  }

  async resend() {
    if (!this.canResend) return;  
    this.unlocksAt = Date.now() + 20000;
    this.startCoundown();
    console.log(localStorage.getItem('access_token'));
    await firstValueFrom(this.authService.resendVerification());
  }

  private startCoundown() {
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

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}

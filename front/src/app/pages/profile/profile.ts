import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { MessageResponse } from '../../interfaces';
import { ToastService } from '../../services';

@Component({
  selector: 'app-profile',
  imports: [DatePipe, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class ProfilePage implements OnInit, OnDestroy {
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private unlocksAt: number | null = null;
  private toastService = inject(ToastService);

  authService = inject(AuthService);
  secondsLeft = signal(20);
  user = this.authService.getUser();
  message!: MessageResponse;

  ngOnInit(): void {
    this.startCoundown();
  }

  get canResend() {
    return this.unlocksAt === null || Date.now() >= this.unlocksAt;
  }

  async sendEmail() {
    if (!this.canResend) return;
    this.unlocksAt = Date.now() + 20000;
    this.startCoundown();
    this.message = await firstValueFrom(this.authService.resendVerification());
    this.mostrarMsjInfo();
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

  logout() {
    this.authService.logout();
  }

  maskEmail(): string {
    const [user, domain] = this.user()!.email.split('@');
    return `${user[0]}***${user[user.length - 1]}@${domain}`;
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  mostrarMsjInfo(){
    this.toastService.info(this.message);
  }
}

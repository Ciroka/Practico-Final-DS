import { Component, inject, OnInit, signal} from '@angular/core';
import { DatePipe} from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [DatePipe, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class ProfilePage {
  authService = inject(AuthService);
  private router = inject(Router);
  user = this.authService.getUser();
  private unlocksAt: number | null = null;
  secondsLeft = signal(20);
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private router = inject(Router);

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
  
  logout() {
    this.authService.logout()
  }

  goToChangePassword() {
    this.router.navigate(['/change-password']);
  }
 
  goToChangeEmail() {
    this.router.navigate(['/change-email']);
  }
  
  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}

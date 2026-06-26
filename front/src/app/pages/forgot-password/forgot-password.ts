import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { AuthMessageResponse } from '../../interfaces';

@Component({
    selector: 'app-forgot-password',
    imports: [FormsModule],
    templateUrl: './forgot-password.html',
    styleUrl: './forgot-password.css',
})
export class ForgotPasswordPage {
    private authService = inject(AuthService);
    password = '';
    message = signal<AuthMessageResponse | null>(null);
    email = '';

    private unlocksAt: number | null = null;
    secondsLeft = signal(20);
    private intervalId: ReturnType<typeof setInterval> | null = null;

    ngOnInit(): void {
        this.startCoundown();
    }

    get canResend() {
        return this.unlocksAt === null || Date.now() >= this.unlocksAt;
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

    async sendEmail() {
        if (!this.canResend) return;
        this.unlocksAt = Date.now() + 20000;
        this.startCoundown();
        this.message.set(await firstValueFrom(this.authService.forgotPassword(this.email)));
    }
}

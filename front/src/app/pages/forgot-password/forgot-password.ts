import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { AuthService, ToastService } from '../../services';
import { MessageResponse } from '../../interfaces';

@Component({
    selector: 'app-forgot-password',
    imports: [FormsModule],
    templateUrl: './forgot-password.html',
    styleUrl: './forgot-password.css',
})
export class ForgotPasswordPage {
    private authService = inject(AuthService);
    private intervalId: ReturnType<typeof setInterval> | null = null;
    private unlocksAt: number | null = null;
    private toastService = inject(ToastService);

    message = signal<MessageResponse | null>(null);
    email = '';
    secondsLeft = signal(20);

    ngOnInit(): void {
        this.startCoundown();
    }

    get canResend(): boolean {
        return this.unlocksAt === null || Date.now() >= this.unlocksAt;
    }

    async sendEmail() {
        if (!this.canResend) return;

        this.unlocksAt = Date.now() + 20000;
        this.startCoundown();
        this.message.set(await firstValueFrom(this.authService.forgotPassword({ email: this.email })));
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

    ngOnDestroy(): void {
        if (this.intervalId) clearInterval(this.intervalId);
    }

    mostrarMsjInfo(): void {
        this.toastService.info({ message: this.message()!.message });
    }
}
import { Component, inject, signal } from "@angular/core";
import { AuthService } from "../../services";
import { FormsModule } from "@angular/forms";
import { firstValueFrom } from "rxjs";
import { AuthMessageResponse } from "../../interfaces";

@Component({
    selector:'app-forgot-password',
    imports:[FormsModule],
    templateUrl: './forgot-password.html',
    styleUrl: './forgot-password.css', 
})
export class ForgotPasswordPage{
    private authService = inject(AuthService);
    password = '';
    message = signal<AuthMessageResponse | null>(null);
    email= '';

    async sendEmail(){
        this.message.set (await firstValueFrom(this.authService.forgotPassword(this.email)));
    }
}     
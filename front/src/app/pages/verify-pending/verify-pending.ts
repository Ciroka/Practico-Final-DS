import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-verify-pending',
  imports: [],
  templateUrl: './verify-pending.html',
  styleUrl: './verify-pending.css',
})
export class VerifyPending {
  private router = inject(Router);
  private authService = inject(AuthService);

  async resend(){
    await firstValueFrom(this.authService.resendVerification());
  }

}

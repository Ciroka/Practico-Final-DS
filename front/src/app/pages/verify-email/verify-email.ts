import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services';
import { firstValueFrom } from 'rxjs';
import { AuthMessageResponse } from '../../interfaces';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-verify-email',
  imports: [RouterLink],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.css',
})
export class VerifyEmail implements OnInit {
    private route = inject(ActivatedRoute);
    private authService = inject(AuthService);
    private router = inject(Router);
    message!: AuthMessageResponse;
    status = signal(false);
    loading = signal(true);

    async ngOnInit(){
      const token = this.route.snapshot.queryParamMap.get('token');
      if (!token) {
        this.router.navigate(["/"]); //preguntar al profe si esta bien
        return;
      }
      try {
        this.message = await firstValueFrom(this.authService.verifyEmail(token));
        this.status.set(true);
      } catch (error: any){
        const http = error as HttpErrorResponse;
        this.message = {message: http.error.message};
        this.status.set(false);
      }finally{
        this.loading.set(false);
      }
    }
}

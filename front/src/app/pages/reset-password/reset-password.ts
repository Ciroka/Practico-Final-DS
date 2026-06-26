import { Component, inject, OnInit, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../services';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthMessageResponse } from '../../interfaces';

@Component({
  selector: 'app-reset-password',
  imports: [FormsModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword implements OnInit{
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute)

  password = '';
  confirmPassword = '';
  error = '';
  token: string | null = '';
  loading = signal(false);
  message!: AuthMessageResponse;

  ngOnInit(){
      this.token = this.route.snapshot.queryParamMap.get('token');
      
  }
  
  async submit(): Promise<void> {
    this.error = '';
    this.loading.set(true);

    if (this.password !== this.confirmPassword) {
      this.error = 'Las contraseñas no coinciden';
      this.loading.set(false);
      return;
    }

    try {
      this.message = await firstValueFrom(this.auth.resetPassword(this.token! ,this.password));
      setTimeout(() => {
        this.router.navigate(['/login']);
    }, 2500);
    } catch (err: any) {
      this.error = err.error?.message || 'Error al actualizar la contraseña';
    } finally {
      this.loading.set(false);
    }
  }
}

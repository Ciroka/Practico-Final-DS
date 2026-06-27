import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { MessageResponse, AuthResponse, ForgotPasswordDto, LoginDto, RegisterDto, ResetPasswordDto, VerifyEmailDto } from '../interfaces/auth.interface';
import { SafeUser } from '../interfaces/user.interface';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = `${environment.apiUrl}/auth`;
  private readonly tokenKey = 'access_token';
  user = signal<SafeUser | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    const token = this.getToken();
    if (token) {
      this.me().subscribe();
    }
  }

  register(dto: RegisterDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/register`, dto).pipe(
    tap((res) => localStorage.setItem(this.tokenKey, res.access_token))
    );
  }

  login(dto: LoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/login`, dto).pipe(
      tap((res) => this.handleAuth(res)),
    );
  }

  me(): Observable<SafeUser> {
    return this.http.get<SafeUser>(`${this.api}/me`).pipe(
      tap((user) => this.user.set(user)),
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.user.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.user()?.role === 'admin';
  }

  verifyEmail(dto: VerifyEmailDto): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${this.api}/verify-email`, dto);
  }

  resendVerification(): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${this.api}/resend-verification`, {});
  }

  forgotPassword(dto: ForgotPasswordDto): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${this.api}/forgot-password`, dto);
  }

  resetPassword(dto: ResetPasswordDto): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${this.api}/reset-password`, dto);
  }

  private handleAuth(res: AuthResponse): void {
    localStorage.setItem(this.tokenKey, res.access_token);
    this.user.set(res.user);
  }

  getUser(){
    return this.user;
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
    this.user.set(null);
  }
}

import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { AuthMessageResponse, AuthResponse, LoginDto, RegisterDto } from '../interfaces/auth.interface';
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
    console.log('token:', token);
    console.log('token length:', token?.length);
    if (token) {
      this.me().subscribe();
    }
  }

  register(dto: RegisterDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/register`, dto);
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

  verifyEmail(token: string): Observable<{ message: string }> {
    return this.http.post<AuthMessageResponse>(`${this.api}/verify-email`, { token });
  }

  resendVerification(): Observable<void> {
    return this.http.post<void>(`${this.api}/resend-verification`, {});
  }

  forgotPassword(email: string): Observable<{ message: string }> {
    return this.http.post<AuthMessageResponse>(`${this.api}/forgot-password`, { email });
  }

  resetPassword(token: string, password: string): Observable<{ message: string }> {
    return this.http.post<AuthMessageResponse>(`${this.api}/reset-password`, { token, password });
  }

  private handleAuth(res: AuthResponse): void {
    localStorage.setItem(this.tokenKey, res.access_token);
    this.user.set(res.user);
  }

  getUser(){
    return this.user;
  }
}

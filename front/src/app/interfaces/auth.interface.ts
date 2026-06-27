import { SafeUser } from './user.interface';

export interface RegisterDto {
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: SafeUser;
  access_token: string;
}

export interface MessageResponse {
  message: string;
}

export interface ResetPasswordDto {
  token: string;
  password: string;
}

export interface VerifyEmailDto extends Omit<ResetPasswordDto, "password">{}

export interface ForgotPasswordDto extends Omit<LoginDto, "password">{}
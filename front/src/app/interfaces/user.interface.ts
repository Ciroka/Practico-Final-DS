export interface SafeUser {
  id: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  isVerified: boolean;
}

export type UserRole = 'admin' | 'user';

export interface UpdateUserRoleDto {
  role: UserRole;
}
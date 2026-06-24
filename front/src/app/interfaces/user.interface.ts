export interface SafeUser {
  id: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

export type UserRole = 'admin' | 'user';

export interface UpdateUserRoleDto {
  role: UserRole;
}
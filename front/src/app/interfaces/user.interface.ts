export type UserRole = 'admin' | 'user';

export interface SafeUser {
  id: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  isVerified: boolean;
}

export interface UpdateUserRoleDto {
  role: UserRole;
}

export interface UpdatePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateEmailDto {
  newEmail: string;
  password: string;
}

export interface DeleteAccountDto extends Omit<UpdateEmailDto, "newEmail"> {}
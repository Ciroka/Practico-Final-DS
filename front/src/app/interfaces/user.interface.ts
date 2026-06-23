export interface SafeUser {
  id: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

// export enum UserRole {
//     ADMIN = "admin",
//     USER = "user"
// }

export type UserRole = 'admin' | 'user';

export interface UpdateUserRoleDto {
  role: UserRole;
}
import { UserRole } from '../../user-role.enum';

export interface UserResponse {
  id: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}
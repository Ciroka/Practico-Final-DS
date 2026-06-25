import { UserRole } from '../../../users/user-role.enum';

export interface UserMeResponse {
    id: string;
    email: string;
    role: UserRole;
    createdAt: Date;
    isVerified: boolean;
}
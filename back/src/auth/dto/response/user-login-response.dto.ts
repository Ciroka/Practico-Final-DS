import { UserRole } from '../../../shared/enums';

export interface UserLoginResponse {
    user: {
        id: string;
        email: string;
        role: UserRole;
        createdAt: Date;
        isVerified: Boolean,
    };
    access_token: string;
}
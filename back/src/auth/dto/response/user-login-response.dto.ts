import { UserRole } from "../../../users/user-role.enum";

export interface UserLoginResponse {
    user: {
        id: string;
        email: string;
        role: UserRole;
        createdAt: Date;
    };
    access_token: string;
}
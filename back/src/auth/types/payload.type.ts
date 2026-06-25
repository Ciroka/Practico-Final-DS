import { UserRole } from '../../users/user-role.enum';

export type Payload = {
    sub: string;
    role: UserRole;
};
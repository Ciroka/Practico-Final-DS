import { AuthService } from "../services/auth.service";
import { UserRegister } from "../dto/userRegister.dto";
import { UserLogin } from "../dto/userLogin.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(userRegister: UserRegister): Promise<import("../../users/user.entity").UserEntity>;
    login(userLogin: UserLogin): Promise<{
        access_token: string;
    }>;
}

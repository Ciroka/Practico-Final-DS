import { Body, Controller, Inject, Post } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { UserRegister } from "../dto/user-register.dto";
import { UserLogin } from "../dto/user-login.dto";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Post("register")
    async register(@Body() userRegister: UserRegister){
        return this.authService.register(userRegister);
    }

    @Post("login")
    async login(@Body() userLogin: UserLogin){
        return this.authService.login(userLogin);
    }
}
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";

import { JwtAuthGuard } from "../../common/guards";
import { UserLoginRequest, UserRegisterRequest } from "../dto/request";
import { UserLoginResponse, UserMeResponse, UserRegisterResponse } from "../dto/response";
import { AuthService } from "../services/auth.service";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async me(): Promise<UserMeResponse> {
        return this.authService.me();
    }

    @Post("register")
    async register(@Body() userRegister: UserRegisterRequest): Promise<UserRegisterResponse> {
        return this.authService.register(userRegister);
    }

    @Post("login")
    async login(@Body() userLogin: UserLoginRequest): Promise<UserLoginResponse> {
        return this.authService.login(userLogin);
    }
}
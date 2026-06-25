import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../shared/guards';
import { UserLoginRequest, UserRegisterRequest, UserLoginResponse, UserMeResponse, UserRegisterResponse } from '../dto';
import { AuthService } from '../services/auth.service';
import { UserVerifyEmailDto } from '../dto/request/user-verify-email-request.dto';
import { UserMessageResponse } from '../dto/response/user-message-response.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async me(@Request() req: any): Promise<UserMeResponse> {
        return this.authService.me(req.user.sub);
    }

    @Post('register')
    async register(@Body() userRegister: UserRegisterRequest): Promise<UserRegisterResponse> {
        return this.authService.register(userRegister);
    }

    @Post('login')
    async login(@Body() userLogin: UserLoginRequest): Promise<UserLoginResponse> {
        return this.authService.login(userLogin);
    }

    @Post('verify-email')
    async verifyEmail(@Body() verificationToken: UserVerifyEmailDto): Promise<UserMessageResponse> {
        return this.authService.verifyEmail(verificationToken.token);
    }

    @Post('resend-verification')
    //Preguntar si esta metodo devuelve algo o algun message
    async resendVerification(@Request() req: any): Promise<void> {
        return this.authService.resendVerificationEmail(req.user.sub);
    }
}
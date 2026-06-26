import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../shared/guards';
import { UserLoginRequest, UserRegisterRequest, UserVerifyEmailRequest, UserLoginResponse, UserMeResponse, UserRegisterResponse, UserMessageResponse } from '../dto';
import { AuthService } from '../services/auth.service';
import { UserResetPassword } from '../dto/request/user-reset-passwrod-request.dto';
import { UserEmailRequest } from '../dto/request/user-email-request.dto';

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
    async verifyEmail(@Body() verificationToken: UserVerifyEmailRequest): Promise<UserMessageResponse> {
        return this.authService.verifyEmail(verificationToken.token);
    }

    @Post('resend-verification')
    @UseGuards(JwtAuthGuard)
    //Preguntar si esta metodo devuelve algo o algun message
    async resendVerification(@Request() req: any): Promise<void> {
        return this.authService.resendVerificationEmail(req.user.sub);
    }

    @Post('forgot-password')
    async forgotPassword(@Body() dto: UserEmailRequest): Promise<UserMessageResponse> {
        return this.authService.forgotPassword(dto.email);
    }

    @Post('reset-password')
    async resetPassword(@Body() dto: UserResetPassword ): Promise<UserMessageResponse> {
        return this.authService.resetPassword(dto.token, dto.password);
    }
}
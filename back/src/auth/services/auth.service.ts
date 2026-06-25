import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { Payload } from '../types/payload.type';
import { UserRole } from '../../shared/enums';
import { UserLoginRequest, UserRegisterRequest, UserLoginResponse, UserMeResponse, UserRegisterResponse, UserMessageResponse } from '../dto';
import { UsersService } from '../../users/services/users.service';
import { EmailSenderService } from '../../email-sender/services/email-sender.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly emailSenderService: EmailSenderService
    ) {}

    async register(userRegister: UserRegisterRequest): Promise<UserRegisterResponse> {
        const exists = await this.usersService.existsByEmail(userRegister.email);
        if (exists) throw new ConflictException("Email already exists.");

        const rounds = Number(this.configService.get<string>('BCRYPT_COST') ?? '12');
        const passwordHash = await bcrypt.hash(userRegister.password, rounds);
        const countUsers = await this.usersService.count();

        const role = countUsers === 0 ? UserRole.ADMIN : UserRole.USER;
        const verificationToken = crypto.randomUUID();

        const user = await this.usersService.register({
            email: userRegister.email.trim().toLowerCase(),
            passwordHash,
            role,
            verificationToken
        });
        await this.emailSenderService.sendEmailVerification(verificationToken, user.email);
        
        const payload: Payload = {
            sub: user.id,
            role: user.role
        };

        const access_token = this.jwtService.sign(payload);

        return {
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            },
            access_token
        };
    }

    async login(userLogin: UserLoginRequest): Promise<UserLoginResponse> {
        const user = await this.usersService.findOneByEmailWithPassword(userLogin.email);
        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const ok = await bcrypt.compare(userLogin.password, user.passwordHash);
        if (!ok) {
            throw new UnauthorizedException('Credenciales inválidas');
        };

        const payload: Payload = {
            sub: user.id,
            role: user.role
        };
        const access_token = this.jwtService.sign(payload);

        return {
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            },
            access_token
        };
    }

    async me(userId: string): Promise<UserMeResponse> {
        try {
            console.log(userId);
            const user = await this.usersService.findOneById(userId);
            return {
                id: user.id,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                isVerified: user.isVerified
            };
        } catch {
            throw new UnauthorizedException("Bro me");
        }
    }

    async verifyEmail(verificationToken: string):Promise<UserMessageResponse> {
        const user = await this.usersService.findOneByVerificationToken(verificationToken);
        if(!user) throw new BadRequestException("Token inválido o expirado");

        await this.usersService.verifyEmail(user);
        return { message: "Email verificado correctamente" };
    }

    async resendVerificationEmail(id: string) {
        const user = await this.usersService.findOneById(id);

        const token = crypto.randomUUID();
        user.verificationToken = token;
        
        await this.usersService.update(user);
        await this.emailSenderService.sendEmailVerification(token, user.email);
    }
}
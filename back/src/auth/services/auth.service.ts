import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { Payload } from '../../shared/payload.type';
import { UserRole } from '../../users/user-role.enum';
import { UserLoginRequest, UserRegisterRequest, UserLoginResponse, UserMeResponse, UserRegisterResponse } from '../dto';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) {}

    async register(userRegister: UserRegisterRequest): Promise<UserRegisterResponse> {
        const exists = await this.usersService.existsByEmail(userRegister.email);
        if (exists) throw new ConflictException("Email already exists.");

        const rounds = Number(this.configService.get<string>('BCRYPT_COST') ?? '12');
        const passwordHash = await bcrypt.hash(userRegister.password, rounds);
        const countUsers = await this.usersService.count();

        const role = countUsers === 0 ? UserRole.ADMIN : UserRole.USER;
        // const verificationToken = crypto.randomUUID();

        const user = await this.usersService.register({
            email: userRegister.email.trim().toLowerCase(),
            passwordHash,
            role,
            // verificationToken
        });
        // await this.emailService.sendVerificationEmail(user.email, verificationToken);
        // o algo así para el email.

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
            const user = await this.usersService.findOne(userId);
            return {
                id: user.id,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            };
        } catch {
            throw new UnauthorizedException("Bro me");
        }
    }
}
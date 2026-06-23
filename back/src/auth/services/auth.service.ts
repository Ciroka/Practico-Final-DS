import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { ConflictException, Injectable, NotImplementedException, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { Payload } from "../../shared/payload.type";
import { UserRole } from "../../users/user-role.enum";
import { UserLoginRequest, UserRegisterRequest } from "../dto/request";
import { UserLoginResponse, UserMeResponse, UserRegisterResponse } from "../dto/response";
import { UserEntity } from "../../users/entities/user.entity";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepo: Repository<UserEntity>,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) {}

    async register(userRegister: UserRegisterRequest): Promise<UserRegisterResponse> {
        const exists = await this.usersRepo.findOneBy({ email: userRegister.email });
        if (exists) throw new ConflictException("Email already exists.");

        const rounds = Number(this.configService.get<string>('BCRYPT_COST') ?? '12');
        const passwordHash = await bcrypt.hash(userRegister.password, rounds);
        const countUsers = await this.usersRepo.count();

        const role = countUsers === 0 ? UserRole.ADMIN : UserRole.USER;
        // const verificationToken = crypto.randomUUID();

        const user = this.usersRepo.create({
            email: userRegister.email.trim().toLowerCase(),
            passwordHash,
            role,
            // verificationToken
        });
        await this.usersRepo.save(user);
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
        const email = userLogin.email.trim().toLowerCase();
        const user = await this.usersRepo.createQueryBuilder('u')
                                        .addSelect('u.passwordHash')
                                        .where('u.email = :email', { email })
                                        .getOne();
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

    async me(): Promise<UserMeResponse> {
        throw new NotImplementedException();
    }
}
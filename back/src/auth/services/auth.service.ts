import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { UserRegister } from "../dto/user-register.dto";
import { UserEntity } from "../../users/user.entity";
import { UserRole } from "../../users/user-role.enum";
import { UserLogin } from "../dto/user-login.dto";


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepo: Repository<UserEntity>,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) {}

    async register(userRegister: UserRegister) {
        const exists = await this.usersRepo.findOneBy({ email: userRegister.email });
        if (exists) throw new ConflictException("Email already exists.");

        const rounds = Number(this.configService.get<string>('BCRYPT_COST') ?? '12');
        const passwordHash = await bcrypt.hash(userRegister.password, rounds);
        const countUsers = await this.usersRepo.count();
        const role = countUsers === 0 ? UserRole.ADMIN : UserRole.USER;

        const entity = this.usersRepo.create({
            email: userRegister.email.trim().toLowerCase(),
            passwordHash,
            role,
        });

        return this.usersRepo.save(entity);
    }

    async login(userLogin: UserLogin): Promise<{ access_token: string }> {
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

        const accessToken = this.jwtService.sign({
            sub: user.id,
            role: user.role,
        });

        return { access_token: accessToken };
    }
}
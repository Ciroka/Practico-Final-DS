import { ConflictException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRegister } from "src/auth/dto/userRegister.dto";
import { UserEntity } from "src/users/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { UserRole } from "src/users/user-role.enum";
import { JwtService } from "@nestjs/jwt";
import { UserLogin } from "src/auth/dto/userLogin.dto";


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepo: Repository<UserEntity>,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ){}

    async register(userRegister: UserRegister){
        const exists = await this.usersRepo.findOneBy({email: userRegister.email})
        if (exists) throw new ConflictException("Email already exists.")

        const rounds = Number(this.configService.get<string>('BCRYPT_COST') ?? '12');
        const passwordHash = await bcrypt.hash(userRegister.plainPassword, rounds);
        const countUsers = await this.usersRepo.count();
        const role = 
            countUsers === 0 ? UserRole.ADMIN : UserRole.USER;
        const entity = this.usersRepo.create({
            email: userRegister.email.trim().toLowerCase(),
            passwordHash,
            role,
        });
        return await this.usersRepo.save(entity);
    }

    async login(userLogin: UserLogin){
        const email = userLogin.email.trim().toLowerCase();
        const q = this.usersRepo.createQueryBuilder('u')
        .addSelect('u.passwordHash')
        .where('u.email = :email', { email });
        const user = await q.getOne();
        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }
        const ok = await bcrypt.compare(userLogin.plainPassword, user.passwordHash);
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
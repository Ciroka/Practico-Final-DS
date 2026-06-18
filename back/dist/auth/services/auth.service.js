"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../users/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_role_enum_1 = require("../../users/user-role.enum");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    usersRepo;
    configService;
    jwtService;
    constructor(usersRepo, configService, jwtService) {
        this.usersRepo = usersRepo;
        this.configService = configService;
        this.jwtService = jwtService;
    }
    async register(userRegister) {
        const exists = await this.usersRepo.findOneBy({ email: userRegister.email });
        if (exists)
            throw new common_1.ConflictException("Email already exists.");
        const rounds = Number(this.configService.get('BCRYPT_COST') ?? '12');
        const passwordHash = await bcrypt.hash(userRegister.plainPassword, rounds);
        const countUsers = await this.usersRepo.count();
        const role = countUsers === 0 ? user_role_enum_1.UserRole.ADMIN : user_role_enum_1.UserRole.USER;
        const entity = this.usersRepo.create({
            email: userRegister.email.trim().toLowerCase(),
            passwordHash,
            role,
        });
        return await this.usersRepo.save(entity);
    }
    async login(userLogin) {
        const email = userLogin.email.trim().toLowerCase();
        const q = this.usersRepo.createQueryBuilder('u')
            .addSelect('u.passwordHash')
            .where('u.email = :email', { email });
        const user = await q.getOne();
        if (!user) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const ok = await bcrypt.compare(userLogin.plainPassword, user.passwordHash);
        if (!ok) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        ;
        const accessToken = this.jwtService.sign({
            sub: user.id,
            role: user.role,
        });
        return { access_token: accessToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
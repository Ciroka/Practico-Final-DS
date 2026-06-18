import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/users/user.entity";
import { AuthService } from "./services/auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guards";
import { AuthController } from "./controller/auth.controller";

@Module({
    imports: [
        ConfigModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (cfg: ConfigService) => ({
                secret: cfg.getOrThrow<string>('JWT_SECRET'),
                signOptions: {
                expiresIn: Number(cfg.get<string>('JWT_EXPIRES_SEC') ?? '3600'),
                },
            }),
        }),
        TypeOrmModule.forFeature([UserEntity]),
    ],
    controllers: [AuthController],  
    providers: [
        AuthService,
        JwtStrategy,
        JwtAuthGuard,
        RolesGuard,
    ],
    exports: [
        JwtModule,
        JwtAuthGuard,
        RolesGuard,
    ],
})
export class AuthModule {}
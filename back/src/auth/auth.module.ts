import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGuard } from '../shared/guards/roles.guards';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';
import { UserEntity } from '../users/entities/user.entity';
import { EmailSenderModule } from '../email-sender/email-sender.module';

@Module({
    imports: [
        ConfigModule,
        EmailSenderModule,
        TypeOrmModule.forFeature([UserEntity]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.getOrThrow<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: Number(configService.get<string>('JWT_EXPIRES_SEC') ?? '3600'),
                }
            })
        })
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
        RolesGuard
    ]
})
export class AuthModule {}
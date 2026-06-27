import { DeepPartial } from 'typeorm';
import { BadGatewayException, BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserResponse, UserExternal, UpdateUserRoleDto } from '../dto';
import { USERS_GATEWAY, UsersGateway } from '../gateways/users.gateway';
import { IUsersRepository, USERS_REPOSITORY } from '../repositories/users.repository.interface';
import { UserEntity } from '../entities/user.entity';
import { UserChangePasswordDto } from '../dto/request/change-password.dto';
import { ConfigService } from '@nestjs/config';
import { UserMessageResponse } from 'src/auth/dto';
import { UserChangeEmailDto } from '../dto/request/user-change-email.dto';
import { UserDeleteAccountDto } from '../dto/request/user-delete-account.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_GATEWAY)
    private readonly usersGateway: UsersGateway,
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: IUsersRepository,
    private readonly configService: ConfigService,
  ) {}

  async findAllExt(): Promise<UserExternal[]> {
    try {
      return await this.usersGateway.fetchAll();
    } catch {
      throw new BadGatewayException('Upstream users service failed');
    }
  }

  async findOneByIdExt(id: number): Promise<UserExternal> {
    try {
      return await this.usersGateway.fetchById(id);
    } catch {
      throw new BadRequestException("Upstream users service failed");
    }
  }

  async findAll(): Promise<UserResponse[]> {
    return this.usersRepository.findAll();
  }

  async findOneById(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOneById(id);
    if (!user) throw new NotFoundException('User not found.');
    return user;
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    return this.usersRepository.findOneByEmail(email.trim().toLowerCase());
  }

  async findOneByEmailWithPassword(email: string): Promise<UserEntity | null> {
    return this.usersRepository.findOneByEmailWithPassword(email.trim().toLowerCase())
  }

  async findOneByVerificationToken(verificationToken: string): Promise<UserEntity | null> {
    return this.usersRepository.findOneByVerificationToken(verificationToken);
  } 

  async findOneByResetPasswordToken(resetPasswordToken: string): Promise<UserEntity | null> {
    return this.usersRepository.findOneByResetPasswordToken(resetPasswordToken);
  } 

  async count(): Promise<number> {
    return this.usersRepository.count();
  }

  async register(user: DeepPartial<UserEntity>): Promise<UserEntity> {
    return this.usersRepository.register(user);
  }

  async existsByEmail(email: string): Promise<boolean> {
    return this.usersRepository.existsByEmail(email.trim().toLowerCase());
  }

  async updateRole(id: string, dto: UpdateUserRoleDto): Promise<UserEntity> {
    const user = await this.findOneById(id);
    user.role = dto.role;
    return this.usersRepository.update(user);
  }

  async verifyEmail(user: UserEntity): Promise<void> {
    user.isVerified = true;
    user.verificationToken = null;
    await this.update(user);
  }
  
  async resetPassword(user: UserEntity): Promise<void> {
    user.isVerified = true;
    user.verificationToken = null;
    await this.update(user);
  }

  async update (user: DeepPartial<UserEntity>): Promise<void> {
    await this.usersRepository.update(user);
  }

  async updatePassword(id: string, dto: UserChangePasswordDto): Promise<UserMessageResponse> {
    const user = await this.usersRepository.findOneByIdWithPassword(id);
    if (!user || !(await bcrypt.compare(dto.currentPassword, user.passwordHash))) throw new UnauthorizedException("Credenciales inválidas");
    const rounds = Number(this.configService.get<string>('BCRYPT_COST') ?? '12');
    const passwordHash = await bcrypt.hash(dto.newPassword, rounds);

    user.passwordHash = passwordHash;
    await this.update(user);
    return {
      message: "Password updated"
    }
  }

  async updateEmail(id: string, dto: UserChangeEmailDto): Promise<UserMessageResponse> {
    const user = await this.usersRepository.findOneByIdWithPassword(id);
    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) throw new UnauthorizedException("Credenciales inválidas");

    user.email = dto.newEmail;

    await this.update(user);

    return {
      message: "Email updated"
    }
  }

  async deleteAccount(id: string, dto: UserDeleteAccountDto): Promise<UserMessageResponse> {
    const user = await this.usersRepository.findOneByIdWithPassword(id);
    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) throw new UnauthorizedException("Credenciales inválidas");
    await this.usersRepository.delete(user);
    return {
      message: "Account deleted"
    }
  }
}
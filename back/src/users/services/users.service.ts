import { DeepPartial } from 'typeorm';
import { BadGatewayException, BadRequestException, Inject, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';

import { ExternalUser } from '../user.types';
import { UserResponse } from '../types/user.type';
import { USERS_GATEWAY, UsersGateway } from '../gateways/users.gateway';
import { IUsersRepository, USERS_REPOSITORY } from '../repositories/users.repository.interface';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserRoleDto } from '../dto/update-user-role.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_GATEWAY)
    private readonly usersGateway: UsersGateway,
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: IUsersRepository
  ) {}

  async findAllExt(): Promise<ExternalUser[]> {
    try {
      return await this.usersGateway.fetchAll();
    } catch {
      throw new BadGatewayException('Upstream users service failed');
    }
  }

  async findOneByIdExt(id: number): Promise<ExternalUser> {
    try {
      return await this.usersGateway.fetchById(id);
    } catch {
      throw new BadRequestException("Upstream users service failed");
    }
  }

  async findAll(): Promise<UserResponse[]> {
    return this.usersRepository.findAll();
  }

  async findOne(id: string): Promise<UserEntity> {
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
    const user = await this.findOne(id);
    user.role = dto.role;
    return this.usersRepository.update(user);
  }
}
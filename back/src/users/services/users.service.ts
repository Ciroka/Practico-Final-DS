import { BadGatewayException, BadRequestException, Inject, Injectable } from '@nestjs/common';

import { USERS_GATEWAY, UsersGateway } from '../gateways/users.gateway';
import { ExternalUser } from '../user.types';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_GATEWAY)
    private readonly usersGateway: UsersGateway,
  ) {}

  async findAll(): Promise<ExternalUser[]> {
    try {
      return await this.usersGateway.fetchAll();
    } catch {
      throw new BadGatewayException('Upstream users service failed');
    }
  }

  async findOneById(id: number): Promise<ExternalUser> {
    try {
      return await this.usersGateway.fetchById(id);
    } catch {
      throw new BadRequestException("Upstream users service failed");
    }
  }
}


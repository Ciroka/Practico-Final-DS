import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guards';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../user-role.enum';
import { ExternalUser } from '../user.types';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  findAll(): Promise<ExternalUser[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ExternalUser> {
    return this.usersService.findOneById(Number(id));
  }
}
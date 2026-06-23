import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guards';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../user-role.enum';
import { ExternalUser } from '../user.types';
import { UsersService } from '../services/users.service';
import { UserResponse } from '../types/user.type';
import { UpdateUserRoleDto } from '../dto/update-user-role.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('externals')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  findAllExt(): Promise<ExternalUser[]> {
    return this.usersService.findAllExt();
  }
  
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async findAll(): Promise<UserResponse[]> {
    return this.usersService.findAll();
  }

  @Get('externals/:id')
  findOneExt(@Param('id') id: string): Promise<ExternalUser> {
    return this.usersService.findOneByIdExt(Number(id));
  }

  @Patch(':id/role')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async updateRole(@Param('id') id: string, dto: UpdateUserRoleDto): Promise<UserResponse> {
    console.log('update FRONT:')
    console.log(JSON.stringify(dto));
    console.log(dto.role);
    return this.usersService.updateRole(id, dto);
  }
}
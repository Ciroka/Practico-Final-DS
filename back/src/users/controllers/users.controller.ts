import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';

import { JwtAuthGuard, RolesGuard } from '../../shared/guards';
import { Roles } from '../../shared/decorators/roles.decorator';
import { UserRole } from '../../shared/enums';
import { UserExternal, UserResponse, UpdateUserRoleDto } from '../dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('externals')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  findAllExt(): Promise<UserExternal[]> {
    return this.usersService.findAllExt();
  }
  
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async findAll(): Promise<UserResponse[]> {
    return this.usersService.findAll();
  }

  @Get('externals/:id')
  findOneExt(@Param('id') id: string): Promise<UserExternal> {
    return this.usersService.findOneByIdExt(Number(id));
  }

  @Patch(':id/role')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async updateRole(@Param('id') id: string, @Body() dto: UpdateUserRoleDto): Promise<UserResponse> {
    return this.usersService.updateRole(id, dto);
  }
}
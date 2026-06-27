import { Body, Controller, Delete, Get, Param, Patch, Request, UseGuards } from '@nestjs/common';

import { JwtAuthGuard, RolesGuard } from '../../shared/guards';
import { Roles } from '../../shared/decorators/roles.decorator';
import { UserRole } from '../../shared/enums';
import { UserExternal, UserResponse, UpdateUserRoleDto } from '../dto';
import { UsersService } from '../services/users.service';
import { UserChangePasswordDto } from '../dto/request/change-password.dto';
import { UserMessageResponse } from '../../auth/dto';
import { UserChangeEmailDto } from '../dto/request/user-change-email.dto';
import { UserDeleteAccountDto } from '../dto/request/user-delete-account.dto';

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

  @Patch("me/password")
  @UseGuards(JwtAuthGuard)
  async updatePassword (@Request() req: any, @Body() dto: UserChangePasswordDto): Promise<UserMessageResponse>{
    return this.usersService.updatePassword(req.user.sub, dto)
  }

  @Patch("me/email")
  @UseGuards(JwtAuthGuard)
  async updateEmail (@Request() req: any, @Body() dto: UserChangeEmailDto): Promise<UserMessageResponse>{
    return this.usersService.updateEmail(req.user.sub, dto)
  }

  @Delete("me")
  @UseGuards(JwtAuthGuard)
  async deleteAccount (@Request() req: any, dto: UserDeleteAccountDto): Promise<UserMessageResponse>{
    return this.usersService.deleteAccount(req.user.sub, dto);
  }
}
import { Body, Controller, Delete, Get, Param, Patch, Request, UseGuards } from '@nestjs/common';

import { JwtAuthGuard, RolesGuard } from '../../shared/guards';
import { Roles } from '../../shared/decorators/roles.decorator';
import { UserRole } from '../../shared/enums';
import { UserExternal, UserResponse, UpdateUserRoleDto, UserChangePasswordDto, UserChangeEmailDto, UserDeleteAccountDto } from '../dto';
import { UserMessageResponse } from '../../auth/dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('externals')
  findAllExt(): Promise<UserExternal[]> {
    return this.usersService.findAllExt();
  }
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async findAll(): Promise<UserResponse[]> {
    return this.usersService.findAll();
  }

  @Get('externals/:id')
  findOneExt(@Param('id') id: string): Promise<UserExternal> {
    return this.usersService.findOneByIdExt(Number(id));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id/role')
  async updateRole(@Param('id') id: string, @Body() dto: UpdateUserRoleDto): Promise<UserResponse> {
    return this.usersService.updateRole(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("me/password")
  async updatePassword(@Request() req: any, @Body() dto: UserChangePasswordDto): Promise<UserMessageResponse> {
    return this.usersService.updatePassword(req.user.sub, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("me/email")
  async updateEmail(@Request() req: any, @Body() dto: UserChangeEmailDto): Promise<UserMessageResponse> {
    return this.usersService.updateEmail(req.user.sub, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete("me")
  async deleteAccount(@Request() req: any, @Body() dto: UserDeleteAccountDto): Promise<UserMessageResponse> {
    return this.usersService.deleteAccount(req.user.sub, dto);
  }
}
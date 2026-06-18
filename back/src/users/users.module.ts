import { Global, Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { JsonPlaceholderUsersGateway } from './gateways/jsonplaceholder-users.gateway';
import { USERS_GATEWAY } from './gateways/users.gateway';
import { UsersService } from './services/users.service';
import { LocalUsersGateway } from './gateways/local-users.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    UsersService,
    { provide: USERS_GATEWAY, useFactory: () => process.env.USERS_SOURCE === 'local' 
      ? new LocalUsersGateway() 
      : new JsonPlaceholderUsersGateway()
    },
  ],
  exports: [UsersService, USERS_GATEWAY],
})
export class UsersModule {}

import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JsonPlaceholderUsersGateway } from './gateways/jsonplaceholder-users.gateway';
import { LocalUsersGateway } from './gateways/local-users.gateway';
import { USERS_GATEWAY } from './gateways/users.gateway';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { UserEntity } from './entities/user.entity';
import { USERS_REPOSITORY } from './repositories/users.repository.interface';
import { UsersRepository } from './repositories/users.repository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: USERS_GATEWAY, useFactory: () => process.env.USERS_SOURCE === 'local' 
      ? new LocalUsersGateway() 
      : new JsonPlaceholderUsersGateway()
    },
    {
      provide: USERS_REPOSITORY,
      useClass: UsersRepository
    }
  ],
  exports: [UsersService, USERS_GATEWAY, USERS_REPOSITORY]
})
export class UsersModule {}

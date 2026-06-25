import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerMiddleware } from './shared/middleware/logger.middleware';
import { TimmingMiddleware } from './shared/middleware/timming.middleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { UserEntity } from './users/entities/user.entity';
import { ProductEntity } from './products/entities/product.entity';
import { CategoryEntity } from './categories/entity/category.entity';
import { EmailSenderModule } from './email-sender/email-sender.module';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    CategoriesModule,
    AuthModule,

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local']
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        database: configService.get('POSTGRES_DB'),
        username: configService.get('POSTGRES_USER'),
        port: Number(configService.get('POSTGRES_PORT')),
        password: configService.get('POSTGRES_PASSWORD'),
        host: configService.get('POSTGRES_HOST'),
        entities: [CategoryEntity, ProductEntity, UserEntity],
        synchronize: true
      })
    }),

    EmailSenderModule
  ]
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware, TimmingMiddleware).forRoutes('*');
  }
}

import { Module, NestModule, MiddlewareConsumer} from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './products/entities/ProductEntity';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { CategoryEntity } from './categories/entity/category.entity';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { TimmingMiddleware } from './common/middleware/timming.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './users/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local']
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        database: configService.get('POSTGRES_DB'),
        username: configService.get('POSTGRES_USER'),
        port: Number(configService.get('POSTGRES_PORT')),
        password: configService.get('POSTGRES_PASSWORD'),
        host: configService.get('POSTGRES_HOST'),
        entities: [CategoryEntity, ProductEntity, UserEntity],
        synchronize: true
      }),
      inject: [ConfigService]
    }), ProductsModule, UsersModule, CategoriesModule, AuthModule], 
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer):void {
    consumer.apply(LoggerMiddleware, TimmingMiddleware).forRoutes('*')
  }
}

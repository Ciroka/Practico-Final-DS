import { TypeOrmModule } from '@nestjs/typeorm';
import { Global, Module } from '@nestjs/common';

import { ProductsModule } from '../products/products.module';
import { CategoriesController } from './controllers/categories.controller';
import { CATEGORIES_REPOSITORY } from './repositories/categories.repository.interface';
import { CategoryRepository } from './repositories/category.repository';
import { CategoriesService } from './services/categories.service';
import { CategoryEntity } from './entity/category.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity]),
    ProductsModule
  ],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    {
      provide: CATEGORIES_REPOSITORY,
      useClass: CategoryRepository
    }
  ],
  exports: [CategoriesService, CATEGORIES_REPOSITORY]
})
export class CategoriesModule {}
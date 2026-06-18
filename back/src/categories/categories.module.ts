import { forwardRef, Global, Module } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './controllers/categories.controller';
import { CATEGORIES_REPOSITORY } from './repositories/categories.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entity/category.entity';
import { TypeOrmCategoryRepository } from './repositories/TypeOrmCategory.repository';
import { ProductsModule } from 'src/products/products.module';


@Global()
@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity]), forwardRef (() => ProductsModule)],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    { provide: CATEGORIES_REPOSITORY, useClass: TypeOrmCategoryRepository },
  ],
  exports: [CategoriesService, CATEGORIES_REPOSITORY],

})
export class CategoriesModule {}

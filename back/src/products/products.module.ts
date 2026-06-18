import { forwardRef, Global, Module } from "@nestjs/common";
import { ProductsController } from "./controllers/products.controller";
import { PRODUCTS_REPOSITORY } from "./repositories/products.repository";
import { ProductsService } from "./services/products.service";
import { TypeOrmProductsRepository } from "./repositories/TypeOrmProducts.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/ProductEntity";
import { CategoriesModule } from "src/categories/categories.module";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), forwardRef(() => CategoriesModule)],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    { provide: PRODUCTS_REPOSITORY, useClass: TypeOrmProductsRepository },
  ],
  exports: [ProductsService, PRODUCTS_REPOSITORY],
})
export class ProductsModule {}

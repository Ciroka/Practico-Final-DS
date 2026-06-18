import { TypeOrmModule } from "@nestjs/typeorm";
import { Global, Module } from "@nestjs/common";

import { ProductsController } from "./controllers/products.controller";
import { PRODUCTS_REPOSITORY } from "./repositories/products.repository";
import { ProductsService } from "./services/products.service";
import { TypeOrmProductsRepository } from "./repositories/TypeOrmProducts.repository";
import { ProductEntity } from "./entities/ProductEntity";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: PRODUCTS_REPOSITORY,
      useClass: TypeOrmProductsRepository
    },
  ],
  exports: [ProductsService, PRODUCTS_REPOSITORY],
})
export class ProductsModule {}
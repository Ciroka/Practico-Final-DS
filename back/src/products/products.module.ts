import { TypeOrmModule } from "@nestjs/typeorm";
import { Global, Module } from "@nestjs/common";

import { PRODUCTS_REPOSITORY } from "./repositories/products.repository.interface";
import { ProductsRepository } from "./repositories/products.repository";
import { ProductsService } from "./services/products.service";
import { ProductsController } from "./controllers/products.controller";
import { ProductEntity } from "./entities/product.entity";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: PRODUCTS_REPOSITORY,
      useClass: ProductsRepository
    }
  ],
  exports: [ProductsService, PRODUCTS_REPOSITORY]
})
export class ProductsModule {}
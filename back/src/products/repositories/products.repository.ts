import { PaginatedResult } from 'src/shared/paginacion.type';
import { CreateProduct } from '../dto/create-Product.dto';
import { ProductEntity } from '../entities/ProductEntity';

export const PRODUCTS_REPOSITORY = 'PRODUCTS_REPOSITORY';

export interface ProductsRepository {
  findAll(page: number, limit: number, name?: string, orderBy?: string, order?: string, categoryId?: number): Promise<PaginatedResult<ProductEntity>>;
  findById(id: number): Promise<ProductEntity | undefined>;
  create(input: CreateProduct): Promise<ProductEntity>;
  update(product: ProductEntity): Promise<ProductEntity>;
  remove(product: ProductEntity): Promise<ProductEntity>;
}


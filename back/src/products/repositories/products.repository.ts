import { PaginatedResult } from 'src/shared/paginacion.type';
import { CreateProduct } from '../dto/create-Product.dto';
import { ProductEntity } from '../entities/ProductEntity';

export const PRODUCTS_REPOSITORY = 'PRODUCTS_REPOSITORY';

export interface ProductsRepository {
  findAll(page: number, limit: number, order: 'asc' | 'desc', name?: string, orderBy?: string, categoryId?: number): Promise<PaginatedResult<ProductEntity>>;
  findAllByCategory(categoryId: number): Promise<ProductEntity[]>;
  findById(id: number): Promise<ProductEntity | undefined>;
  create(input: CreateProduct): Promise<ProductEntity>;
  update(product: ProductEntity): Promise<ProductEntity>;
  remove(product: ProductEntity): Promise<ProductEntity>;
}


import { PaginatedResult } from '../../shared/paginacion.type';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductEntity } from '../entities/product.entity';

export const PRODUCTS_REPOSITORY = 'PRODUCTS_REPOSITORY';

export interface IProductsRepository {
  findAll(page: number, limit: number, order: 'asc' | 'desc', orderBy?: 'id' | 'name' | 'price' | 'stock', name?: string, categoryId?: number): Promise<PaginatedResult<ProductEntity>>;
  findById(id: number): Promise<ProductEntity | undefined>;
  create(input: CreateProductDto): Promise<ProductEntity>;
  update(product: ProductEntity): Promise<ProductEntity>;
  remove(product: ProductEntity): Promise<ProductEntity>;
  countByCategory(id: number): Promise<number>;
}
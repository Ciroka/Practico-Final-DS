import { PaginatedResult } from "../../shared/paginacion.type";
import { UpdateStock } from '../product.types';
import { CreateProduct } from '../dto/create-Product.dto';
import { UpdateProduct } from '../dto/update-product.dto';
import { ProductEntity } from '../entities/ProductEntity';
export declare const PRODUCTS_REPOSITORY = "PRODUCTS_REPOSITORY";
export interface ProductsRepository {
    findAll(name?: string, orderBy?: string, order?: string, categoryId?: number): Promise<ProductEntity[]>;
    findAllPages(products: ProductEntity[], page: number, limit: number): Promise<PaginatedResult<ProductEntity>>;
    findById(id: number): Promise<ProductEntity | undefined>;
    create(input: CreateProduct): Promise<ProductEntity>;
    update(id: number, input: UpdateProduct): Promise<ProductEntity | undefined>;
    updateStock(id: number, input: UpdateStock): Promise<ProductEntity | undefined>;
    remove(id: number): Promise<ProductEntity | undefined>;
}

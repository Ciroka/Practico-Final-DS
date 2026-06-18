import { ProductsService } from '../services/products.service';
import { UpdateStock } from '../product.types';
import { PaginatedResult } from "../../shared/paginacion.type";
import { CreateProduct } from '../dto/create-Product.dto';
import { UpdateProduct } from '../dto/update-product.dto';
import { ProductEntity } from '../entities/ProductEntity';
import { PaginateDto } from '../dto/pagination.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(name?: string, ordenarPor?: string, orden?: string, categoryId?: string, paginationDto?: PaginateDto): Promise<ProductEntity[] | PaginatedResult<ProductEntity>>;
    findOne(id: string): Promise<ProductEntity>;
    create(body: CreateProduct): Promise<ProductEntity>;
    update(id: string, body: UpdateProduct): Promise<ProductEntity>;
    updateStock(id: string, body: UpdateStock): Promise<ProductEntity>;
    remove(id: string): Promise<ProductEntity>;
}

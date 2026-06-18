import { UpdateStock } from '../product.types';
import { ProductsRepository } from '../repositories/products.repository';
import { PaginatedResult } from "../../shared/paginacion.type";
import { UpdateProduct } from '../dto/update-product.dto';
import { CreateProduct } from '../dto/create-Product.dto';
import { ProductEntity } from '../entities/ProductEntity';
import { CategoriesService } from "../../categories/services/categories.service";
import { PaginateDto } from '../dto/pagination.dto';
export declare class ProductsService {
    private readonly productsRepository;
    private readonly categoriesService;
    constructor(productsRepository: ProductsRepository, categoriesService: CategoriesService);
    findAll(name?: string, ordenarPor?: string, orden?: string, categoryId?: number): Promise<ProductEntity[]>;
    findAllPages(products: ProductEntity[], pagination: PaginateDto): Promise<PaginatedResult<ProductEntity>>;
    findOne(id: number): Promise<ProductEntity>;
    create(input: CreateProduct): Promise<ProductEntity>;
    update(id: number, input: UpdateProduct): Promise<ProductEntity>;
    updateStock(id: number, input: UpdateStock): Promise<ProductEntity>;
    remove(id: number): Promise<ProductEntity>;
}

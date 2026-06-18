import { CategoriesRepository } from '../repositories/categories.repository';
import { Category } from '../category.types';
import { ProductsService } from "../../products/services/products.service";
import { PaginatedResult } from "../../shared/paginacion.type";
import { CreateCategory } from '../dto/create-categories.dto';
import { UpdateCategory } from '../dto/update-categories.dto';
import { ProductEntity } from "../../products/entities/ProductEntity";
export declare class CategoriesService {
    private readonly categoriesRepository;
    private readonly productsService;
    constructor(categoriesRepository: CategoriesRepository, productsService: ProductsService);
    findAll(): Promise<Category[]>;
    findAllPages(page: number, limit: number): Promise<PaginatedResult<Category>>;
    findBy(id: number): Promise<Category>;
    findProducts(id: number): Promise<ProductEntity[]>;
    create(body: CreateCategory): Promise<Category>;
    update(id: number, input: UpdateCategory): Promise<Category>;
    remove(id: number): Promise<Category>;
}

import { CategoriesService } from '../services/categories.service';
import { Category } from '../category.types';
import { PaginatedResult } from "../../shared/paginacion.type";
import { UpdateCategory } from '../dto/update-categories.dto';
import { CreateCategory } from '../dto/create-categories.dto';
import { ProductEntity } from "../../products/entities/ProductEntity";
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(page?: string, limit?: string): Promise<Category[] | PaginatedResult<Category>>;
    findOne(id: string): Promise<Category | undefined>;
    findProducts(id: string): Promise<ProductEntity[]>;
    create(body: CreateCategory): Promise<Category>;
    update(id: string, body: UpdateCategory): Promise<Category>;
    remove(id: string): Promise<Category>;
}

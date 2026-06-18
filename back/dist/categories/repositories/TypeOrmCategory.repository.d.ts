import { CategoriesRepository } from "./categories.repository";
import { PaginatedResult } from "../../shared/paginacion.type";
import { Category } from "../category.types";
import { CategoryEntity } from "../entity/category.entity";
import { Repository } from "typeorm";
import { CreateCategory } from "../dto/create-categories.dto";
import { UpdateCategory } from "../dto/update-categories.dto";
export declare class TypeOrmCategoryRepository implements CategoriesRepository {
    private readonly categoriesRepository;
    constructor(categoriesRepository: Repository<CategoryEntity>);
    findAll(): Promise<Category[]>;
    findAllPages(page?: number, limit?: number): Promise<PaginatedResult<Category>>;
    findById(id: number): Promise<Category | undefined>;
    create(input: CreateCategory): Promise<Category>;
    update(id: number, input: UpdateCategory): Promise<Category | undefined>;
    remove(id: number): Promise<Category | undefined>;
}

import { Category, CreateCategoryInput, UpdateCategoryInput } from "../category.types";
import { PaginatedResult } from "src/shared/paginacion.type";
import { CategoryEntity } from "../entity/category.entity";


export const CATEGORIES_REPOSITORY = 'CATEGORIES_REPOSITORY';

export interface CategoriesRepository {
    findAll(page: number, limit: number, name?: string, order?: 'asc' | 'desc') : Promise<PaginatedResult<Category>>;
    findById(id: number): Promise<Category | undefined>;
    create(input: CreateCategoryInput): Promise<Category>;
    update(category: CategoryEntity): Promise<Category>;
    remove(category: CategoryEntity): Promise<Category>;
}
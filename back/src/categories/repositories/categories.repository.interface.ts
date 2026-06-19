import { PaginatedResult } from "../../shared/paginacion.type";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { CategoryEntity } from "../entity/category.entity";

export const CATEGORIES_REPOSITORY = 'CATEGORIES_REPOSITORY';

export interface ICategoriesRepository {
    findAll(page: number, limit: number, order: 'asc' | 'desc', name?: string) : Promise<PaginatedResult<CategoryEntity>>;
    findById(id: number): Promise<CategoryEntity | undefined>;
    create(input: CreateCategoryDto): Promise<CategoryEntity>;
    update(category: CategoryEntity): Promise<CategoryEntity>;
    remove(category: CategoryEntity): Promise<CategoryEntity>;
}
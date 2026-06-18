import { Category, CreateCategoryInput, UpdateCategoryInput } from "../category.types";
import { PaginatedResult } from "src/shared/paginacion.type";


export const CATEGORIES_REPOSITORY = 'CATEGORIES_REPOSITORY';

export interface CategoriesRepository {
    findAll(): Promise<Category[]>;
    findAllPages(page: number, limit: number) : Promise<PaginatedResult<Category>>;
    findById(id: number): Promise<Category | undefined>;
    create(input: CreateCategoryInput): Promise<Category>;
    update(id: number, input: UpdateCategoryInput): Promise<Category | undefined>;
    remove(id: number): Promise<Category | undefined>;
}
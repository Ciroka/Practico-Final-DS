import { OrderEnum } from '../../shared/order.enum';
import { PaginatedResult } from '../../shared/pagination/pagination.type';
import { CreateCategoryDto } from '../dto';
import { CategoryEntity } from '../entity/category.entity';

export const CATEGORIES_REPOSITORY = 'CATEGORIES_REPOSITORY';

export interface ICategoriesRepository {
    findAll(page: number, limit: number, order: OrderEnum, name?: string) : Promise<PaginatedResult<CategoryEntity>>;
    findById(id: number): Promise<CategoryEntity | undefined>;
    create(input: CreateCategoryDto): Promise<CategoryEntity>;
    update(category: CategoryEntity): Promise<CategoryEntity>;
    remove(category: CategoryEntity): Promise<CategoryEntity>;
}
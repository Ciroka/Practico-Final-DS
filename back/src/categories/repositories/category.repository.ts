import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PaginatedResult } from '../../common/pagination/pagination.type';
import { CreateCategoryDto } from '../dto';
import { ICategoriesRepository } from './categories.repository.interface';
import { CategoryEntity } from '../entity/category.entity';
import { OrderEnum } from '../../shared/order.enum';

@Injectable()
export class CategoryRepository implements ICategoriesRepository {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoriesRepository: Repository<CategoryEntity>,
    ) {}

    async findAll(page: number, limit: number, order: OrderEnum, name?: string): Promise<PaginatedResult<CategoryEntity>> {
        const offset = (page - 1) * limit;
        const query = this.queryBuilder(order, name);

        const [categories, total] = await query.skip(offset).take(limit).getManyAndCount();
        const paginationResult: PaginatedResult<CategoryEntity> = {
            items: categories,
            total,
            page,
            limit
        };

        return paginationResult;
    }

    async findById(id: number): Promise<CategoryEntity | undefined> {
        const category = await this.categoriesRepository.findOneBy({ id });
        if (!category) return undefined;
        return category;
    }

    async create(input: CreateCategoryDto): Promise<CategoryEntity> {
        const category = this.categoriesRepository.create(input);
        return this.categoriesRepository.save(category);
    }

    async update(category: CategoryEntity): Promise<CategoryEntity> {
        return this.categoriesRepository.save(category);
    }

    async remove(category: CategoryEntity): Promise<CategoryEntity> {
        return this.categoriesRepository.remove(category);
    }
    
    private queryBuilder(order: OrderEnum, name?: string) {
        const query = this.categoriesRepository.createQueryBuilder('category');

        if (name) {
            query.where('category.name ILIKE :name', { name: `%${name}%` });
        }
        
        query.orderBy('category.name', order);
        return query;
    }
}
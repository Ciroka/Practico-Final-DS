import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateCategoryDto } from '../dto';
import { ICategoriesRepository } from './categories.repository.interface';
import { CategoryEntity } from '../entity/category.entity';

@Injectable()
export class CategoryRepository implements ICategoriesRepository {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoriesRepository: Repository<CategoryEntity>,
    ) {}

    async findAll(): Promise<CategoryEntity[]> {
        return this.categoriesRepository.find();
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
}
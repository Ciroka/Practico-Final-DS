import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { CATEGORIES_REPOSITORY, ICategoriesRepository } from '../repositories/categories.repository.interface';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto';
import { QueryParamsProductDto } from '../../products/dto';
import { PaginatedResult } from '../../shared/pagination/pagination.type';
import { ProductsService } from '../../products/services/products.service';
import { CategoryEntity } from '../entity/category.entity';
import { ProductEntity } from '../../products/entities/product.entity';

@Injectable()
export class CategoriesService {
    constructor(
        @Inject(CATEGORIES_REPOSITORY)
        private readonly categoriesRepository: ICategoriesRepository,
        private readonly productsService: ProductsService,
    ) {}

    async findAll(): Promise<CategoryEntity[]> {
        return this.categoriesRepository.findAll();
    }

    async findOneById(id: number): Promise<CategoryEntity> {
        const category = await this.categoriesRepository.findById(id);
        if (!category) throw new NotFoundException('Category not found.');
        return category;
    }

    async findProducts(id: number, params: QueryParamsProductDto): Promise<PaginatedResult<ProductEntity>> {
        await this.findOneById(id);
        return this.productsService.findAllByCategory(id, params);
    }

    async create(body: CreateCategoryDto): Promise<CategoryEntity> {
        return this.categoriesRepository.create(body);
    }

    async update(id: number, input: UpdateCategoryDto): Promise<CategoryEntity> {
        const category = await this.findOneById(id);
        category.name = input.name;
        return this.categoriesRepository.update(category);
    }

    async remove(id: number): Promise<CategoryEntity> {
        const category = await this.findOneById(id);
        const count = await this.productsService.countByCategory(id);

        if (count > 0) throw new ConflictException('Cannot delete category with associated products.');
        
        return this.categoriesRepository.remove(category);
    }
}
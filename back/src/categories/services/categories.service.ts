import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { CATEGORIES_REPOSITORY, ICategoriesRepository } from '../repositories/categories.repository.interface';
import { ProductsService } from '../../products/services/products.service';
import { PaginatedResult } from '../../shared/paginacion.type';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { ProductEntity } from '../../products/entities/product.entity';
import { QueryParamsCategoryDto } from '../dto/params-categories.dto';
import { CategoryEntity } from '../entity/category.entity';

@Injectable()
export class CategoriesService {
    constructor(
        @Inject(CATEGORIES_REPOSITORY)
        private readonly categoriesRepository: ICategoriesRepository,
        private readonly productsService: ProductsService,
    ) {}

    async findAll(params: QueryParamsCategoryDto): Promise<PaginatedResult<CategoryEntity>> {
        return this.categoriesRepository.findAll(
            params.page, params.limit, params.order, params.name
        );
    }

    async findOneById(id: number): Promise<CategoryEntity> {
        const category = await this.categoriesRepository.findById(id);
        if (!category) throw new NotFoundException('Category not found.');
        return category;
    }

    async findProducts(id: number): Promise<ProductEntity[]> {
        await this.findOneById(id);
        const products = await this.productsService.findAllByCategory(id);
        return products;
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
        const products = await this.productsService.findAllByCategory(id);
        if (products) throw new ConflictException('Cannot delete category with associated products.');
        
        return this.categoriesRepository.remove(category);
    }
}
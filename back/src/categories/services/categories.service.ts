import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CATEGORIES_REPOSITORY, CategoriesRepository } from '../repositories/categories.repository';
import { Category } from '../category.types';
import { ProductsService } from 'src/products/services/products.service';
import { PaginatedResult } from 'src/shared/paginacion.type';
import { CreateCategory } from '../dto/create-categories.dto';
import { UpdateCategory } from '../dto/update-categories.dto';
import { ProductEntity } from 'src/products/entities/ProductEntity';
import { RequestCategoryDto } from '../dto/requestCategory.dto';

@Injectable()
export class CategoriesService {

    constructor(
    @Inject(CATEGORIES_REPOSITORY)
    private readonly categoriesRepository: CategoriesRepository,
    private readonly productsService: ProductsService,
    ){}

    async findAll(input: RequestCategoryDto): Promise<PaginatedResult<Category>>{
        const paginationResult = await this.categoriesRepository.findAll(input.page, input.limit, input.name, input.order);
        return paginationResult
    }

    async findOneById(id: number): Promise<Category>{
        const category = await this.categoriesRepository.findById(id)
        if(!category) throw new NotFoundException('Category not found.')
        
        return category
    }

    async findProducts(id: number): Promise<ProductEntity[]>{
        await this.findOneById(id);
        const products = await this.productsService.findAllByCategory(id);
        return products;
    }

    async create (body: CreateCategory): Promise<Category>{
        return await this.categoriesRepository.create(body);
    }

    async update ( id: number, input: UpdateCategory): Promise<Category> {
        const category = await this.findOneById(id);

        if (input.name !== undefined) category.name = input.name;

        return await this.categoriesRepository.update(category);
    }

    async remove (id: number): Promise<Category> {
        const category = await this.findOneById(id);
        const products = await this.productsService.findAllByCategory(id);
        if(products) throw new ConflictException('Cannot delete category with associated products.');
        await this.categoriesRepository.remove(category);
        return category;
    }

}

import { ConflictException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CATEGORIES_REPOSITORY, CategoriesRepository } from '../repositories/categories.repository';
import { Category } from '../category.types';
import { ProductsService } from 'src/products/services/products.service';
import { PaginatedResult } from 'src/shared/paginacion.type';
import { CreateCategory } from '../dto/create-categories.dto';
import { UpdateCategory } from '../dto/update-categories.dto';
import { ProductEntity } from 'src/products/entities/ProductEntity';

@Injectable()
export class CategoriesService {

    constructor(
    @Inject(CATEGORIES_REPOSITORY)
    private readonly categoriesRepository: CategoriesRepository,
    private readonly productsService: ProductsService,
    ){}

    async findAll(): Promise<Category[]>{
        return await this.categoriesRepository.findAll();
    }

    async findAllPages( ): Promise<PaginatedResult<Category>>{
        const paginationResult = await this.categoriesRepository.findAllPages(page, limit)
        if (!paginationResult) throw new NotFoundException('Categories not found.')

        return paginationResult
    }

    async findBy(id: number): Promise<Category>{
        const category = await this.categoriesRepository.findById(id)
        if(!category) throw new NotFoundException('Category not found.')
        
        return category
    }

    async findProducts(id: number): Promise<ProductEntity[]>{
        this.findBy(id);
        const products = await this.productsService.findAll(undefined, undefined, undefined, id);
        if(!products) throw new NotFoundException ('Products not found.')
        return products
    }

    async create (body: CreateCategory): Promise<Category>{
        return await this.categoriesRepository.create(body);
    }

    async update ( id: number, input: UpdateCategory): Promise<Category> {
        const category = await this.categoriesRepository.update(id, input);
        if (!category) throw new NotFoundException('Category not found.');

        return category;
    }

    async remove (id: number): Promise<Category> {
        const category = await this.categoriesRepository.remove(id);
        if(!category) throw new NotFoundException('Category not found.')
        const products = await this.productsService.findAll(undefined, undefined, undefined, id);
        if(products) throw new ConflictException('Cannot delete category with associated products.');
        await this.categoriesRepository.remove(id);
        return category
    }

}

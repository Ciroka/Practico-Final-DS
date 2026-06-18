import { Controller, Get, Param, Post, Body, Delete, Query, Put } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { Category, CreateCategoryInput, UpdateCategoryInput } from '../category.types';
import { Product } from 'src/products/product.types';
import { PaginatedResult } from 'src/shared/paginacion.type';
import { UpdateCategory } from '../dto/update-categories.dto';
import { CreateCategory } from '../dto/create-categories.dto';
import { ProductEntity } from 'src/products/entities/ProductEntity';
import { RequestCategoryDto } from '../dto/requestCategory.dto';

@Controller('categories')
export class CategoriesController {
    constructor( private readonly categoriesService: CategoriesService){}

    @Get()
    async findAll(@Query() params: RequestCategoryDto): Promise<PaginatedResult<Category>>{
        return await this.categoriesService.findAll(params);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Category | undefined> {
        return await this.categoriesService.findOneById(+id);
    }

    @Get(':id/products')
    async findProducts(@Param('id') id : string): Promise<ProductEntity[]>{
        return await this.categoriesService.findProducts(Number(id));
    }

    @Post()
    async create(@Body() body: CreateCategory): Promise<Category> {
        return await this.categoriesService.create(body);
    }

    @Put(':id')
    async update(@Param('id') id: string ,@Body() body: UpdateCategory){
        return await this.categoriesService.update(Number(id), body);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Category>{
        return await this.categoriesService.remove(Number(id));
    }
}

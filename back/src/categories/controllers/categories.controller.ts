import { Controller, Get, Param, Post, Body, Delete, Query, Put } from '@nestjs/common';

import { PaginatedResult } from '../../shared/paginacion.type';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { QueryParamsCategoryDto } from '../dto/params-categories.dto';
import { CategoriesService } from '../services/categories.service';
import { ProductEntity } from '../../products/entities/product.entity';
import { CategoryEntity } from '../entity/category.entity';
import { QueryParamsProductDto } from '../../products/dto/params-products.dto';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    async findAll(@Query() params: QueryParamsCategoryDto): Promise<PaginatedResult<CategoryEntity>> {
        return this.categoriesService.findAll(params);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<CategoryEntity> {
        return this.categoriesService.findOneById(Number(id));
    }

    @Get(':id/products')
    async findProducts(@Param('id') id: string, @Query() params: QueryParamsProductDto): Promise<PaginatedResult<ProductEntity>> {
        return this.categoriesService.findProducts(Number(id), params);
    }

    @Post()
    async create(@Body() body: CreateCategoryDto): Promise<CategoryEntity> {
        return this.categoriesService.create(body);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
        return this.categoriesService.update(Number(id), body);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<CategoryEntity> {
        return this.categoriesService.remove(Number(id));
    }
}
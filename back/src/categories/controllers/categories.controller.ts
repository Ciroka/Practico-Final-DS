import { Controller, Get, Param, Post, Body, Delete, Query, Put } from '@nestjs/common';

import { CreateCategoryDto, UpdateCategoryDto, CategoryResponse } from '../dto';
import { ProductResponse, QueryParamsProductDto } from '../../products/dto';
import { PaginatedResult } from '../../shared/pagination/pagination.type';
import { CategoriesService } from '../services/categories.service';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    async findAll(): Promise<CategoryResponse[]> {
        return this.categoriesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<CategoryResponse> {
        return this.categoriesService.findOneById(Number(id));
    }

    @Get(':id/products')
    async findProducts(@Param('id') id: string, @Query() params: QueryParamsProductDto): Promise<PaginatedResult<ProductResponse>> {
        return this.categoriesService.findProducts(Number(id), params);
    }

    @Post()
    async create(@Body() body: CreateCategoryDto): Promise<CategoryResponse> {
        return this.categoriesService.create(body);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
        return this.categoriesService.update(Number(id), body);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<CategoryResponse> {
        return this.categoriesService.remove(Number(id));
    }
}
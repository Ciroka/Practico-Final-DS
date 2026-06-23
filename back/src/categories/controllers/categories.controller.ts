import { Controller, Get, Param, Post, Body, Delete, Query, Put } from '@nestjs/common';

import { CreateCategoryDto, QueryParamsCategoryDto, UpdateCategoryDto } from '../dto/request';
import { QueryParamsProductDto } from '../../products/dto/request';
import { ProductResponse } from '../../products/dto/response/product-response.dto';
import { CategoryResponse } from '../dto/response/category-response.dto';
import { PaginatedResult } from '../../common/pagination/pagination.type';
import { CategoriesService } from '../services/categories.service';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    async findAll(@Query() params: QueryParamsCategoryDto): Promise<PaginatedResult<CategoryResponse>> {
        return this.categoriesService.findAll(params);
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
import { Controller, Get, Param, Post, Body, Delete, Query, Put, UseGuards } from '@nestjs/common';

import { JwtAuthGuard, RolesGuard } from '../../shared/guards';
import { Roles } from '../../shared/decorators/roles.decorator';
import { UserRole } from '../../shared/enums';
import { PaginatedResult } from '../../shared/pagination/pagination.type';
import { CreateCategoryDto, UpdateCategoryDto, CategoryResponse } from '../dto';
import { ProductResponse, QueryParamsProductDto } from '../../products/dto';
import { CategoriesService } from '../services/categories.service';

@Controller('categories')
export class CategoriesController {
    constructor(
        private readonly categoriesService: CategoriesService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<CategoryResponse[]> {
        return this.categoriesService.findAll();
    }
    
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<CategoryResponse> {
        return this.categoriesService.findOneById(Number(id));
    }
    
    @UseGuards(JwtAuthGuard)
    @Get(':id/products')
    async findProducts(@Param('id') id: string, @Query() params: QueryParamsProductDto): Promise<PaginatedResult<ProductResponse>> {
        return this.categoriesService.findProducts(Number(id), params);
    }
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Post()
    async create(@Body() body: CreateCategoryDto): Promise<CategoryResponse> {
        return this.categoriesService.create(body);
    }
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Put(':id') 
    async update(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
        return this.categoriesService.update(Number(id), body);
    }
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<CategoryResponse> {
        return this.categoriesService.remove(Number(id));
    }
}
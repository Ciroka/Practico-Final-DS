import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../common/guards';
import { PaginatedResult } from '../../common/pagination/pagination.type';
import { QueryParamsProductDto, CreateProductDto, UpdateProductDto, UpdateStock, ProductResponse } from '../dto';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() params: QueryParamsProductDto): Promise<PaginatedResult<ProductResponse>> {
    return this.productsService.findAll(params);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductResponse> {
    return this.productsService.findOne(Number(id));
  }

  @Post()
  async create(@Body() body: CreateProductDto): Promise<ProductResponse> {
    return this.productsService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateProductDto): Promise<ProductResponse> {
    return this.productsService.update(Number(id), body);
  }

  @Patch('/:id/stock')
  async updateStock(@Param('id') id: string, @Body() body: UpdateStock): Promise<ProductResponse> {
    return this.productsService.updateStock(Number(id), body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ProductResponse> {
    return this.productsService.remove(Number(id));
  }
}
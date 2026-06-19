import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';

import { ProductsService } from '../services/products.service';
import { PaginatedResult } from '../../shared/paginacion.type';
import { QueryParamsProductDto } from '../dto/params-products.dto';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { UpdateStock } from '../dto/update-stock.dto';
import { ProductEntity } from '../entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(@Query() params: QueryParamsProductDto): Promise<PaginatedResult<ProductEntity>> {
    return this.productsService.findAll(params);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductEntity> {
    return this.productsService.findOne(Number(id));
  }

  @Post()
  async create(@Body() body: CreateProductDto): Promise<ProductEntity> {
    return this.productsService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateProductDto): Promise<ProductEntity> {
    return this.productsService.update(Number(id), body);
  }

  @Patch('/:id/stock')
  async updateStock(@Param('id') id: string, @Body() body: UpdateStock): Promise<ProductEntity> {
    return this.productsService.updateStock(Number(id), body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ProductEntity> {
    return this.productsService.remove(Number(id));
  }
}
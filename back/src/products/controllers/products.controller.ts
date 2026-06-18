import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { PaginatedResult } from '../../shared/paginacion.type';
import { CreateProduct } from '../dto/create-Product.dto';
import { UpdateProduct } from '../dto/update-product.dto';
import { ProductEntity } from '../entities/ProductEntity';
import { PaginateDto } from '../dto/pagination.dto';
import { UpdateStock } from '../dto/update-stock.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(@Query() paginationDto: PaginateDto): Promise <PaginatedResult<ProductEntity>> {
    const products = await this.productsService.findAll(paginationDto);
    return products;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductEntity> {
    return await this.productsService.findOne(Number(id));
  }

  @Post()
  async create(@Body() body: CreateProduct): Promise<ProductEntity> {
    return await this.productsService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateProduct): Promise<ProductEntity> {
    return await this.productsService.update(Number(id), body);
  }

  @Patch('/:id/stock')
  async updateStock(@Param('id') id: string, @Body() body: UpdateStock): Promise<ProductEntity>{
    return await this.productsService.updateStock(Number(id), body)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ProductEntity> {
    return  await this.productsService.remove(Number(id));
  }
}


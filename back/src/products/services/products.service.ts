import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { PRODUCTS_REPOSITORY, IProductsRepository } from '../repositories/products.repository.interface';
import { UpdateStock } from '../dto/update-stock.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { CreateProductDto } from '../dto/create-product.dto';
import { PaginatedResult } from '../../shared/paginacion.type';
import { ProductEntity } from '../entities/product.entity';
import { QueryParamsProductDto } from '../dto/params-products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCTS_REPOSITORY)
    private readonly productsRepository: IProductsRepository,
  ) {}

  async findAll(params: QueryParamsProductDto): Promise<PaginatedResult<ProductEntity>> {
    return this.productsRepository.findAll(
      params.page, params.limit, params.order, params.orderBy, params.name, params.categoryId
    );
  }

  async findAllByCategory(categoryId: number) {
    return this.productsRepository.findAllByCategory(categoryId);
  }

  async findOne(id: number): Promise<ProductEntity> {
    const product = await this.productsRepository.findById(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async create(input: CreateProductDto): Promise<ProductEntity> {
    return this.productsRepository.create(input);
  }

  async update(id: number, input: UpdateProductDto): Promise<ProductEntity> {
    const product = await this.findOne(id);

    if (input.name !== undefined) product.name = input.name;
    if (input.price !== undefined) product.price = input.price;
    if (input.stock !== undefined) product.stock = input.stock;
    if (input.categoryId !== undefined) product.category.id = input.categoryId;

    return this.productsRepository.update(product);
  }

  async updateStock(id: number, input: UpdateStock): Promise<ProductEntity> {
    const product = await this.findOne(id);
    if (input.quantity > product.stock) throw new BadRequestException('Stock insuficiente.');

    product.stock -= input.quantity;
    return this.productsRepository.update(product);
  }

  async remove(id: number): Promise<ProductEntity> {
    const product = await this.findOne(id);
    return this.productsRepository.remove(product);
  }
}
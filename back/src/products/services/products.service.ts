import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  UpdateStock,
} from '../product.types';
import {
  PRODUCTS_REPOSITORY,
  ProductsRepository,
} from '../repositories/products.repository';
import { PaginatedResult } from 'src/shared/paginacion.type';
import { UpdateProduct } from '../dto/update-product.dto';
import { CreateProduct } from '../dto/create-Product.dto';
import { ProductEntity } from '../entities/ProductEntity';
import { RequestProductDto } from '../dto/requestProduct.dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCTS_REPOSITORY)
    private readonly productsRepository: ProductsRepository,
  ) {}

  async findAll(pagination: RequestProductDto): Promise<PaginatedResult<ProductEntity>> {
    const products = await this.productsRepository.findAll(pagination.page, pagination.limit, pagination.order, pagination.name, pagination.orderBy, pagination.categoryId);
    return products
  }

  async findAllByCategory(categoryId: number) {
    return this.productsRepository.findAllByCategory(categoryId);
  }

  async findOne(id: number): Promise<ProductEntity> {
    const product =  await this.productsRepository.findById(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async create(input: CreateProduct): Promise<ProductEntity>{
    if(input.categoryId ) {
      const product = {
        name: input.name,
        price: input.price,
        stock: input.stock,
        categoryId: input.categoryId 
      }
      return this.productsRepository.create(product);
    }
    return this.productsRepository.create(input);
  }

  async update(id: number, input: UpdateProduct): Promise <ProductEntity> {
    const product = await this.findOne(id)

    if (input.name !== undefined) product.name = input.name;
    if (input.price !== undefined) product.price = input.price;
    if (input.stock !== undefined) product.stock = input.stock;
    if (input.categoryId !== undefined) product.category.id = input.categoryId;
    
    return this.productsRepository.update(product);
  }

  async updateStock(id: number, input: UpdateStock): Promise <ProductEntity> {
    const product = await this.findOne(id);
    if (input.quantity > product.stock) throw new BadRequestException('Stock insuficiente.')
    if(input.quantity !== undefined) product.stock -= input.quantity;
    return this.productsRepository.update(product);
  }

  async remove(id: number): Promise <ProductEntity> {
    const product = await this.findOne(id);
    return this.productsRepository.remove(product);
  }
}


/*import { Get, Injectable } from '@nestjs/common';
import {
  CreateProductInput,
  Product,
  UpdateProductInput,
  UpdateStock,
} from '../product.types';
import { ProductsRepository } from './products.repository';
import { CategoriesService } from 'src/categories/services/categories.service';
import { PaginatedResult } from 'src/shared/paginacion.type';


export class InMemoryProductsRepository implements ProductsRepository {
    
  private products: Product[] = [];
  private nextId = 1;

  findAll(name ?: string, orderBy?: string, order: string = 'asc', categoryId?: number) : Product[] {
    if (name){
      return this.products.filter(p => p.name.toLowerCase() === name.toLowerCase())
    }
    if(orderBy && order === 'asc'){
      return this.products.sort((p1, p2) => orderBy === 'name' ? p1[orderBy].localeCompare(p2[orderBy]) :p1[orderBy] - p2[orderBy])
    }
    if(orderBy && order === 'desc'){
      return this.products.sort((p1, p2) => orderBy === 'name' ? p2[orderBy].localeCompare(p1[orderBy]) : p2[orderBy] - p1[orderBy])
    }
    if(categoryId){
      return this.products.filter(p => p.categoryId === categoryId)
    }
    return this.products;
  }

  findAllPages(products: Product[], page: number = 1, limit: number = 50 ): PaginatedResult<Product>{
    if (page <= 0) page = 1
    if (limit <= 0 || limit >= 50) limit = 50
    
    const offset = (page - 1) * limit
    const total = products.length
    const paginationResult: PaginatedResult<Product> = {
      data: products.slice(offset, offset + limit),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }
    return paginationResult
  }

  findById(id: number): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  create(input: CreateProductInput): Product {
    

    const product: Product = {
      id: this.nextId++,
      name: input.name,
      price: input.price,
      stock: input.stock,
      categoryId: input.categoryId,
    };

    this.products.push(product);
    return product;
  }

  update(id: number, input: UpdateProductInput): Product | undefined {
    const product = this.findById(id);
    if (!product) return undefined;

    if (input.name !== undefined) product.name = input.name;
    if (input.price !== undefined) product.price = input.price;
    if (input.stock !== undefined) product.stock = input.stock;

    return product;
  }

  updateStock(id: number, input: UpdateStock): Product | undefined {
    const product = this.findById(id);
    if(!product) return undefined

    if(input.quantity !== undefined) product.stock -= input.quantity;

    return product
  }

  remove(id: number): Product | undefined {
    const product = this.findById(id);
    if (!product) return undefined;

    this.products = this.products.filter((p) => p.id !== id);
    return product;
  }
}
*/

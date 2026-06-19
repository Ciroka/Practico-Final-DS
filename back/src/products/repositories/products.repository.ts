import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

import { IProductsRepository } from "./products.repository.interface";
import { PaginatedResult } from "../../shared/paginacion.type";
import { CreateProductDto } from "../dto/create-product.dto";
import { ProductEntity } from "../entities/product.entity";

@Injectable()
export class ProductsRepository implements IProductsRepository {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productsRepository: Repository<ProductEntity>,
    ) {}

    async findAll(page: number, limit: number, order: 'asc' | 'desc', orderBy?: 'id' | 'name' | 'price' | 'stock', name?: string, categoryId?: number): Promise<PaginatedResult<ProductEntity>> {
        const query = this.queryBuilder(categoryId, name, orderBy, order);
        const offset = (page - 1) * limit;

        const [products, total] = await query.take(limit).skip(offset).getManyAndCount();

        const paginationResult: PaginatedResult<ProductEntity> = {
            data: products,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        };

        return paginationResult;
    }

    async findById(id: number): Promise<ProductEntity | undefined> {
        const product = await this.productsRepository.findOneBy({ id });
        if (!product) return undefined;
        return product;
    }

    async create(input: CreateProductDto): Promise<ProductEntity> {
        const product = await this.productsRepository.save(input);
        return product;
    }

    async update(product: ProductEntity): Promise<ProductEntity> {
        return this.productsRepository.save(product);
    }
    
    async remove(product: ProductEntity): Promise<ProductEntity> {
        return this.productsRepository.remove(product);
    }

    async countByCategory(id: number): Promise<number> {
        return this.queryBuilder(id).getCount();
    }
    
    private queryBuilder(categoryId?: number, name?: string, orderBy?: 'id' | 'name' | 'price' | 'stock', order: 'asc' | 'desc' = 'asc') {
        const query = this.productsRepository.createQueryBuilder('product');

        if (name) {
            query.where('product.name ILIKE :name', { name: `%${name}%` });
        }

        if (orderBy) {
            query.orderBy(`product.${orderBy}`, order === 'asc' ? 'ASC' : 'DESC');
        }

        if (categoryId) {
            query.andWhere('product.category.id = :categoryId', { categoryId });
        }

        return query;
    }
}
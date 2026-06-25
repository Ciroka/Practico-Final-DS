import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

import { CreateProductDto } from "../dto";
import { PaginatedResult } from "../../shared/pagination/pagination.type";
import { OrderEnum } from "../../shared/enums/order.enum";
import { SortEnum } from "../../shared/enums/sort.enum";
import { IProductsRepository } from "./products.repository.interface";
import { ProductEntity } from "../entities/product.entity";

@Injectable()
export class ProductsRepository implements IProductsRepository {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productsRepository: Repository<ProductEntity>,
    ) {}

    async findAll(page: number, limit: number, order: OrderEnum, sortBy?: SortEnum, name?: string, categoryId?: number): Promise<PaginatedResult<ProductEntity>> {
        const query = this.queryBuilder(categoryId, name, sortBy, order);
        const offset = (page - 1) * limit;

        const [products, total] = await query.take(limit).skip(offset).getManyAndCount();

        const paginationResult: PaginatedResult<ProductEntity> = {
            items: products,
            total,
            page,
            limit,
        };

        return paginationResult;
    }

    async findById(id: number): Promise<ProductEntity | undefined> {
        const product = await this.productsRepository.findOne({
            where: { id },
            relations: {
                category: true
            }
        });
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
    
    private queryBuilder(categoryId?: number, name?: string, sortBy?: SortEnum, order: OrderEnum = OrderEnum.ASC) {
        const query = this.productsRepository.createQueryBuilder('product')
                                                .innerJoinAndSelect('product.category', 'category');

        if (name) {
            query.where('product.name ILIKE :name', { name: `%${name}%` });
        }

        if (sortBy) {
            query.orderBy(`product.${sortBy}`, order);
        }

        if (categoryId) {
            query.andWhere('product.categoryId = :categoryId', { categoryId });
        }

        return query;
    }
}
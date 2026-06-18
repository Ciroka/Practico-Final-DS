import { PaginatedResult } from "src/shared/paginacion.type";
import { ProductsRepository } from "./products.repository";
import { Injectable} from "@nestjs/common";
import { ProductEntity } from "../entities/ProductEntity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateProduct } from "../dto/create-Product.dto";

@Injectable()
export class TypeOrmProductsRepository implements ProductsRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productsRepository: Repository<ProductEntity>,
  ) {}

  async findAll(page: number, limit: number,  order: 'asc' | 'desc', name?: string, orderBy?: string, categoryId?: number): Promise<PaginatedResult<ProductEntity>> {
    const query = await this.queryBuilder(name, orderBy, order, categoryId)
    
        const offset = (page - 1) * limit
        const [data, total] = await query.take(limit).skip(offset).getManyAndCount()  
        const paginationResult: PaginatedResult<ProductEntity> = {
        data,
        meta: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }}
        return paginationResult;
    }

    async findAllByCategory(categoryId: number): Promise<ProductEntity[]> {
        return this.productsRepository.find({where: {category: {id: categoryId}}})
    }

    async queryBuilder(name?: string, orderBy?: string, order: string = 'asc', categoryId?: number){
        const query = this.productsRepository.createQueryBuilder('products')

        if (name) {
            query.where('LOWER(products.name) LIKE :name', {name: name.toLowerCase()})
        }
        if (orderBy){
            query.orderBy(`products.${orderBy}`, order === 'asc' ? 'ASC' : 'DESC')
        }
        if (categoryId) {
            query.andWhere('products.category.id = :categoryId', {categoryId})
        }
        return query
    }
    async findById(id: number): Promise<ProductEntity | undefined> {
        const product = await this.productsRepository.findOneBy({id});
        if (!product) return undefined;

        return product;
    }

    async create(input: CreateProduct): Promise<ProductEntity> {
        const product = await this.productsRepository.save(input);
        return product;
    }

    async update(product: ProductEntity): Promise<ProductEntity> {
        return  this.productsRepository.save(product);
    }

    async remove(product: ProductEntity): Promise<ProductEntity>{
        return this.productsRepository.remove(product);
    }

}
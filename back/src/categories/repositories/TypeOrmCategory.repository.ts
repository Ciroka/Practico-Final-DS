import { Injectable } from "@nestjs/common";
import { CategoriesRepository } from "./categories.repository";
import { PaginatedResult } from "src/shared/paginacion.type";
import { Category, } from "../category.types";
import { CategoryEntity } from "../entity/category.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCategory } from "../dto/create-categories.dto";


@Injectable()
export class TypeOrmCategoryRepository implements CategoriesRepository {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoriesRepository: Repository<CategoryEntity>,
    ){}

    async findAll(page: number, limit: number, name?: string, order?: 'asc' | 'desc'): Promise<PaginatedResult<Category>> {
        const offset = (page - 1) * limit
        const query = await this.queryBuilder(name, order);
        const [categories, total] = await query.skip(offset).take(limit).getManyAndCount();
        const paginationResult: PaginatedResult<Category> = {
            data: categories,
            meta: {
                page,
                limit,
                total, 
                totalPages: Math.ceil(total / limit)
            }
        }
        return paginationResult 
    }

    async queryBuilder(name?: string, order?: 'asc' | 'desc') {
        const query = this.categoriesRepository.createQueryBuilder('categories');


        if (name) {
            query.where('LOWER(category.name) ILIKE :name', {name:name.toLowerCase()});
        }
        if (order){
            query.orderBy('category.name', order === 'asc' ? 'ASC' : 'DESC');
        }
        
        return query

    }

    async findById(id: number): Promise<Category | undefined> {
        const category = await this.categoriesRepository.findOneBy({id});
        if (!category) return undefined;
        return category;
    }
    
    async create(input: CreateCategory): Promise<Category> {
        const category = await this.categoriesRepository.save(input);
        return category
    }

    async update(category: CategoryEntity): Promise<Category> {
        return this.categoriesRepository.save(category);
    }

    async remove(category: CategoryEntity): Promise<Category> {
        return this.categoriesRepository.remove(category); 
    }
}
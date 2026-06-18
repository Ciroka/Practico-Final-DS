import { Injectable } from "@nestjs/common";
import { CategoriesRepository } from "./categories.repository";
import { PaginatedResult } from "src/shared/paginacion.type";
import { Category, CreateCategoryInput, UpdateCategoryInput } from "../category.types";
import { CategoryEntity } from "../entity/category.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCategory } from "../dto/create-categories.dto";
import { UpdateCategory } from "../dto/update-categories.dto";



@Injectable()
export class TypeOrmCategoryRepository implements CategoriesRepository {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoriesRepository: Repository<CategoryEntity>,
    ){}
 
    async findAll(): Promise<Category[]> {
        return await this.categoriesRepository.find();
    }   
    
    async findAllPages(page: number = 1, limit: number = 50): Promise<PaginatedResult<Category>> {
        const categories = await this.categoriesRepository.find();
        
        if (page <= 0) page = 1
        if (limit <= 0 || limit >= 50) limit = 50
    
        const offset = (page - 1) * limit
        const total = categories.length
        const paginationResult: PaginatedResult<Category> = {
            data: categories.slice(offset, offset + limit),
            meta: {
                page,
                limit,
                total, 
                totalPages: Math.ceil(total / limit)
            }
        }
        return paginationResult 
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

    async update(id: number, input: UpdateCategory): Promise<Category | undefined> {
        const category = await this.categoriesRepository.findOneBy({id});
        if(!category) return undefined;

        if (input.name !== undefined) category.name = input.name;
        
        await this.categoriesRepository.save(category);
        
        return category;
    }

    async remove(id: number): Promise<Category | undefined> {
        const category = await this.categoriesRepository.findOneBy({id});
        if(!category) return undefined;

        await this.categoriesRepository.delete(id); 
        return category;
    }
}
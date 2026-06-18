/*import { Category, CreateCategoryInput } from "../category.types";
import { CategoriesRepository } from "./categories.repository";
import { PaginatedResult } from "src/shared/paginacion.type";



export class InMemoryCategoriesRepository implements CategoriesRepository{    
    private categories: Category[] = []
    private nextId = 1


    findAll(): Category[] {
        return this.categories
    }   
    
    findAllPages(page: number = 1, limit: number = 50): PaginatedResult<Category> {
        if (page <= 0) page = 1
        if (limit <= 0 || limit >= 50) limit = 50
    
        const offset = (page - 1) * limit
        const total = this.categories.length
        const paginationResult: PaginatedResult<Category> = {
            data: this.categories.slice(offset, offset + limit),
            meta: {
                page,
                limit,
                total, 
                totalPages: Math.ceil(total / limit)
            }
        }
        return paginationResult 
    }

    findById(id: number): Category | undefined {
        return this.categories.find(c => c.id === id)
    }
    
    create(input: CreateCategoryInput): Category {
        const category: Category = {
            id: this.nextId++,
            name: input.name,
        }
        this.categories.push(category)
        return category
    }

    remove(id: number): Category | undefined {
        const category = this.findById(id);
        if(!category) return undefined;

        this.categories = this.categories.filter((c) => c.id !== id); 
        return category;
    }
}*/
import { Paginated } from "./pagination";
import { QueryDto } from "./query-params";

export interface Category {
  id: number;
  name: string;
}

export interface CreateCategoryDto {
  name: string;
}

export interface UpdateCategoryDto {
  name: string;
}

export interface QueryCategoriesDto extends QueryDto {}

export interface PaginatedCategories extends Paginated<Category> {}
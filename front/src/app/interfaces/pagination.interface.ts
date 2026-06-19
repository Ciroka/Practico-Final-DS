import { Category } from "../models/category.model";
import { Product } from "../models/product.model";

interface Paginated<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }
}

export interface PaginatedCategories extends Paginated<Category> {}

export interface PaginatedProducts extends Paginated<Product> {}
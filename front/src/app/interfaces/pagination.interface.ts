import { Category } from "../models/category.model";
import { Product } from "../models/product.model";

interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

export interface PaginatedCategories extends Paginated<Category> {}

export interface PaginatedProducts extends Paginated<Product> {}
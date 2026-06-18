import { Paginated } from "./pagination";
import { QueryDto } from "./query-params";

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  categoryId: number | null;
  category: { id: number; name: string } | null;
}

export interface CreateProductDto {
  name: string;
  price: number;
  stock?: number;
  categoryId?: number | null;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {}

export interface QueryProductsDto extends QueryDto {
  sortBy?: 'id' | 'name' | 'price' | 'stock';
}

export interface PaginatedProducts extends Paginated<Product> {}
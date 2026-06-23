import { OrderEnum } from "../types/order.enum";
import { SortEnum } from "../types/sort.enum";

interface QueryDto {
  name?: string;
  order?: OrderEnum;
  page?: number;
  limit?: number;
}

export interface QueryCategoriesDto extends QueryDto {}

export interface QueryProductsDto extends QueryDto {
  sortBy?: SortEnum;
}
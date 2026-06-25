import { OrderEnum, SortEnum } from "../types";

export interface QueryProductsDto {
  name?: string;
  order?: OrderEnum;
  sortBy?: SortEnum;
  page?: number;
  limit?: number;
}
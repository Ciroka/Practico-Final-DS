interface QueryDto {
  name?: string;
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface QueryCategoriesDto extends QueryDto {}

export interface QueryProductsDto extends QueryDto {
  sortBy?: 'id' | 'name' | 'price' | 'stock';
}
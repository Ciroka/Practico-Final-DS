export interface CreateProductDto {
  name: string;
  price: number;
  stock?: number;
  categoryId?: number | null;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {}
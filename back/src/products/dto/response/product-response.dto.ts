import { CategoryResponse } from "../../../categories/dto";

export interface ProductResponse {
    id: number;
    name: string;
    price: number;
    stock: number;
    categoryId?: number | null;
    category?: CategoryResponse;
};
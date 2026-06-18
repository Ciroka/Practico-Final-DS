import { CategoryEntity } from "../../categories/entity/category.entity";
export declare class ProductEntity {
    id: number;
    name: string;
    price: number;
    stock: number;
    category: CategoryEntity;
}

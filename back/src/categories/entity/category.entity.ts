import { ProductEntity } from "src/products/entities/ProductEntity";
import { Product } from "src/products/product.types";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CategoryEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => ProductEntity, products => products.category, {nullable: true})
    products?: Product[];
}
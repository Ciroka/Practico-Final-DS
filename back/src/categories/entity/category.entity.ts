import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "../../products/entities/product.entity";

@Entity('categories')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => ProductEntity, products => products.category, { nullable: true })
    products?: ProductEntity[];
}
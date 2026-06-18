import { CategoryEntity } from "src/categories/entity/category.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductEntity {
    
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    name!: string;
    
    @Column('decimal', {precision: 10, scale: 2})
    price!: number;
    
    @Column()
    stock!: number;
    
    @ManyToOne(() => CategoryEntity, category => category.products, {nullable: true, eager: true})
    @JoinColumn({name: 'category_id'})
    category!: CategoryEntity;
}
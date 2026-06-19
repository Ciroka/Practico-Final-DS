import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEntity } from "../../categories/entity/category.entity";

@Entity('products')
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    name!: string;
    
    @Column('decimal', { precision: 10, scale: 2 })
    price!: number;
    
    @Column()
    stock!: number;
    
    @ManyToOne(() => CategoryEntity, category => category.products, { nullable: true, eager: true })
    @JoinColumn({ name: 'category_id' })
    category!: CategoryEntity;
}
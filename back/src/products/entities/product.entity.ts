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
    
    @Column({ type: 'int', default: 0 })
    stock!: number;

    @Column({ name: 'category_id' })
    categoryId?: number;
    
    @ManyToOne(() => CategoryEntity, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'category_id' })
    category?: CategoryEntity;
}
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../user-role.enum";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    
    @Column({ unique: true })
    email!: string;
    
    @Column({ select: false, name: 'password_hash' })
    passwordHash!: string;
    
    @Column({ type: 'text', default: UserRole.USER })
    role!: UserRole;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
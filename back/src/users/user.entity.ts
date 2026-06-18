import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../users/user-role.enum";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    
    @Column({ unique: true })
    email!: string;
    
    @Column({ select: false })
    passwordHash!: string;
    
    @Column({ type: 'text', default: UserRole.USER })
    role!: UserRole;
}
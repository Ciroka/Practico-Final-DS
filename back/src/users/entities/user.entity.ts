import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../../shared/enums';

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

    @CreateDateColumn({ name: 'created_at'})
    createdAt!: Date;

    @Column({default: false, name: "is_verified"})
    isVerified!: boolean;

    @Column({nullable: true, name: "verification_token", type: "varchar"})
    verificationToken!: string | null;

    @Column({nullable: true, name: "reset_password_token", type: "varchar"})
    resetPasswordToken!: string | null;
    
    @Column({nullable: true, name: "reset_password_expires", type: 'timestamptz'})
    resetPasswordExpires!: Date | null;
}
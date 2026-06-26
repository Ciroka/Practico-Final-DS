import { DeepPartial } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

export const USERS_REPOSITORY = 'USERS_REPOSITORY';

export interface IUsersRepository {
    findAll(): Promise<UserEntity[]>;
    findOneByEmail(email: string): Promise<UserEntity | null>;
    findOneById(id: string): Promise<UserEntity | null>;
    findOneByEmailWithPassword(email: string): Promise<UserEntity | null>;
    findOneByVerificationToken(verificationToken: string): Promise<UserEntity | null>;
    findOneByResetPasswordToken(verificationToken: string): Promise<UserEntity | null>;
    count(): Promise<number>;
    register(user: DeepPartial<UserEntity>): Promise<UserEntity>;
    existsByEmail(email: string): Promise<boolean>;
    update(user: DeepPartial<UserEntity>): Promise<UserEntity>;
}
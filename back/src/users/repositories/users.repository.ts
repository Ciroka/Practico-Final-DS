import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { IUsersRepository } from './users.repository.interface';
import { UserEntity } from '../entities/user.entity';

export class UsersRepository implements IUsersRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepo: Repository<UserEntity>
    ) {}

    async findAll(): Promise<UserEntity[]> {
        return this.usersRepo.find();
    }

    async findOneById(id: string): Promise<UserEntity | null> {
        return this.usersRepo.findOneBy({ id });
    }

    async findOneByEmail(email: string): Promise<UserEntity | null> {
        return this.usersRepo.findOneBy({ email });
    }

    async findOneByEmailWithPassword(email: string): Promise<UserEntity | null> {
        return this.usersRepo.createQueryBuilder('u')
                            .addSelect('u.passwordHash')
                            .where('u.email = :email', { email })
                            .getOne();
    }

    async findOneByIdWithPassword(id: string): Promise<UserEntity | null> {
        return this.usersRepo.createQueryBuilder('u')
                            .addSelect('u.passwordHash')
                            .where('u.id = :id', { id })
                            .getOne();
    }

    async findOneByVerificationToken(verificationToken: string){
        return this.usersRepo.findOneBy({verificationToken});
    }

    async findOneByResetPasswordToken(resetPasswordToken: string): Promise<UserEntity | null>{
        return this.usersRepo.findOneBy({resetPasswordToken})
    }

    async count(): Promise<number> {
        return this.usersRepo.count();
    }

    async register(user: DeepPartial<UserEntity>): Promise<UserEntity> {
        const userCreated = this.usersRepo.create(user);
        return this.usersRepo.save(userCreated);
    }

    async existsByEmail(email: string): Promise<boolean> {
        return this.usersRepo.existsBy({ email });
    }

    async update(user: DeepPartial<UserEntity>): Promise<UserEntity> {
        return this.usersRepo.save(user);
    }

    async delete(user: UserEntity): Promise<void> {
        await this.usersRepo.remove(user);
    }
}
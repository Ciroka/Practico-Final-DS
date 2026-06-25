import { DeepPartial, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { IUsersRepository } from './users.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';

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

    async findOneByVerificationToken(verificationToken: string){
        return this.usersRepo.findOneBy({verificationToken});
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
}
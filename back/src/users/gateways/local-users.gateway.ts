import path, { join } from 'path';
import { UserExternal } from '../dto';
import { UsersGateway } from './users.gateway';
import { readFileSync } from 'fs';
import { NotFoundException } from '@nestjs/common';

export class LocalUsersGateway implements UsersGateway {
    fetchAll(): Promise<UserExternal[]> {
        const data = readFileSync(join(process.cwd(), 'src/users/data/users.json'), 'utf-8');
        const users: UserExternal[] = JSON.parse(data);
        return Promise.resolve(users);
    }

    fetchById(id: number): Promise<UserExternal> {
        const data = readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8');
        const users: UserExternal[] = JSON.parse(data);
        
        const user = users.find(p => p.id === id);
        if (!user) throw new NotFoundException('User not found.');
        
        return Promise.resolve(user);
    }
}
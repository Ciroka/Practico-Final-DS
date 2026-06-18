import path, { join } from "path";
import { ExternalUser } from "../user.types";
import { UsersGateway } from "./users.gateway";
import { readFileSync } from "fs";
import { NotFoundException } from "@nestjs/common";

export class LocalUsersGateway implements UsersGateway {
    fetchAll(): Promise<ExternalUser[]> {
        const data = readFileSync(join(process.cwd(), 'src/users/data/users.json'), 'utf-8');
        const users: ExternalUser[] = JSON.parse(data);
        return Promise.resolve(users);
    }

    fetchById(id: number): Promise<ExternalUser> {
        const data = readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8');
        const users: ExternalUser[] = JSON.parse(data);
        
        const user = users.find(p => p.id === id);
        if (!user) throw new NotFoundException('User not found.');
        
        return Promise.resolve(user);
    }
}
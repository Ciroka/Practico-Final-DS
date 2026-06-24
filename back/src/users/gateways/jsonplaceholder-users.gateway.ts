import axios from 'axios';

import { UserExternal } from '../dto';
import { UsersGateway } from './users.gateway';

export class JsonPlaceholderUsersGateway implements UsersGateway {
  async fetchAll(): Promise<UserExternal[]> {
    const { data } = await axios.get<UserExternal[]>(
      'https://jsonplaceholder.typicode.com/users',
    );
    return data;
  }

  async fetchById(id: number): Promise<UserExternal> {
    const { data } = await axios.get<UserExternal>(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    );
    return data;
  }
}
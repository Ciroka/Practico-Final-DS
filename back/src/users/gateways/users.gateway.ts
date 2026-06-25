import { UserExternal } from '../dto';

export const USERS_GATEWAY = 'USERS_GATEWAY';

export interface UsersGateway {
  fetchAll(): Promise<UserExternal[]>;
  fetchById(id: number): Promise<UserExternal>;
}
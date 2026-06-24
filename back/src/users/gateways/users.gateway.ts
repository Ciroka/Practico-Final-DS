import { UserExternal } from '../dto/response/user-external.dto';

export const USERS_GATEWAY = 'USERS_GATEWAY';

export interface UsersGateway {
  fetchAll(): Promise<UserExternal[]>;
  fetchById(id: number): Promise<UserExternal>;
}
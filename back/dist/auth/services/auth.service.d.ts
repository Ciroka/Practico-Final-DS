import { ConfigService } from "@nestjs/config";
import { UserRegister } from "../dto/userRegister.dto";
import { UserEntity } from "../../users/user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { UserLogin } from "../dto/userLogin.dto";
export declare class AuthService {
    private readonly usersRepo;
    private readonly configService;
    private readonly jwtService;
    constructor(usersRepo: Repository<UserEntity>, configService: ConfigService, jwtService: JwtService);
    register(userRegister: UserRegister): Promise<UserEntity>;
    login(userLogin: UserLogin): Promise<{
        access_token: string;
    }>;
}

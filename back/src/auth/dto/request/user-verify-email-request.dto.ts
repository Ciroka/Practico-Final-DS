import { IsString } from "class-validator";


export class UserVerifyEmailDto{

    @IsString()
    token!: string;
}
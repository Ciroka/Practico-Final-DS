import { IsNotEmpty, IsString, IsUUID, isUUID, Min, MinLength } from "class-validator";


export class UserResetPassword {

    @IsString()
    @IsNotEmpty()
    token!: string
    
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password!: string
}
import { IsNotEmpty, IsString, IsUUID, isUUID } from "class-validator";


export class UserResetPassword {

    @IsString()
    @IsNotEmpty()
    @IsUUID('4')
    token!: string
    
    @IsString()
    @IsNotEmpty()
    password!: string
}
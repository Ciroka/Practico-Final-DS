import { IsEmail, isEmail, IsString } from "class-validator"

export class UserRegister {

    @IsEmail()
    email!: string

    @IsString()
    plainPassword!: string
}
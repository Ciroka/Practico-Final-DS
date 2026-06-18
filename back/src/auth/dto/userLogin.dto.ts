import { IsEmail, isEmail, IsString } from "class-validator"

export class UserLogin {

    @IsEmail()
    email!: string

    @IsString()
    plainPassword!: string
}
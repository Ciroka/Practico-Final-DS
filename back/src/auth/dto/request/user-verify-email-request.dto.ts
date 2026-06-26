import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class UserVerifyEmailRequest {
    @IsString()
    @IsNotEmpty()
    @IsUUID('4')
    token!: string;
}
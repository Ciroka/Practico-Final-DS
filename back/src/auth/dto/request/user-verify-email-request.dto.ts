import { IsString } from "class-validator";

export class UserVerifyEmailRequest {
    @IsString()
    token!: string;
}
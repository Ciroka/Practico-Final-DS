import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateCategory {
    
    @IsString()
    @MinLength(2)
    @MaxLength(100) 
    @IsNotEmpty()
    name!: string;
}
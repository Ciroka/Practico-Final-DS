import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength, Min, MinLength } from "class-validator";


export class CreateCategory {
    
    @IsString()
    @MinLength(2)
    @MaxLength(100) 
    @IsNotEmpty()
    name!: string;
}
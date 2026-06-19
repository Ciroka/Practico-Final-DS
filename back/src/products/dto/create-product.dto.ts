import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100) 
    name!: string;
    
    @IsNumber()
    @IsPositive()
    price!: number;
    
    @IsInt()
    @Min(0)
    stock!: number;
    
    @IsInt()
    @IsOptional()
    categoryId?: number;
}
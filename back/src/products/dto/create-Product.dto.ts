import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength, Min, MinLength } from "class-validator";
import { Category } from "src/categories/category.types";

export class CreateProduct {
    
    @IsString()
    @MinLength(2)
    @MaxLength(100) 
    @IsNotEmpty()
    name!: string;
    
    @IsNumber()
    @IsPositive()
    price!: number;
    
    @IsInt()
    @Min(0)
    stock!: number;
    
    @IsOptional()
    categoryId?: number;
}
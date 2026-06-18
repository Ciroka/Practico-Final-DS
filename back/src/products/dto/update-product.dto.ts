import { IsInt, IsNumber, IsOptional, IsPositive, IsString, MaxLength, MinLength } from "class-validator";


export class UpdateProduct {
    
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    @IsOptional()
    name?: string;
    
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;
    
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number;
    
    @IsNumber()
    @IsPositive()
    @IsOptional()
    categoryId?: number;
}
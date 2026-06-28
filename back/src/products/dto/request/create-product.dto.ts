import { IsDecimal, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(256) 
    name!: string;
    
    @IsNumber({maxDecimalPlaces: 4})
    @IsPositive()
    price!: number;
    
    @IsInt()
    @IsPositive()
    @Min(0)
    @IsOptional()
    stock: number = 0;
    
    @IsNumber()
    @IsOptional()
    categoryId?: number;
}
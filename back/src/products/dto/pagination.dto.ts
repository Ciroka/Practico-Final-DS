import { Transform, Type } from "class-transformer"
import { IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, Max, Min } from "class-validator"

export class PaginateDto {
    
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    @Transform(({value}) => value ?? 1)
    page!: number

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(50)
    @Type(() => Number)
    @Transform(({value}) => value ?? 50)
    limit!: number

    @IsOptional()
    @IsString()
    name?: string
    
    @IsOptional()
    @IsIn(["name", "id", "price", "stock"])
    orderBy?: string;
    
    @IsOptional()
    @IsIn(["desc", "asc"])
    order?: string = "asc"
    
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    categoryId?: number
}
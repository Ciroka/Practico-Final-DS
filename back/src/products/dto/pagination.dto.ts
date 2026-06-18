import { Transform, Type } from "class-transformer"
import { IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, Max, Min } from "class-validator"
import { QueryParamsDto } from "src/shared/params.dto"

export class QueryParamsProductDto extends QueryParamsDto {
    @IsOptional()
    @IsIn(['id', 'name', 'price', 'stock'])
    orderBy?: 'id' | 'name' | 'price' | 'stock';
    
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    categoryId?: number;
}
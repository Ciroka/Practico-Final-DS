import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional } from "class-validator";

import { QueryParamsDto } from "../../shared/params.dto";

export class QueryParamsProductDto extends QueryParamsDto {
    @IsOptional()
    @IsIn(['id', 'name', 'price', 'stock'])
    orderBy?: 'id' | 'name' | 'price' | 'stock';
    
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    categoryId?: number;
}
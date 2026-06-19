import { IsIn, IsOptional } from "class-validator";

import { QueryParamsDto } from "../../shared/params.dto";

export class QueryParamsProductDto extends QueryParamsDto {
    @IsOptional()
    @IsIn(['id', 'name', 'price', 'stock'])
    orderBy?: 'id' | 'name' | 'price' | 'stock';
}
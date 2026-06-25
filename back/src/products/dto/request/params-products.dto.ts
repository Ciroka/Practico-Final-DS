import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from "class-validator";

import { SortEnum } from "../../../shared/enums/sort.enum";
import { OrderEnum } from "../../../shared/enums/order.enum";
import { Type } from "class-transformer";

export class QueryParamsProductDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEnum(OrderEnum)
    order: OrderEnum = OrderEnum.ASC;

    @IsOptional()
    @IsEnum(SortEnum)
    sortBy?: SortEnum;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page: number = 1;
    
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit: number = 10;
}
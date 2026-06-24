import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

import { OrderEnum } from "./order.enum";

export class QueryParamsDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEnum(OrderEnum)
    order: OrderEnum = OrderEnum.ASC;

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
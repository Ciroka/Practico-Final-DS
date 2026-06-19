import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class QueryParamsDto {
    @IsInt()
    @Min(1)
    @Type(() => Number)
    page: number = 1;
    
    @IsIn(['asc', 'desc'])
    order: 'asc' | 'desc' = 'asc';

    @IsInt()
    @Min(1)
    @Max(50)
    @Type(() => Number)
    limit: number = 50;

    @IsOptional()
    @IsString()
    name?: string;
}
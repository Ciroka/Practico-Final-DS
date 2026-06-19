import { Type } from "class-transformer"
import { IsIn, IsInt, IsNumber, IsOptional, IsString, Max, Min } from "class-validator"
import { QueryParamsDto } from "src/shared/params.dto"

export class RequestProductDto extends QueryParamsDto {
    @IsOptional()
    @IsIn(["name", "id", "price", "stock"])
    orderBy?: string;
    
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    categoryId?: number
}
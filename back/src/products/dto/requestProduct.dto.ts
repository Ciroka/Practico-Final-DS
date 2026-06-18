import { Transform, Type } from "class-transformer"
import { IsIn, IsInt, IsNumber, IsOptional, IsString, Max, Min } from "class-validator"
import { RequestDto } from "src/shared/params.dto"

export class RequestProductDto extends RequestDto {
    @IsOptional()
    @IsIn(["name", "id", "price", "stock"])
    orderBy?: string;
    
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    categoryId?: number
}
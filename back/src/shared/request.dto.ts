import { Transform, Type } from "class-transformer";
import { IsIn, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export abstract class RequestDto {
    
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
    limit!: number;
    
    @IsIn(["desc", "asc"])
    order: 'asc' | 'desc' = "asc";
    
    @IsOptional()
    @IsString()
    name?: string;
        
}
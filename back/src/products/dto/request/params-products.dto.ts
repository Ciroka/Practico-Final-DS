import { IsEnum, IsOptional } from "class-validator";

import { QueryParamsDto } from "../../../shared/params.dto";
import { SortEnum } from "../../../shared/sort.enum";

export class QueryParamsProductDto extends QueryParamsDto {
    @IsOptional()
    @IsEnum(SortEnum)
    sortBy?: SortEnum;
}
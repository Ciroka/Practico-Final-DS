import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateCategoryDto {
    @IsString()
    @MinLength(1)
    @MaxLength(128) 
    @IsNotEmpty()
    name!: string;
}
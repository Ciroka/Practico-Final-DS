import { IsNumber, IsPositive } from "class-validator";

export class UpdateStock {
    @IsNumber()
    @IsPositive()
    quantity!: number;
}
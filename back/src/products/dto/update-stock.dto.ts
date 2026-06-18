import { IsNumber, IsPositive } from "class-validator";


export class UpdateStock {

    @IsPositive()
    @IsNumber()
    quantity!: number
}
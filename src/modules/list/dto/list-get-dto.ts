import { IsMongoId, IsNotEmpty } from "class-validator";

export class ListGetDto {
    @IsNotEmpty({ message: 'List ID is required.' })
    @IsMongoId({ message: 'Invalid List ID.' })
    id: string;
}
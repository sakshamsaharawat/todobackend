import { IsMongoId, IsNotEmpty } from "class-validator";

export class ListDeleteDto {
    @IsNotEmpty({ message: 'List ID is required.' })
    @IsMongoId({ message: 'Invalid List ID.' })
    id: string;
}
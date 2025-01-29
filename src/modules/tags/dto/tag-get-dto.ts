import { IsMongoId, IsNotEmpty } from "class-validator";

export class TagGetDto {
    @IsNotEmpty({ message: 'Tag ID is required.' })
    @IsMongoId({ message: 'Invalid Tag ID.' })
    id: string;
}
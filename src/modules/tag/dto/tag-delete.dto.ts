import { IsMongoId, IsNotEmpty } from "class-validator";

export class TagDeleteDto {
    @IsNotEmpty({ message: 'Tag ID is required.' })
    @IsMongoId({ message: 'Invalid Tag ID.' })
    id: string;
}
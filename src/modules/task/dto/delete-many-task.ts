import { Transform } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsMongoId } from "class-validator";

export class DeleteManyTaskDto {
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
    @IsMongoId({ each: true, message: 'Each ID must be a valid MongoDB ObjectId.' })
    @IsArray({ message: 'Task IDs must be an array.' })
    @ArrayNotEmpty({ message: 'Task IDs array cannot be empty.' })
    ids: string[];
}
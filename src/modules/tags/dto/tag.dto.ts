import { IsBoolean, IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class TagDto {
    @IsNotEmpty({ message: 'User Id is required.' })
    @IsMongoId({ message: 'User Id must be a valid MongoDb ObjectId.' })
    user_id: Types.ObjectId;

    @IsNotEmpty({ message: 'Title is required.' })
    @IsString({ message: 'Title must be a string.' })
    title: string;

    @IsNotEmpty({ message: 'Color_code is required.' })
    @IsString({ message: 'Color_code must be a string.' })
    color_code: string;

    @IsNotEmpty({ message: 'isDeleted flag is required.' })
    @IsBoolean({ message: 'isDeleted must be a boolean value.' })
    isDeleted: boolean;
}
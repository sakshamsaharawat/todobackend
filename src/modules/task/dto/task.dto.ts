import {
  IsBoolean,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class TaskDto {
  @IsNotEmpty({ message: 'User ID is required.' })
  @IsMongoId({ message: 'User ID must be a valid MongoDB ObjectId.' })
  user_id: Types.ObjectId;

  @IsNotEmpty({ message: 'Title is required.' })
  @IsString({ message: 'Title must be a string.' })
  title: string;

  @IsNotEmpty({ message: 'Description is required.' })
  @IsString({ message: 'Description must be a string.' })
  description: string;

  @IsNotEmpty({ message: 'Date is required.' })
  @IsDateString()
  date: string;

  @IsNotEmpty({ message: 'isDeleted flag is required.' })
  @IsBoolean({ message: 'isDeleted must be a boolean value.' })
  isDeleted: boolean;
}

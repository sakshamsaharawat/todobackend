import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import { Types } from 'mongoose';

export class TaskDto {

  @IsNotEmpty({ message: 'Title is required.' })
  @IsString({ message: 'Title must be a string.' })
  @Matches(/^\S*$/, { message: 'Title cannot contain spaces.' })
  title: string;

  @IsNotEmpty({ message: 'Description is required.' })
  @IsString({ message: 'Description must be a string.' })
  @Matches(/^\S*$/, { message: 'Description cannot contain spaces.' })
  description: string;

  @IsNotEmpty({ message: 'Date is required.' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Date must be in YYYY-MM-DD format.' })
  @IsDateString({}, { message: 'Date must be a valid ISO 8601 date string.' })
  date: string;
}
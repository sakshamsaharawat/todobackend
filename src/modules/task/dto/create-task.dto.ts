import { Transform } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateTaskDto {

  @IsNotEmpty({ message: 'Title is required.' })
  @IsString({ message: 'Title must be a string.' })
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @Matches(/^(?!.*\s{2,})[A-Za-z0-9]+(?:\s[A-Za-z0-9]+)*$/, { message: 'Title cannot have consecutive spaces.' })
  title: string;

  @IsNotEmpty({ message: 'Description is required.' })
  @IsString({ message: 'Description must be a string.' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Matches(/^(?!.*\s{2,})[\w\s,.'!?-]+$/, {
    message: 'Description cannot have consecutive spaces.',
  })
  description: string;

  @IsNotEmpty({ message: 'Date is required.' })
  // @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Date must be in YYYY-MM-DD format.' })
  // @IsDateString({}, { message: 'Date must be a valid ISO 8601 date string.' })
  due_date: string;

  @IsOptional()
  @IsArray({ message: 'tagIds must be an array.' })
  @IsMongoId({ each: true, message: 'Each tagId must be a valid MongoDB ObjectId.' })
  @Transform(({ value }) => (Array.isArray(value) ? value.map((id: string) => id.trim()) : value))
  tag_ids?: string[];

  @IsOptional()
  @IsMongoId({ message: 'List ID must be a valid MongoDB ObjectId.' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  list_id?: string;

}

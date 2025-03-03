import { Transform } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateTaskDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Matches(/^(?!.*\s{2,})[A-Za-z0-9]+(?:\s[A-Za-z0-9]+)*$/, {
    message: 'Title cannot have consecutive spaces.',
  })
  @Length(3, 100, {
    message: 'Title must be between 3 and 100 characters long.',
  })
  @IsString({ message: 'Title must be a string.' })
  @IsNotEmpty({ message: 'Title is required.' })
  title: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Matches(/^(?!.*\s{2,})[\w\s,.'!?-]+$/, {
    message: 'Description cannot have consecutive spaces.',
  })
  @Length(0, 500, {
    message: 'Description cannot exceed 500 characters.',
  })
  @IsString({ message: 'Description must be a string.' })
  @IsNotEmpty({ message: 'Description is required.' })
  description: string;

  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date must be in YYYY-MM-DD format.',
  })
  @IsNotEmpty({ message: 'Date is required.' })
  due_date: string;

  @Transform(({ value }) => (Array.isArray(value) ? value.map((id: string) => id.trim()) : value))
  @IsMongoId({ each: true, message: 'Each tagId must be a valid MongoDB ObjectId.' })
  @IsArray({ message: 'tagIds must be an array.' })
  @IsOptional()
  tag_ids?: string[];

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsMongoId({ message: 'List ID must be a valid MongoDB ObjectId.' })
  @IsOptional()
  list_id?: string;
}

import { Type } from '@nestjs/common';
import { Transform } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateTaskDto {

  @IsNotEmpty({ message: 'Title is required.' })
  @IsString({ message: 'Title must be a string.' })
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @Matches(/^(?!.*\s{2,})[A-Za-z0-9]+(?:\s[A-Za-z0-9]+)*$/, { message: 'Title cannot have consecutive spaces.' })
  title: string;

  @IsNotEmpty({ message: 'Description is required.' })
  @IsString({ message: 'Description must be a string.' })
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @Matches(/^(?!.*\s{2,})[A-Za-z0-9]+(?:\s[A-Za-z0-9]+)*$/, { message: 'Description cannot have consecutive spaces.' })
  description: string;

  @IsNotEmpty({ message: 'Date is required.' })
  // @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Date must be in YYYY-MM-DD format.' })
  // @IsDateString({}, { message: 'Date must be a valid ISO 8601 date string.' })
  due_date: string;

  @IsNotEmpty({ message: 'tagIds are required.' })
  @IsArray({ message: 'tagIds must be an array.' })
  @ArrayNotEmpty({ message: 'At least one tagIds is required.' })
  @IsMongoId({ each: true, message: 'Each tagIds must be a valid MongoDB ObjectId.' })
  @Transform(({ value }) => value.map((id: string) => id.trim())) 
  tag_ids: string[]; 

  @IsNotEmpty({ message: 'List ID is required.' })
  @IsMongoId({ message: 'List ID must be a valid MongoDB ObjectId.' })
  @Transform(({ value }) => value.trim()) 
  list_id: string;  
}

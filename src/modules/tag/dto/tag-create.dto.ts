import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreateTagDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Matches(/^(?!.*\s{2,})[A-Za-z0-9]+(?:\s[A-Za-z0-9]+)*$/, { message: 'Title cannot have consecutive spaces.' })
  @Length(2, 100, { message: 'Title must be between 2 and 100 characters.' })
  @IsString({ message: 'Title must be a string.' })
  @IsNotEmpty({ message: 'Title is required.' })
  title: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.toLowerCase().trim() : value))
  @Matches(/^#([0-9A-F]{3}|[0-9A-F]{6})$/i, { message: 'Color code must be a valid HEX format (e.g., #FFF or #FFFFFF).' })
  @IsString({ message: 'Color code must be a string.' })
  @IsNotEmpty({ message: 'Color code is required.' })
  color_code: string;
}
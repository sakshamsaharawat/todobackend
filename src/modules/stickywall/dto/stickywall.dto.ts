import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateStickwallyDto {
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value), { toClassOnly: true })
  @Matches(/^(?!.*\s{2,})/, { message: "Title can not contain consecutive spaces." })
  @MinLength(3, { message: "Title must contain atleast 3 characters." })
  @IsString({ message: "Title must be a string." })
  @IsNotEmpty({ message: "Title is required." })
  title: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.toLowerCase().trim() : value))
  @Matches(/^#([0-9A-F]{3}|[0-9A-F]{6})$/i, { message: 'Color code must be a valid HEX format (e.g., #FFF or #FFFFFF).' })
  @IsString({ message: 'Color code must be a string.' })
  @IsNotEmpty({ message: 'Color code is required.' })
  color_code: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.toLowerCase().trim() : value))
  @MinLength(3, { message: "Description must contain atleast 3 characters." })
  @IsString({ message: 'Description must be a string.' })
  @IsNotEmpty({ message: 'Description is required.' })
  description: string;
}
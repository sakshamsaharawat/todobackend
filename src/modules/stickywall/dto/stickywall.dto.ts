import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateStickwallyDto {
  @IsNotEmpty({ message: "Title is required." })
  @IsString({ message: "Title must be a string." })
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value), { toClassOnly: true })
  @MinLength(3, { message: "Title must contain atleast 3 characters." })
  @Matches(/^(?!.*\s{2,})/, { message: "Title can not contain consecutive spaces." })
  title: string;

  @IsNotEmpty({ message: 'Color Code is required.' })
  @IsString({ message: 'Color Code must be a string.' })
  color_code: string;

  @IsNotEmpty({ message: 'Description is required.' })
  @IsString({ message: 'Description must be a string.' })
  description: string;
}
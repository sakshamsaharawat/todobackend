import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateStickwallyDto {
  @IsNotEmpty({ message: "Title is required." })
  @IsString({ message: "Title must be a string." })
  @MinLength(3, { message: "Title must contain atleast 3 characters." })
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value), { toClassOnly: true })
  @Matches(/^(?!.*\s{2,})/, { message: "Title cannot contain consecutive spaces." })
  title: string;

  @IsNotEmpty({ message: 'Color_code is required.' })
  @IsString({ message: 'Color_code must be a string.' })
  color_code: string;

  // @IsNotEmpty({ message: 'Description is required.' })
  // @IsString({ message: 'Description must be a string.' })
  description: string;
}

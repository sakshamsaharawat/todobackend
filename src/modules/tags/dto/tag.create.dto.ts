import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Matches } from 'class-validator';


export class CreateTagDto {
  @IsString({ message: 'Title must be a string.' })
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value ))
  @IsNotEmpty({ message: 'Title is required.' })
  title: string;

  @IsNotEmpty({ message: 'Color_code is required.' })
  @IsString({ message: 'Color_code must be a string.' })
  @Matches(/^\S*$/, { message: 'Color cannot contain spaces.' })
  color_code: string;
}

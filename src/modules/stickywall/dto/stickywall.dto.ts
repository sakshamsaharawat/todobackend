import { IsNotEmpty, IsString } from 'class-validator';

export class StickyWallDto {
  @IsNotEmpty({ message: 'Title is required.' })
  @IsString({ message: 'Title must be a string.' })
  title: string;

  @IsNotEmpty({ message: 'Color_code is required.' })
  @IsString({ message: 'Color_code must be a string.' })
  color_code: string;

  @IsNotEmpty({ message: 'Content is required.' })
  @IsString({ message: 'Content must be a string.' })
  content: string;
}

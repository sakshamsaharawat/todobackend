import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'First_name is required.' })
  @IsNotEmpty({ message: 'First_name must be a string.' })
  first_name: string;

  @IsString({ message: 'last_name is required.' })
  @IsNotEmpty({ message: 'last_name must be a string.' })
  last_name: string;

  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  email: string;

  @IsNotEmpty({ message: 'Password is required.' })
  @IsString({ message: 'Password must be a string.' })
  @MinLength(4, { message: 'Password must be at least 6 characters long.' })
  password: string;

  @IsNotEmpty({ message: 'isDeleted flag is required.' })
  @IsBoolean({ message: 'isDeleted must be a boolean value.' })
  isDeleted: boolean;
}

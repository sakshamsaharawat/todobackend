import { Transform } from 'class-transformer';
import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Matches(/^[A-Za-z\s]+$/, { message: 'First name must contain only letters and spaces' })
  @Length(3, 50, { message: 'First name must be between 2 and 50 characters' })
  @IsNotEmpty({ message: 'First name is required' })
  first_name: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Matches(/^[A-Za-z\s]+$/, { message: 'Last_name must contain only letters and spaces' })
  @Length(3, 50, { message: 'Last_name must be between 2 and 50 characters' })
  @IsNotEmpty({ message: 'Last_name is required' })
  last_name: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'Email must be in a proper format (e.g., username@domain.com).',
  })
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  @IsNotEmpty({ message: 'Email is required.' })
  email: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Matches(/^\S+$/, { message: 'Password cannot contain spaces.' })
  @MinLength(4, { message: 'Password must be at least 6 characters long.' })
  @IsString({ message: 'Password must be a string.' })
  @IsNotEmpty({ message: 'Password is required.' })
  password: string;
}
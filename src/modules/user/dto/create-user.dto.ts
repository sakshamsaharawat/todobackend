import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'First name is required.' })
  @IsNotEmpty({ message: 'First name must not be empty.' })
  @Matches(/^[a-zA-Z]+$/, { message: 'First name cannot contain numbers or special characters.' })
  // @Matches(/^\S\S$/, { message: 'First name cannot have spaces before or after.' })
  first_name: string;

  @IsString({ message: 'Last name is required.' })
  @IsNotEmpty({ message: 'Last name must not be empty.' })
  @Matches(/^[a-zA-Z]+$/, { message: 'Last name cannot contain numbers or special characters.' })
  @Matches(/^\S.*\S$/, { message: 'Last name cannot have spaces before or after.' })
  last_name: string;

  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'Email must be in a proper format (e.g., username@domain.com).',
  })
  email: string;

  @IsNotEmpty({ message: 'Password is required.' })
  @IsString({ message: 'Password must be a string.' })
  @MinLength(4, { message: 'Password must be at least 6 characters long.' })
  @Matches(/^\S+$/, { message: 'Password cannot contain spaces.' })
  password: string;
}

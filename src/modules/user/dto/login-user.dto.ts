import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class LoginUserDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'Email must be in a proper format (e.g., username@domain.com).',
  })
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  @IsNotEmpty({ message: 'Email is required.' })
  email: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @MinLength(4, { message: 'Password must be at least 6 characters long.' })
  @Matches(/^\S+$/, { message: 'Password cannot contain spaces.' })
  @IsString({ message: 'Password must be a string.' })
  @IsNotEmpty({ message: 'Password is required.' })
  password: string;
};
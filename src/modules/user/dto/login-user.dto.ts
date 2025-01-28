import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class LoginUserDto {
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
   };

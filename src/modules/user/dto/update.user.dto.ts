import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'List ID is required.' })
  @IsMongoId({ message: 'Invalid List ID.' })
  id: string;

  @IsString({ message: 'First name must be a string.' })
  @IsNotEmpty({ message: 'First name is required.' })
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @Matches(/^[A-Za-z]+$/, { message: 'First name cannot have consecutive spaces.' })
  first_name: string;

  @IsString({ message: 'Last name must be a string.' })
  @IsNotEmpty({ message: 'Last name is required.' })
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @Matches(/^[A-Za-z]+$/, { message: 'Last name cannot have consecutive spaces.' })
  last_name: string;

  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Invalid email format.' })
  email: string;

  @IsOptional()
  @Matches(/^\+\d{1,4}$/, {
    message: 'Phone code must start with + followed by 1 to 4 digits (e.g., +91, +1).',
  })
  phone_code: string;

  @IsOptional()
  @Matches(/^\d{7,15}$/, {
    message: 'Phone number must be between 7 to 15 digits.',
  })
  phone_number: string;

  @IsOptional()
  @IsIn(['male', 'female', 'other'], {
    message: 'Gender must be either male, female, or other.',
  })
  gender: string;

  @IsOptional()
  @IsString({ message: 'Country must be a string.' })
  @MaxLength(56, { message: 'Country name is too long (max 56 characters).' })
  country: string;

  @IsOptional()
  @IsString({ message: 'City must be a string.' })
  @MaxLength(85, { message: 'City name is too long (max 85 characters).' })
  city: string;

  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date of birth must be in YYYY-MM-DD format.',
  })

  dob: string;

  @IsOptional()
  @IsString({ message: 'Address must be a string.' })
  @MaxLength(255, { message: 'Address is too long (max 255 characters).' })
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  address: string;
}


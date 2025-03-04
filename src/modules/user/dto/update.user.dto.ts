import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
} from 'class-validator';

export class UpdateUserDto {
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsString()
  @Matches(/^[A-Za-z]+(?: [A-Za-z]+)?$/, {
    message: "First name must contain only letters and a single space (if any). Consecutive spaces or numbers are not allowed.",
  })

  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsString()
  @Matches(/^[A-Za-z]+(?: [A-Za-z]+)?$/, {
    message: "Last name must contain only letters and a single space (if any). Consecutive spaces or numbers are not allowed.",
  })
  last_name: string;

  @IsEmail({}, { message: 'Invalid email format.' })
  @IsOptional()
  email: string;

  @Matches(/^\+\d{1,4}$/, {
    message: 'Phone code must start with + followed by 1 to 4 digits (e.g., +91, +1).',
  })
  @IsOptional()
  phone_code: string;

  @Matches(/^\d{7,15}$/, {
    message: 'Phone number must be between 7 to 15 digits.',
  })
  @IsOptional()
  phone_number: string;

  @IsIn(['male', 'female', 'prefer no to say'], {
    message: 'Gender must be either male, female, or other.',
  })
  @IsOptional()
  gender: string;

  @IsString({ message: 'Country must be a string.' })
  @MaxLength(56, { message: 'Country name is too long (max 56 characters).' })
  @IsOptional()
  country: string;

  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsString({ message: 'City must be a string.' })
  @MaxLength(85, { message: 'City name is too long (max 85 characters).' })
  @Matches(/^[A-Za-z]+$/, { message: 'City cannot have consecutive spaces.' })
  @IsOptional()
  city: string;

  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date of birth must be in YYYY-MM-DD format.',
  })
  @IsOptional()
  dob: string;

  @IsString({ message: 'Address must be a string.' })
  @MaxLength(255, { message: 'Address is too long (max 255 characters).' })
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @Matches(/^(?!.*\s{2,})[\w\s,.'!?-]+$/, {
    message: 'Address cannot have consecutive spaces.',
  })
  @IsOptional()
  address: string;

  @IsString({ message: 'Image URL must be a string.' })
  @MaxLength(500, { message: 'Image URL is too long (max 255 characters).' })
  @IsUrl({}, { message: 'Invalid image URL format.' })
  @IsOptional()
  image_url: string;
}
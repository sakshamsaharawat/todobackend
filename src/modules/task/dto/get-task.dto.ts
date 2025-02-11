import { IsDateString, IsNotEmpty, Matches } from "class-validator";

export class GetTaskDto {
    // @IsNotEmpty({ message: 'Date is required.' })
    // @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Date must be in YYYY-MM-DD format.' })
    // @IsDateString({}, { message: 'Date must be a valid ISO 8601 date string.' })
    start_date: string;

    // @IsNotEmpty({ message: 'Date is required.' })
    // @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Date must be in YYYY-MM-DD format.' })
    // @IsDateString({}, { message: 'Date must be a valid ISO 8601 date string.' })
    end_date: string;
}
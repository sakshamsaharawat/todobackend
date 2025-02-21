import { IsDateString, IsNotEmpty } from "class-validator";

export class GetTaskDto {
    @IsNotEmpty({ message: 'Date is required.' })
    @IsDateString({}, { message: 'Date must be a valid ISO 8601 date string.' })
    start_date: string;

    @IsNotEmpty({ message: 'Date is required.' })
    @IsDateString({}, { message: 'Date must be a valid ISO 8601 date string.' })
    end_date: string;
}

import { IsMongoId, IsNotEmpty } from 'class-validator';
import { CreateListDto } from './list-create.dto';

export class UpdateListDto extends CreateListDto {
  @IsNotEmpty({ message: 'List ID is required.' })
  @IsMongoId({ message: 'Invalid List ID.' })
  id: string;
}
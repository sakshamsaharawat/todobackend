
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { CreateTagDto } from './tag-create.dto';

export class UpdateTagDto extends CreateTagDto {
  @IsNotEmpty({ message: 'Tag ID is required.' })
  @IsMongoId({ message: 'Invalid Tag ID.' })
  id: string;
}

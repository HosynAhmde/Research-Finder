import { CreateDto } from '@Common/dto';
import { IsString } from 'class-validator';

export class CreateIndex extends CreateDto<CreateIndex> {
  @IsString()
  pmid: string;
}

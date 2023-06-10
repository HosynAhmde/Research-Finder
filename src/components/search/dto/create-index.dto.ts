import { CreateDto } from '@Common/dto';
import { IsArray, IsString } from 'class-validator';

export class CreateIndex extends CreateDto<CreateIndex> {
  @IsString()
  pmid: string;

  @IsString()
  title: string;

  @IsString()
  abstract: string;

  @IsString()
  journal: string;

  @IsArray()
  authors: string[];

  @IsArray()
  keywords: string[];
}

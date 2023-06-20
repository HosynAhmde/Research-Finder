import { CreateDto } from '@Common/dto';
import { IsArray, IsString } from 'class-validator';

export class CreateIndex extends CreateDto<CreateIndex> {
  @IsString()
  pmid: string;

  @IsString()
  title: string;

  @IsString()
  authors: string[];

  @IsString()
  journal_title: string;

  @IsString()
  doi: string;

  @IsString()
  issn: string;

  @IsString()
  abstract: string;

  @IsString()
  keywords: string[];
}

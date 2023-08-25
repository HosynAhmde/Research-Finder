import { CreateDto } from '@Common/dto';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateIndex {
  @IsString()
  pmid: string;

  @IsString()
  title: string;

  @IsArray()
  @IsString({ each: true })
  authors: string[];

  @IsString()
  journal_title: string;

  @IsString()
  doi: string;

  @IsString()
  issn: string;

  @IsString()
  abstract: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keywords: string[];
}

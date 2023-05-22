import { UpdateDto } from '@Common/dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UpdateArticlesDto extends UpdateDto<UpdateArticlesDto> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  pmid: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsArray()
  authors: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsArray()
  affiliations: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  journal_title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  place_of_publication: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  abstract: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  keyword: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  article_identifier: string;
}

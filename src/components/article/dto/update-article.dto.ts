import { UpdateDto } from '@Common/dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { StatusArticle } from '../enum';

export class UpdateArticleDto extends UpdateDto<UpdateArticleDto> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString({ each: true })
  @IsArray()
  authors: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString({ each: true })
  @IsArray()
  affiliations: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  journalTitle: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  placeOfPublication: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  abstract: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString({ each: true })
  @IsArray()
  keywords: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  articleIdentifier: string;

  @ApiProperty()
  @IsEnum(StatusArticle, { each: true  })
  status:StatusArticle

  @ApiProperty()
  @IsString()
  feedback: string
}

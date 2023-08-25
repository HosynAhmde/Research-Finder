import { CreateDto } from '@Common/dto/create-base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateArticleDto extends CreateDto<CreateArticleDto> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  authors: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
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
  @IsArray()
  @IsString({ each: true })
  keywords: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  articleIdentifier: string;
}

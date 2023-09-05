import { CreateDto } from '@Common/dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateIndex {
 
@ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  authors: string[];

  @ApiProperty()
  @IsString()
  journal_title: string;

  @ApiProperty()
  @IsString()
  doi: string;

  @ApiProperty()
  @IsString()
  issn: string;

  @ApiProperty()
  @IsString()
  abstract: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  keywords: string[];
}

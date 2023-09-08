
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { StatusArticle } from "../enum";

export class ArticleEmbeddedDto{
    
  @IsNotEmpty()
  @IsString()
  title: string;

  
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  authors: string[];

 
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  affiliations: string[];

 
  @IsNotEmpty()
  @IsString()
  journalTitle: string;

  
  @IsNotEmpty()
  @IsString()
  placeOfPublication: string;

  
  @IsNotEmpty()
  @IsString()
  abstract: string;

 
 @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keywords: string[];

 
  @IsNotEmpty()
  @IsString()
  articleIdentifier: string;

  @IsEnum(StatusArticle)
  status: StatusArticle;
}
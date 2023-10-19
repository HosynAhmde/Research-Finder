import { CreateDto } from "@Common/dto";
import { ArticleEmbeddedDto } from "@Components/article/dto";
import { Type } from "class-transformer";
import { IsArray, IsString, ValidateNested } from "class-validator";

export class CreateArbitrationDto extends CreateDto<CreateArbitrationDto>{
@IsString()
articleId:string

@IsString({each:true})
@IsArray()
refereeId:string[]

@ValidateNested()
@Type(() => ArticleEmbeddedDto)
article: ArticleEmbeddedDto;

@IsString()
feedback:string

}
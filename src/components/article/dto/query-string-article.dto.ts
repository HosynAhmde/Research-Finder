import { IsOptional } from "class-validator";

export class QueryStringArticle{
@IsOptional()
title:string
@IsOptional()
abstract:string
@IsOptional()
keywords:string

}
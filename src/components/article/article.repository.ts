import { Repository } from '@Common/core';
import { Injectable } from '@nestjs/common';
import { type CreateArticleDto, type UpdateArticleDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { type ArticleDocument, Article } from './schema';
@Injectable()
export class ArticleRepository extends Repository<Article, CreateArticleDto, UpdateArticleDto> {
  constructor(@InjectModel(Article.name) readonly model: Model<ArticleDocument>) {
    super(model);
  }
}

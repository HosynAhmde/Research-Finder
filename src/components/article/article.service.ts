import { Service } from '@Common/core/service.core';
import { Injectable } from '@nestjs/common';
import { Article } from './schema/article.schema';
import { type CreateArticleDto, type UpdateArticleDto } from './dto';
import { ArticleRepository } from './article.repository';

@Injectable()
export class ArticleService extends Service<Article, CreateArticleDto, UpdateArticleDto> {
  constructor(readonly repository: ArticleRepository) {
    super(repository);
  }
}

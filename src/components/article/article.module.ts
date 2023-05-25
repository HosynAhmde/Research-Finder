import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { ArticleRepository } from './article.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from './schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }])],
  providers: [ArticleService, ArticleRepository],
  controllers: [ArticleController],
})
export class ArticleModule {}

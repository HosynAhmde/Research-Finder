import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { ArticleRepository } from './article.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from './schema';
import { SearchModule } from '@Components/search/search.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]), SearchModule],
  providers: [ArticleService, ArticleRepository],
  controllers: [ArticleController],
})
export class ArticleModule {}

import { Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchModule } from './search/search.module';
import { AuthModule } from './auth';

@Module({
  imports: [ArticleModule, SearchModule, AuthModule],
})
export class ComponentsModule {}

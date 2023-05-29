import { Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchModule } from './search/search.module';

@Module({
  imports: [ArticleModule, SearchModule],
})
export class ComponentsModule {}

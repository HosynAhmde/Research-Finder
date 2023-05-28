import { Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [ArticleModule, ElasticsearchModule],
})
export class ComponentsModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './components/article/article.module';
import { SearchModule } from './components/search/search.module';

@Module({
  imports: [ArticleModule, SearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

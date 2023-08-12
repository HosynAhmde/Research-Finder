import { CreateArticleDto } from '@Components/article/dto';
import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Query, UseInterceptors } from '@nestjs/common';
import { PostSearchResult } from './interface';
import { SearchService } from './search.service';
import { Article } from '@Components/article/schema';
import { CreateIndex } from './dto';
import { Filter } from '@Common/decorators';
import { FilterDto } from '@Common/dto';
import { QueryStringParserInterceptor } from '@Common/interceptors';

@Controller('search')
@UseInterceptors(QueryStringParserInterceptor, ClassSerializerInterceptor)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post()
  async createIndex(@Body() article: CreateIndex) {
    return await this.searchService.indexArticle(article);
  }

  @Get()
  async getAllArticles() {
    return await this.searchService.getAllArticles();
  }

  @Get('search')
  async search(@Query('query') query: string) {
    // Removed the unnecessary console.log statement

    return this.searchService.fullTextSearch(query);
  }

  @Get('keyword')
  async searchByKeyword(@Query('title') title: string, @Query('abstract') abstract: string) {
    return await this.searchService.searchByKeyword(title, abstract);
  }
}

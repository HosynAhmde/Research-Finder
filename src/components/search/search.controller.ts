import { CreateArticleDto } from '@Components/article/dto';
import { Body, ClassSerializerInterceptor, Controller, Get, Post, Query, UseInterceptors } from '@nestjs/common';
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
  async search(@Query() query: string) {
    console.log(query);

    return await this.searchService.fullTextSearch(query);
  }

  @Get('keyword')
  async searchByKeyword(@Query('title') title: string, @Query('abstract') abstract: string) {
    return await this.searchService.searchByKeyword(title, abstract);
  }
}

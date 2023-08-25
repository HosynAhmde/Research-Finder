import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SearchService } from './search.service';
import { CreateIndex } from './dto';
import { QueryStringParserInterceptor } from '@Common/interceptors';
import { AuthGuard, PolicyGuard } from '@Common/guards';
import { SetResource } from '@Common/metadata';
import { Resource } from '@Common/enum';

@Controller('search')
@SetResource(Resource.Search)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post()
  // @UseGuards(AuthGuard, PolicyGuard)
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
  async searchByKeyword(
    @Query('title') title: string,
    @Query('abstract') abstract: string,
  ) {
    return await this.searchService.searchByKeyword(title, abstract);
  }
}

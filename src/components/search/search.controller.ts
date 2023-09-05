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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('search')
@ApiTags('search')
@SetResource(Resource.Search)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post()
  @ApiOperation({ summary: 'Create index' })
  @ApiBearerAuth()
  // @UseGuards(AuthGuard, PolicyGuard)
  async createIndex(@Body() article: CreateIndex) {
    return await this.searchService.indexArticle(article);
  }

  @Get()
  @ApiOperation({ summary: 'Get all articles' })
  @ApiBearerAuth()
  async getAllArticles() {
    return await this.searchService.getAllArticles();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search in articles' })
  async search(@Query('query') query: string) {
    return this.searchService.fullTextSearch(query);
  }

  @Get('keyword')
  @ApiOperation({ summary: 'Search by keyword' })
  async searchByKeyword(
    @Query('title') title: string,
    @Query('abstract') abstract: string,
  ) {
    return await this.searchService.searchByKeyword(title, abstract);
  }
}

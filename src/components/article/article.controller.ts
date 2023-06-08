import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateArticleDto } from './dto';
import { ArticleSerializer } from './serialization/article.serializer';
import { ArticleService } from './article.service';
import { type Article, ArticleDocument } from './schema';
import { ArticlesSerializer } from './serialization/articles.serializer';
import { Filter } from '@Common/decorators/filter.decorator';
import { FilterDto } from '@Common/dto/filter.dto';
import { ParseObjectIdPipe } from '@Common/pipes';
import { QueryStringParserInterceptor } from '@Common/interceptors';
import { SearchService } from '@Components/search/search.service';
import { log } from 'console';
import { SetResource } from '@Common/metadata';
import { Action, Resource } from '@Common/enum';
import { SetPolicy } from '@Common/metadata/set-policy.metadata';
@ApiTags('article')
@Controller('article')
@SetResource(Resource.Article)
@UseInterceptors(QueryStringParserInterceptor, ClassSerializerInterceptor)
export class ArticleController {
  constructor(private readonly service: ArticleService, private readonly search: SearchService) {}

  @Post('create')
  @SetPolicy(Action.Create)
  async create(@Body() dto: CreateArticleDto) {
    await this.search.indexPost(dto);
    log('dto', 'ls');
    return ArticleSerializer.build(await this.service.create(dto));
  }

  @Get(':id')
  async findOne(@Param('id', ParseObjectIdPipe) id: string, @Filter() filter: FilterDto<Article>) {
    return ArticleSerializer.build(await this.service.findOne(filter.toObject({ id })));
  }

  @Get()
  async findAll(@Filter() filter: FilterDto<Article>) {
    // return ArticlesSerializer.build({ items: await this.service.find(filter.toObject()) });
    return await this.search.search('fuck');
  }

  @Delete(':id')
  async delete(@Filter() filter: FilterDto<Article>, @Param('id', ParseObjectIdPipe) id: string) {
    return ArticleSerializer.build(await this.service.deleteById(filter.toObject({ id })));
  }
}

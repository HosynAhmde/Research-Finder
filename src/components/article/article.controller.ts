import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateArticleDto, QueryStringArticle, UpdateArticleDto } from './dto';

import { ArticleService } from './article.service';
import { type Article, ArticleDocument } from './schema';

import { Filter } from '@Common/decorators/filter.decorator';
import { FilterDto } from '@Common/dto/filter.dto';
import { ParseObjectIdPipe } from '@Common/pipes';
import {
  AuthorityInterceptor,
  QueryStringParserInterceptor,
  SetDeletedByOwnerInterceptor,
  SetOwnerInterceptor,
} from '@Common/interceptors';
import { SearchService } from '@Components/search/search.service';
import { SetResource } from '@Common/metadata';
import { Action, Resource } from '@Common/enum';
import { SetPolicy } from '@Common/metadata/set-policy.metadata';
import { AuthGuard, PolicyGuard } from '@Common/guards';
import { ArticleSerializer, ArticlesSerializer } from './serializers';
import { Field } from '@Common/decorators';
@Controller('article')
@ApiTags('article')
@ApiBearerAuth()
@SetResource(Resource.Article)
@UseGuards(AuthGuard, PolicyGuard)
@UseInterceptors(QueryStringParserInterceptor, ClassSerializerInterceptor)
export class ArticleController {
  constructor(
    private readonly service: ArticleService,
    private readonly search: SearchService,
  ) {}

  @Post()
  @SetPolicy(Action.Create)
  @UseInterceptors(SetOwnerInterceptor)
  @ApiOperation({
    summary: 'Create article',
  })
  async create(@Body() dto: CreateArticleDto) {
    return ArticleSerializer.build(await this.service.create(dto));
  }

  @Get()
  @SetPolicy(Action.Read)
  @UseInterceptors(AuthorityInterceptor)
  @ApiOperation({
    summary: 'Get all articles',
  })
  @ApiQuery({
    name: 'title', required: false ,
  })
  async findAll(@Filter() filter: FilterDto<Article>,@Query() query:QueryStringArticle) {
    return ArticlesSerializer.build(await this.service.find(filter.toObject({...query})));
  }

  @Get(':id')
  @SetPolicy(Action.Read)
  @UseInterceptors(AuthorityInterceptor)
  @ApiOperation({
    summary: 'Get article',
  })
  async findOne(
    @Param('id', ParseObjectIdPipe) id: string,
    @Filter() filter: FilterDto<Article>,
  ) {
    return ArticleSerializer.build(
      await this.service.findOne(filter.toObject({ id })),
    );
  }

  @Put(':id')
  @SetPolicy(Action.Update)
  @UseInterceptors(AuthorityInterceptor)
  @ApiOperation({
    summary: 'Update article',
  })
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Filter() filter: FilterDto<Article>,
    @Field() dto: UpdateArticleDto,
  ) {
    return ArticleSerializer.build(
      await this.service.updateOne(filter.toObject({ id }), dto),
    );
  }

  @Delete(':id')
  @SetPolicy(Action.Read)
  @UseInterceptors(AuthorityInterceptor, SetDeletedByOwnerInterceptor)
  @ApiOperation({
    summary: 'Delete article',
  })
  async delete(
    @Filter() filter: FilterDto<Article>,
    @Param('id', ParseObjectIdPipe) id: string,
  ) {
    return ArticleSerializer.build(
      await this.service.deleteById(filter.toObject({ id })),
    );
  }
}

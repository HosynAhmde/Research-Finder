import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateArticleDto, UpdateArticleDto } from './dto';
import { ArticleSerializer } from './serialization/article.serializer';
import { ArticleService } from './article.service';
import { type Article, ArticleDocument } from './schema';
import { ArticlesSerializer } from './serialization/articles.serializer';
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
@ApiTags('article')
@Controller('article')
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
  async create(@Body() dto: CreateArticleDto) {
    return ArticleSerializer.build(await this.service.create(dto));
  }

  @Get()
  @SetPolicy(Action.Read)
  @UseInterceptors(AuthorityInterceptor)
  async findAll(@Filter() filter: FilterDto<Article>) {
    return ArticlesSerializer.build(await this.service.find(filter.toObject()));
  }

  @Get(':id')
  @SetPolicy(Action.Read)
  @UseInterceptors(AuthorityInterceptor)
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
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Filter() filter: FilterDto<Article>,
    @Body() dto: UpdateArticleDto,
  ) {
    return ArticleSerializer.build(
      await this.service.updateOne(filter.toObject({ id }), dto),
    );
  }

  @Delete(':id')
  @SetPolicy(Action.Read)
  @UseInterceptors(AuthorityInterceptor, SetDeletedByOwnerInterceptor)
  async delete(
    @Filter() filter: FilterDto<Article>,
    @Param('id', ParseObjectIdPipe) id: string,
  ) {
    return ArticleSerializer.build(
      await this.service.deleteById(filter.toObject({ id })),
    );
  }
}

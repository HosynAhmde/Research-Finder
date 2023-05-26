import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
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
@ApiTags('article')
@Controller('article')
@UseInterceptors(ClassSerializerInterceptor)
export class ArticleController {
  constructor(private readonly service: ArticleService) {}

  @Post()
  async create(@Body() dto: CreateArticleDto) {
    return ArticleSerializer.build(await this.service.create(dto));
  }

  @Get(':id')
  async findOne(@Param('id', ParseObjectIdPipe) id: string, @Filter() filter: FilterDto<Article>) {
    return ArticleSerializer.build(await this.service.findOne(filter.toObject({ id })));
  }

  @Get()
  async findAll(@Filter() filter: FilterDto<Article>) {
    return ArticlesSerializer.build({ items: await this.service.find(filter.toObject()) });
  }

  @Delete(':id')
  async delete(@Filter() filter: FilterDto<Article>, @Param('id', ParseObjectIdPipe) id: string) {
    return ArticleSerializer.build(await this.service.deleteById(filter.toObject({ id })));
  }
}

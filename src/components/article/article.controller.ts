import { Body, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateArticleDto } from './dto';
import { ArticleSerializer } from './serialization/article.serializer';
import { ArticleService } from './article.service';
@ApiTags('article')
@Controller('article')
export class ArticleController {
  constructor(private readonly service: ArticleService) {}
  async create(@Body() dto: CreateArticleDto) {
    return ArticleSerializer.build(await this.service.create(dto));
  }
}

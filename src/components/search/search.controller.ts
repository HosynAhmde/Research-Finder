import { CreateArticleDto } from '@Components/article/dto';
import { Controller } from '@nestjs/common';
import { PostSearchResult } from './interface';
import { SearchService } from './search.service';
import { Article } from '@Components/article/schema';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}
  async createIndex(article: Article): Promise<any> {}
}

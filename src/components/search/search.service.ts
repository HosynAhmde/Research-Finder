import { Article } from '@Components/article/schema';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { PostSearchBody, PostSearchResult } from './interface';
import { Model } from 'mongoose';

@Injectable()
export class SearchService {
  constructor(private readonly elasticSearch: ElasticsearchService) {}

  async createIndex(article: any) {
    return await this.elasticSearch.index<PostSearchResult>({
      index: 'article',
      body: article,
    });
  }
}

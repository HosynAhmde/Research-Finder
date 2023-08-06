import { Injectable, Query } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { PostSearchResult } from './interface';
import { ConfigService } from '@nestjs/config';
import { CreateIndex } from './dto';
import { Article } from '@Components/article/schema';
import { match } from 'assert';
import { log } from 'console';

@Injectable()
export class SearchService {
  constructor(private readonly elasticSearch: ElasticsearchService, private readonly configService: ConfigService) {}

  // async createIndex() {
  //   const index = this.configService.get('ELASTICSEARCH_INDEX');
  //   const chekIndex = await this.elasticSearch.indices.exists({ index });
  //   if (!chekIndex) {
  //     this.elasticSearch.indices.create({
  //       index,
  //       body: {
  //         mappings: {
  //           properties: {
  //             pmid: { type: 'text' },
  //             title: { type: 'text' },
  //             authors: { type: 'text' },
  //             affiliations: { type: 'text' },
  //             journal_title: { type: 'text' },
  //             place_of_publication: { type: 'text' },
  //             abstract: { type: 'text' },
  //             keyword: { type: 'text', fields: { keyword: { type: 'keyword' } } },
  //             article_identifier: { type: 'text' },
  //           },
  //         },
  //         settings: {
  //           analysis: {
  //             filter: {
  //               autocomplete_filter: {
  //                 type: 'edge_ngram',
  //                 min_gram: 1,
  //                 max_gram: 20,
  //               },
  //             },
  //             analyzer: {
  //               autocomplete: {
  //                 type: 'custom',
  //                 tokenizer: 'standard',
  //                 filter: ['lowercase', 'autocomplete_filter'],
  //               },
  //             },
  //           },
  //         },
  //       },
  //     });
  //   }
  // }

  async indexArticle(article: CreateIndex) {
    return await this.elasticSearch.index({
      index: this.configService.get('ELASTICSEARCH_INDEX'),
      body: article,
    });
  }

  async fullTextSearch(query: any) {
    log(query);
    const body = await this.elasticSearch.search<any>({
      index: this.configService.get('ELASTICSEARCH_INDEX'),
      body: {
        query: {
          match: {
            title: query,
          },
        },
      },
    });
    const hits = body.hits.hits;
    return hits.map(item => item._source);
  }

  async searchByKeyword(@Query('title') title: string, @Query('abstract') abstract: string) {
    console.log(title, abstract);

    const body = await this.elasticSearch.search<any>({
      index: this.configService.get('ELASTICSEARCH_INDEX'),

      query: {
        bool: {
          must: [
            {
              match: {
                title: title,
              },
            },
            {
              match: {
                abstract: abstract,
              },
            },
          ],
        },
      },

      // query: {
      //   multi_match: {
      //     query: title,
      //     fields: ['title', 'abstract'],
      //   },
      // },
    });
    const hits = body.hits.hits;
    // const filteredHits = hits.map(item => {
    //   const { pmid, ...source } = item._source;
    //   return source;
    // });
    // return filteredHits;
    const source = hits.map(item => {
      item._source;
    });
    return source;
  }
}

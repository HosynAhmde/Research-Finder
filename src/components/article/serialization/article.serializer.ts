import { Serializer } from '@Common/serializers/base.serializer';
import { Exclude, Expose } from '@nestjs/class-transformer';
import { type ArticleDocument } from '../schema';

@Exclude()
export class ArticleSerializer extends Serializer<ArticleSerializer> {
  @Expose()
  pmid: string;

  @Expose()
  title: string;

  @Expose()
  authors: string[];

  @Expose()
  affiliations: string[];

  @Expose()
  journal_title: string;

  @Expose()
  place_of_publication: string;

  @Expose()
  abstract: string;

  @Expose()
  keyword: string[];

  @Expose()
  article_identifier: string;

  static build(data: ArticleDocument): ArticleSerializer {
    return new ArticleSerializer(data);
  }
}

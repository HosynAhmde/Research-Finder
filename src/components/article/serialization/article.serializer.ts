import { Serializer } from '@Common/serializers/base.serializer';
import { Exclude, Expose } from '@nestjs/class-transformer';
import { type ArticleDocument } from '../schema';

@Exclude()
export class ArticleSerializer extends Serializer<ArticleSerializer> {
  @Expose({ name: 'id' })
  _id: string;

  @Expose()
  title: string;

  @Expose()
  authors: string[];

  @Expose()
  affiliations: string[];

  @Expose()
  journalTitle: string;

  @Expose()
  placeOfPublication: string;

  @Expose()
  abstract: string;

  @Expose()
  keywords: string[];

  @Expose()
  articleIdentifier: string;

  static build(data: ArticleDocument): ArticleSerializer {
    return new ArticleSerializer(data);
  }
}

import { Exclude, Expose, Type } from '@nestjs/class-transformer';
import { type ArticleDocument } from '../schema';
import { ArticleSerializer } from './article.serializer';
import { ItemsWithMetadata, Metadata } from '@Common/interfaces';

@Exclude()
export class ArticlesSerializer {
  @Expose()
  @Type(() => ArticleSerializer)
  items: ArticleSerializer[];

  @Expose()
  metadata: Metadata;
  static build({
    items,
    metadata,
  }: ItemsWithMetadata<ArticleDocument>): ArticlesSerializer {
    return new ArticlesSerializer({
      items: items.map(item => ArticleSerializer.build(item)),
      metadata,
    });
  }

  constructor(data?: ArticlesSerializer) {
    if (data) Object.assign(this, data);
  }
}

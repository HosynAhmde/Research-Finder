import { Exclude, Expose, Type } from '@nestjs/class-transformer';
import { type ArticleDocument } from '../schema';
import { ArticleSerializer } from './article.serializer';

@Exclude()
export class ArticlesSerializer {
  @Expose()
  @Type(() => ArticleSerializer)
  items: ArticleSerializer[];

  static build({ items }: { items: ArticleDocument[] }): ArticlesSerializer {
    return new ArticlesSerializer({ items: items.map(item => ArticleSerializer.build(item)) });
  }

  constructor(data?: ArticlesSerializer) {
    if (data) Object.assign(this, data);
  }
}

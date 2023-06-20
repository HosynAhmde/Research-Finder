import { Serializer } from '@Common/serializers';
import { Exclude, Expose } from '@nestjs/class-transformer';

@Exclude()
export class SearchSerializer extends Serializer<SearchSerializer> {
  @Expose()
  pmid: string;

  @Expose()
  title: string;

  @Expose()
  authors: string[];

  @Expose()
  journal_title: string;

  @Expose()
  doi: string;

  @Expose()
  issn: string;

  @Expose()
  abstract: string;

  @Expose()
  keywords: string[];
}

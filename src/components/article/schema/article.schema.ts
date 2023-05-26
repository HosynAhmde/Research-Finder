import { Model } from '@Common/schemas';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { type Document } from 'mongoose';

@Schema({ timestamps: true })
export class Article extends Model<Article> {
  @Prop({ required: true })
  pmid: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  authors: string[];

  @Prop({ required: true })
  affiliations: string[];

  @Prop({ required: true })
  journal_title: string;

  @Prop({ required: true })
  place_of_publication: string;

  @Prop({ required: true })
  abstract: string;

  @Prop({ required: true })
  keyword: string[];

  @Prop({ required: true })
  article_identifier: string;
}
export type ArticleDocument = Article & Document;
export const ArticleSchema = SchemaFactory.createForClass(Article);

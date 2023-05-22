import { Schema } from '@Common/schemas';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { type Document } from 'mongoose';
export class Article extends Schema<Article> {
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

import { Model } from '@Common/schemas';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { type Document } from 'mongoose';

@Schema({ timestamps: true })
export class Article extends Model<Article> {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  authors: string[];

  @Prop()
  pmid: string;

  @Prop()
  affiliations: string[];

  @Prop()
  journal_title: string;

  @Prop()
  place_of_publication: string;

  @Prop({ required: true })
  abstract: string;

  @Prop()
  keywords: string[];

  @Prop()
  doi: string;

  @Prop()
  issn: string;

  @Prop()
  article_identifier: string;
}
export type ArticleDocument = Article & Document;
export const ArticleSchema = SchemaFactory.createForClass(Article);

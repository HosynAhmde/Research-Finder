import { Model } from '@Common/schemas';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { type Document } from 'mongoose';

@Schema()
export class Article extends Model<Article> {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: [String] })
  authors: string[];

  @Prop()
  affiliations: string[];

  @Prop()
  journalTitle: string;

  @Prop()
  placeOfPublication: string;

  @Prop({ required: true })
  abstract: string;

  @Prop()
  keywords: string[];

  @Prop()
  doi: string;

  @Prop()
  issn: string;

  @Prop()
  articleIdentifier: string;
}
export type ArticleDocument = Article & Document;
export const ArticleSchema = SchemaFactory.createForClass(Article);

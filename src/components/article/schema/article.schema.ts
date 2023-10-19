import { Model } from '@Common/schemas';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { type Document } from 'mongoose';
import { StatusArticle } from '../enum';

@Schema()
export class Article extends Model<Article> {
  @Prop({ required: true, type: String ,index:true})
  title: string;

  @Prop({ required: true, type: [String] })
  authors: string[];

  @Prop()
  affiliations: string[];

  @Prop()
  journalTitle: string;

  @Prop()
  placeOfPublication: string;

  @Prop({ required: true,index:true })
  abstract: string;

  @Prop({index:true})
  keywords: string[];

  @Prop()
  doi: string;

  @Prop()
  issn: string;

  @Prop()
  articleIdentifier: string;

  @Prop()
  feedback: string;

  @Prop({type: String, enum: StatusArticle,default: StatusArticle.Pending,index:true})
  status: StatusArticle;
}
export type ArticleDocument = Article & Document;
export const ArticleSchema = SchemaFactory.createForClass(Article);

import { Prop } from "@nestjs/mongoose";
import { StatusArticle } from "../enum";

export class ArticleEmbedded{
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

  @Prop()
  feedback: string;

  @Prop({type: String, enum: StatusArticle})
  status: StatusArticle;

}
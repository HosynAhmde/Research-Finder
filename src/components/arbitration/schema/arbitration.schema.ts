import { Model } from "@Common/schemas";
import { ArticleEmbedded } from "@Components/article/schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import  { Document } from "mongoose";
@Schema()
export class Arbitration extends Model<Arbitration> {
    @Prop()
    articleId: string;

    @Prop()
    refereeId: string[];

    @Prop({ type:ArticleEmbedded,_id:false})
    article: ArticleEmbedded

    @Prop()
    feedback: string;

}
export type ArbitrationDocument = Arbitration & Document;
export const ArbitrationSchema = SchemaFactory.createForClass(Arbitration); 
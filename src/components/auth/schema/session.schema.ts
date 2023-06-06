import { Model } from '@Common/schemas';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { type Document } from 'mongoose';

export class Session extends Model<Session> {
  @Prop({ required: false })
  agent?: string;
}
export type SessionDocument = Session & Document;
export const SessionSchema = SchemaFactory.createForClass(Session);

import { Role } from '@Common/enum/roles.enum';
import { Model } from '@Common/schemas';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { type Document } from 'mongoose';
export class User extends Model<User> {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, type: [String], default: [Role.GUEST] })
  roles: [Role];

  @Prop({ required: true })
  password: string;
}
export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

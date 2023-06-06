import { Role } from '@Common/enum/roles.enum';
import { Model } from '@Common/schemas';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { type Document } from 'mongoose';
export class User extends Model<User> {
  @Prop()
  name: string;

  @Prop()
  last_name: string;

  @Prop()
  email: string;

  @Prop({ type: [String], default: [Role.USER] })
  roles: [Role];

  @Prop()
  password: string;
}
export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

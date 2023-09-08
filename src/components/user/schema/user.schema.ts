import { Role } from '@Common/enum/roles.enum';
import { Model } from '@Common/schemas';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { type Document } from 'mongoose';
@Schema()
export class User extends Model<User> {
  @Prop()
  name: string;

  @Prop()
  lasName: string;

  @Prop()
  email: string;

  @Prop({ type: [String], enum: Role,default: [Role.User] })
  roles: [Role];

  @Prop()
  password: string;
}
export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

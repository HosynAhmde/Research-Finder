import { Serializer } from '@Common/serializers';
import { Exclude, Expose } from 'class-transformer';
import { type UserDocument } from '../schema';

@Exclude()
export class UserSerializer extends Serializer<UserSerializer> {
  @Expose()
  name: string;

  @Expose()
  last_name: string;

  @Expose()
  email: string;

  static build(data: UserDocument): UserSerializer {
    return new UserSerializer(data);
  }
}

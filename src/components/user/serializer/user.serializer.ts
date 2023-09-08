import { Serializer } from '@Common/serializers';
import { Exclude, Expose } from 'class-transformer';
import { type UserDocument } from '../schema';
import { Role } from '@Common/enum';

@Exclude()
export class UserSerializer extends Serializer<UserSerializer> {
  @Expose()
  name: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  roles: Role[];

  static build(data: UserDocument): UserSerializer {
    return new UserSerializer(data);
  }
}

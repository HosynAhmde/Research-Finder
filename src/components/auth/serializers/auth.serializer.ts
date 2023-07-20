import { toPlain } from '@Common/utils';
import { UserDocument } from '@Components/user/schema';
import { UserSerializer } from '@Components/user/serializer/inedx';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class AuthSerializer {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;

  @Expose()
  @Type(() => UserSerializer)
  user: UserSerializer;

  static build(data: { user: UserDocument; accessToken: string; refreshToken: string }): AuthSerializer {
    return new AuthSerializer(data);
  }

  constructor(data: any) {
    Object.assign(this, toPlain(data));
  }
}

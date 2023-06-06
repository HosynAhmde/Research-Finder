import { ConvertModel } from '@Common/utils';
import { UserDocument } from '@Components/user/schema';
import { UserSerializer } from '@Components/user/serializer/inedx';

import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class AuthSerializer {
  @Expose()
  access_token: string;

  @Expose()
  refresh_token: string;

  @Expose()
  @Type(() => UserSerializer)
  user: UserSerializer;

  static build(data: { user: UserDocument; access_token: string; refresh_token: string }): AuthSerializer {
    return new AuthSerializer(data);
  }

  constructor(data: any) {
    Object.assign(this, ConvertModel(data));
  }
}

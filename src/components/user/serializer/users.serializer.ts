import { Type } from '@nestjs/class-transformer';
import { Exclude, Expose } from 'class-transformer';
import { UserSerializer } from './user.serializer';
import { type UserDocument } from '../schema';

@Exclude()
export class UsersSerializer {
  @Expose()
  @Type(() => UserSerializer)
  items: UserSerializer[];

  static build({ items }: { items: UserDocument[] }): UsersSerializer {
    return new UsersSerializer({ items: items.map(item => UserSerializer.build(item)) });
  }
  constructor(data?: UsersSerializer) {
    if (data) Object.assign(this, data);
  }
}

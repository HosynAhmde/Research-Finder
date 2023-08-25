import { toPlain } from '@Common/utils';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class Serializer<T> {
  @Expose({ name: 'id' })
  _id: string;

  @Expose()
  createdAt: Date;

  @Expose()
  createdBy: string;

  @Expose()
  updatedAt?: Date;

  @Expose()
  updatedBy?: string;

  @Expose()
  deletedAt?: Date;

  @Expose()
  deletedBy?: string;

  constructor(data?: Partial<T>) {
    if (data) Object.assign(this, toPlain(data));
  }
}

import { toPlain } from '@Common/utils';
import { Exclude, Expose } from '@nestjs/class-transformer';

@Exclude()
export class Serializer<T> {
  @Expose()
  id: string;

  @Expose()
  created_at: Date;

  @Expose()
  created_by: string;

  @Expose()
  updated_at?: Date;

  @Expose()
  updated_by?: string;

  @Expose()
  deleted_at?: Date;

  @Expose()
  deleted_by?: string;

  constructor(data?: Partial<T>) {
    if (data) Object.assign(this, toPlain(data));
  }
}

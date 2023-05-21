import { Prop } from '@nestjs/mongoose';

export class Schema<T> {
  @Prop({ required: true })
  created_by?: string;

  @Prop({ required: true, default: () => new Date() })
  created_at: Date;

  @Prop({ required: false })
  deleted_by?: string;

  @Prop({ required: false, default: () => new Date() })
  deleted_at?: Date;

  @Prop({ required: false })
  update_by?: string;

  @Prop({ required: false, default: () => new Date() })
  update_at?: Date;

  constructor(data?: Partial<T>) {
    if (data) Object.assign(this, data);
  }
}

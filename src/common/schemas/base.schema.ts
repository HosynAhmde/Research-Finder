import { Prop } from '@nestjs/mongoose';

export class Model<T> {
  @Prop()
  created_by?: string;

  @Prop({ default: () => new Date() })
  created_at: Date;

  @Prop({ required: false })
  deleted_by?: string;

  @Prop({ required: false })
  deleted_at?: Date;

  @Prop({ required: false })
  update_by?: string;

  @Prop({ required: false })
  update_at?: Date;

  constructor(data?: Partial<T>) {
    if (data) Object.assign(this, data);
  }
}

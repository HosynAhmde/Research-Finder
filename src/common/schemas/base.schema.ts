import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Model<T> {
  @Prop()
  createdBy?: string;

  @Prop({ default: () => new Date() })
  createdAt: Date;

  @Prop({ required: false })
  deletedBy?: string;

  @Prop({ required: false })
  deletedAt?: Date;

  @Prop({ required: false })
  updateBy?: string;

  @Prop({ required: false })
  updateAt?: Date;

  constructor(data?: Partial<T>) {
    if (data) Object.assign(this, data);
  }
}

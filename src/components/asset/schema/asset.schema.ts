import type { Document } from 'mongoose';

import { ACL, Bucket, FieldName } from '../enums';
import { Model } from '@Common/schemas';
import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class Asset extends Model<Asset> {
  @Prop()
  fieldname?: FieldName;

  @Prop()
  originalname: string;

  @Prop()
  encoding?: string;

  @Prop()
  mimetype: string;

  @Prop()
  size: number;

  @Prop()
  bucket: Bucket;

  @Prop()
  key: string;

  @Prop()
  acl: ACL;

  @Prop()
  contentType?: string;

  @Prop()
  storageClass?: string;

  @Prop()
  location: string;

  @Prop()
  etag?: string;
}

export type AssetDocument = Asset & Document;
export const AssetSchema = SchemaFactory.createForClass(Asset);

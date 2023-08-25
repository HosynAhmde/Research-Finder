import { Serializer } from '@Common/serializers';
import { Exclude, Expose } from 'class-transformer';

import { FieldName } from '../enums';
import type { AssetDocument } from '../schema';

@Exclude()
export class AssetSerializer extends Serializer<AssetSerializer> {
  @Expose()
  fieldname?: FieldName;

  @Expose()
  originalname: string;

  @Expose()
  encoding?: string;

  @Expose()
  mimetype: string;

  @Expose()
  size: number;

  @Expose()
  bucket: string;

  @Expose()
  key: string;

  @Expose()
  contentType?: string;

  @Expose()
  location: string;

  static build(data: AssetDocument): AssetSerializer {
    return new AssetSerializer(data);
  }
}

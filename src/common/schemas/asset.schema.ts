import { FieldName } from '@Components/asset/enums';
import { Prop } from '@nestjs/mongoose';

export class Asset {
  @Prop()
  asset_id: string;

  @Prop()
  location: string;

  @Prop()
  key: string;

  @Prop()
  fieldname: FieldName;
}

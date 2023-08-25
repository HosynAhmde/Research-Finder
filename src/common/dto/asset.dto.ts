import { FieldName } from '@Components/asset/enums';
import { IsEnum, IsString } from 'class-validator';

export class AssetDto {
  @IsString()
  asset_id: string;

  @IsString()
  location: string;

  @IsString()
  key: string;

  @IsEnum(FieldName)
  fieldname: FieldName;
}

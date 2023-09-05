import { FieldName } from '@Components/asset/enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export class AssetDto {
  @ApiProperty()
  @IsString()
  asset_id: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsString()
  key: string;

  @ApiProperty()
  @IsEnum(FieldName)
  fieldname: FieldName;
}

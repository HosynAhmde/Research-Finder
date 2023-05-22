import { Exclude } from '@nestjs/class-transformer';
import { IsDateString, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateDto<T> {
  @Exclude()
  _id: Types.ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  created_by: string;

  @IsNotEmpty()
  @IsDateString()
  created_at: Date;

  @IsOptional()
  @IsDateString()
  updated_at?: Date;

  @IsMongoId()
  @IsOptional()
  updated_by?: string;

  @IsOptional()
  @IsDateString()
  deleted_at?: Date;

  @IsMongoId()
  @IsOptional()
  deleted_by?: string;

  constructor(data: Partial<T>) {
    if (data) Object.assign(this, data);
  }
}

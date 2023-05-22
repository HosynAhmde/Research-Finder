import { Exclude } from '@nestjs/class-transformer';
import { IsDateString, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateDto<T> {
  @Exclude()
  _id?: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  @IsNotEmpty()
  created_by?: string;

  @IsOptional()
  @IsOptional()
  @IsDateString()
  created_at?: Date;

  @IsOptional()
  @IsDateString()
  updated_at?: Date;

  @IsMongoId()
  @IsNotEmpty()
  @IsOptional()
  updated_by?: string;

  @IsOptional()
  @IsDateString()
  deleted_at?: Date;

  @IsMongoId()
  @IsNotEmpty()
  @IsOptional()
  deleted_by?: string;
  constructor(data: Partial<T>) {
    if (data) Object.assign(this, data);
  }
}

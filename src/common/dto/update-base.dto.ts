import { Exclude } from 'class-transformer';
import { IsDateString, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateDto<T> {
  @Exclude()
  _id?: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  @IsNotEmpty()
  createdBy: string;

  @IsOptional()
  @IsOptional()
  @IsDateString()
  createdAt: Date;

  @IsOptional()
  @IsDateString()
  updatedAt?: Date;

  @IsMongoId()
  @IsNotEmpty()
  @IsOptional()
  updatedBy?: string;

  @IsOptional()
  @IsDateString()
  deletedAt?: Date;

  @IsMongoId()
  @IsNotEmpty()
  @IsOptional()
  deletedBy?: string;

  constructor(data?: Partial<T>) {
    if (data) Object.assign(this, data);
  }
}

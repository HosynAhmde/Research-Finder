import { type Filter, Projection, type Query } from '@Common/interfaces';
import { toPlain } from '@Common/utils/tool.util';
import { Transform, Type } from '@nestjs/class-transformer';

import { IsNumber, IsObject, IsOptional, IsString, Min, ValidateNested } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @Min(1) // negative number not allowed to pass into limit
  @Transform(({ value }) => Math.min(Math.floor(value ?? 10), 50))
  limit: number;

  @IsNumber()
  @Min(0) // negative number not allowed to pass into skip
  @Transform(({ value }) => Math.floor(value ?? 0))
  skip: number;

  @IsOptional()
  @Transform(({ value }) => value ?? { created_at: -1 })
  sort: Record<string, number>;
}

export class FilterDto<T = any> {
  @IsObject()
  @ValidateNested()
  @Type(() => PaginationDto)
  @IsOptional()
  pagination: PaginationDto;

  @IsOptional()
  @IsString()
  projection: Projection<T>;

  @IsOptional()
  @IsObject()
  query: Query<T>;

  toObject(query?: Query<T>): Filter<T> {
    return { ...toPlain(this), query: { ...this.query, ...query } };
  }
}

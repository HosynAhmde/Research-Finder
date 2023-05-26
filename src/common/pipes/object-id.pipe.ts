import { type PipeTransform } from '@nestjs/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { type Types } from 'mongoose';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, Types.ObjectId> {
  transform(value: any): Types.ObjectId {
    const isValidId = isValidObjectId(value);

    if (!isValidId) {
      throw new BadRequestException('OBJECT_ID.INVALID_OBJECT_ID');
    }

    return value;
  }
}

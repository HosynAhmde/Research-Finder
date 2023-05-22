import { Types } from 'mongoose';
import { pruneUndefinedOrEmpty } from '@fullstacksjs/toolbox';
export const MongoId = (id?: string): Types.ObjectId => new Types.ObjectId(id);
export const sanitizeQuery = (obj: any) => {
  const { id, ...rest } = obj;

  const _id = id ? MongoId(id) : undefined;
  return pruneUndefinedOrEmpty({
    _id,
    ...rest,
  });
};

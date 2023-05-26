import { Filter } from '@Common/interfaces';
import { type Request } from 'express';

export interface AppRequest extends Request {
  filter?: Filter;

  __class?: string;
  __function?: string;
}

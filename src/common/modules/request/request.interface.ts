import { Filter } from '@Common/interfaces';
import { JwtToken } from '@Components/auth/interface';
import { UserDocument } from '@Components/user/schema';
import { type Request } from 'express';

export interface AppRequest extends Request {
  token?: JwtToken;
  refreshToken?: JwtToken;
  user?: UserDocument;

  filter?: Filter;

  __class?: string;
  __function?: string;

  // userAgent: IResult;

  // permission?: Permission<Role>;

  files: File[];

  id?: string;
}

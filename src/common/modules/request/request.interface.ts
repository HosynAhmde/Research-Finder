import type { Role } from '@Common/enum';
import type { Filter } from '@Common/interfaces';
import type { Model } from '@Common/schemas';
import type { JwtToken } from '@Components/auth/interface';
import type { UserDocument } from '@Components/user/schema';
import type { Permission } from 'abacl';
import type { Request } from 'express';

export interface File extends Express.Multer.File, Model<File> {}

export interface AppRequest extends Request {
  token?: JwtToken;
  refreshToken?: JwtToken;
  user?: UserDocument;

  filter: Filter;

  permission?: Permission<Role>;

  files: File[];

  id?: string;
}

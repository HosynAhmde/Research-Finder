import { type Role } from '@Common/enum';

export interface JwtToken {
  session: string;
  sub: string;
  roles: Role[];

  iat?: number;
  exp?: number;
}

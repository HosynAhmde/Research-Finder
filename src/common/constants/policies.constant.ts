import { Role } from '@Common/enum';
import { Policy } from 'abacl';

export const policies: Policy<Role>[] = [
  {
    subject: Role.Admin,
    action: 'any',
    object: 'any',
  },
  {
    subject: Role.User,
    action: 'create:own',
    object: 'user',
  },
  {
    subject: Role.User,
    action: 'create:own',
    object: 'article',
  },
  {
    subject: Role.User,
    action: 'read:own',
    object: 'article',
  },
  {
    subject: Role.User,
    action: 'update:own',
    object: 'article',
  },
  {
    subject: Role.User,
    action: 'delete:own',
    object: 'article',
  },
];

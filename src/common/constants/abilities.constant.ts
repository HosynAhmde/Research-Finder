import { Role } from '@Common/enum';
import { Ability } from 'abacl';

export const abilities: Ability<Role>[] = [
  {
    subject: Role.Admin,
    action: 'any',
    object: 'all',
  },
  {
    subject: Role.User,
    action: 'create:own',
    object: 'user',
  },
  {
    subject: Role.User,
    action: 'read:own',
    object: 'user',
  },
  {
    subject: Role.User,
    action: 'update:own',
    object: 'user',
    field: [
      '*',
      '!roles',
      '!createdAt',
      '!createdBy',
      '!updatedAt',
      '!updatedBy',
      '!deletedAt',
      '!deletedBy',
    ],
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
    field: [
      '*',
      '!feedback',
      '!status',
      '!createdAt',
      '!createdBy',
      '!updatedAt',
      '!updatedBy',
      '!deletedAt',
      '!deletedBy',
    ],
  },
  {
    subject: Role.User,
    action: 'delete:own',
    object: 'article',
  },
  {
    subject: Role.User,
    action: 'create:own',
    object: 'arbitration',
  },
  
];

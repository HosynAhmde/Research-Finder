import { CHECK_POLICY_KEY } from '@Common/constants';
import { Action } from '@Common/enum';
import { SetMetadata } from '@nestjs/common';

export const SetPolicy = (action: Action) =>
  SetMetadata(CHECK_POLICY_KEY, action);

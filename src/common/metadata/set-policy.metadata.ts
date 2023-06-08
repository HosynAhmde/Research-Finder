import { CHEK_POLICY_KEY } from '@Common/constants';
import { Action } from '@Common/enum';
import { SetMetadata } from '@nestjs/common';

export const SetPolicy = (action: Action) => SetMetadata(CHEK_POLICY_KEY, action);

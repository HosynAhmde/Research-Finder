import { RESOURCE_KEY } from '@Common/constants';
import { Resource } from '@Common/enum';
import { SetMetadata } from '@nestjs/common';

export const SetResource = (resource: Resource) => SetMetadata(RESOURCE_KEY, resource);

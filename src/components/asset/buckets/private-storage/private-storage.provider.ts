import { STORAGES_CONFIG } from '@Common/configs';
import { PRIVATE_STORAGE_KEY } from '@Components/asset/constants';
import type { Provider } from '@nestjs/common';

const { PRIVATE_BUCKET } = STORAGES_CONFIG();

export const PrivateStorageProvider: Provider = {
  provide: PRIVATE_STORAGE_KEY,
  useValue: PRIVATE_BUCKET.s3,
};

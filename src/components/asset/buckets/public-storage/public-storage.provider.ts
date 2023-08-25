import { STORAGES_CONFIG } from '@Common/configs';
import { PUBLIC_STORAGE_KEY } from '@Components/asset/constants';
import type { Provider } from '@nestjs/common';

const { PUBLIC_BUCKET } = STORAGES_CONFIG();

export const PublicStorageProvider: Provider = {
  provide: PUBLIC_STORAGE_KEY,
  useValue: PUBLIC_BUCKET.s3,
};

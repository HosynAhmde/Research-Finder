import { STORAGES_CONFIG } from '@Common/configs';
import { AssetRepository } from '@Components/asset/asset.repository';
import { Asset, AssetSchema } from '@Components/asset/schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import multerS3 from 'multer-s3';

import { PrivateStorageController } from './private-storage.controller';
import { PrivateStorageProvider } from './private-storage.provider';
import { PrivateStorageService } from './private-storage.service';

const { PRIVATE_BUCKET } = STORAGES_CONFIG();

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Asset.name, schema: AssetSchema }]),
    MulterModule.register({ storage: multerS3(PRIVATE_BUCKET) }),
  ],
  controllers: [PrivateStorageController],
  providers: [PrivateStorageService, PrivateStorageProvider, AssetRepository],
  exports: [PrivateStorageService],
})
export class PrivateStorageModule {}

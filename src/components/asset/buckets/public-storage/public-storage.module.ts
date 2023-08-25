import { STORAGES_CONFIG } from '@Common/configs';
import { AssetRepository } from '@Components/asset/asset.repository';
import { Asset, AssetSchema } from '@Components/asset/schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import multerS3 from 'multer-s3';

import { PublicStorageController } from './public-storage.controller';
import { PublicStorageProvider } from './public-storage.provider';
import { PublicStorageService } from './public-storage.service';

const { PUBLIC_BUCKET } = STORAGES_CONFIG();

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Asset.name, schema: AssetSchema }]),
    MulterModule.register({ storage: multerS3(PUBLIC_BUCKET) }),
  ],
  controllers: [PublicStorageController],
  providers: [PublicStorageService, PublicStorageProvider, AssetRepository],
  exports: [PublicStorageService],
})
export class PublicStorageModule {}

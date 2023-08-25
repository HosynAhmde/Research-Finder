import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AssetController } from './asset.controller';
import { AssetRepository } from './asset.repository';
import { AssetService } from './asset.service';
import { PrivateStorageModule, PublicStorageModule } from './buckets';
import { Asset, AssetSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Asset.name, schema: AssetSchema }]),
    PrivateStorageModule,
    PublicStorageModule,
  ],
  controllers: [AssetController],
  providers: [AssetService, AssetRepository],
  exports: [AssetService],
})
export class AssetModule {}

import { Repository } from '@Common/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import type { AssetDocument } from './schema';
import { Asset } from './schema';

@Injectable()
export class AssetRepository extends Repository<Asset, any, any> {
  constructor(@InjectModel(Asset.name) model: Model<AssetDocument>) {
    super(model);
  }
}

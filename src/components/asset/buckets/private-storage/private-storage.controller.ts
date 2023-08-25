import { Action, Resource } from '@Common/enum';
import { AuthGuard, PolicyGuard } from '@Common/guards';
import { SetOwnerInterceptor } from '@Common/interceptors';
import { SetPolicy, SetResource } from '@Common/metadata';
import type { Asset } from '@Components/asset/schema';
import { AssetsSerializer } from '@Components/asset/serializers';
import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

import { PrivateStorageService } from './private-storage.service';

@Controller('assets/private')
@UseGuards(AuthGuard, PolicyGuard)
@SetResource(Resource.Asset)
@UseInterceptors(ClassSerializerInterceptor)
export class PrivateStorageController {
  constructor(private readonly privateStorageService: PrivateStorageService) {}

  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor(), SetOwnerInterceptor)
  @SetPolicy(Action.Create)
  async upload(@UploadedFiles() files: Asset[]): Promise<AssetsSerializer> {
    return AssetsSerializer.build({
      items: await this.privateStorageService.create(files),
    });
  }
}

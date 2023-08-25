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

import { PublicStorageService } from './public-storage.service';

@Controller('assets/public')
@UseGuards(AuthGuard, PolicyGuard)
@SetResource(Resource.Asset)
@UseInterceptors(ClassSerializerInterceptor)
export class PublicStorageController {
  constructor(private readonly publicStorageService: PublicStorageService) {}

  @Post('upload')
  @SetPolicy(Action.Create)
  @UseInterceptors(AnyFilesInterceptor(), SetOwnerInterceptor)
  async upload(@UploadedFiles() files: Asset[]): Promise<AssetsSerializer> {
    return AssetsSerializer.build({
      items: await this.publicStorageService.create(files),
    });
  }
}

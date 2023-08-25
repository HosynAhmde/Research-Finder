import { sdkStreamMixin } from '@aws-sdk/util-stream-node';
import { Action, Resource } from '@Common/enum';
import { AuthGuard, PolicyGuard } from '@Common/guards';
import { AuthorityInterceptor } from '@Common/interceptors';
import { SetPolicy, SetResource } from '@Common/metadata';
import { ParseObjectIdPipe } from '@Common/pipes';
import { encodeRFC5987ValueChars } from '@Common/utils';
import {
  Controller,
  Get,
  Param,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';

import { AssetService } from './asset.service';

@Controller('assets')
@UseGuards(AuthGuard, PolicyGuard)
@SetResource(Resource.Asset)
export class AssetController {
  constructor(private readonly service: AssetService) {}

  @Get(':id/download')
  @UseInterceptors(AuthorityInterceptor)
  @SetPolicy(Action.Read)
  async downloadById(
    @Res() res: Response,
    @Param('id', ParseObjectIdPipe) id: string,
  ) {
    const { data, asset } = await this.service.downloadById(id);

    res.set({
      'Content-Type': asset.mimetype,
      'Content-Disposition': `attachment; filename*=UTF-8''${encodeRFC5987ValueChars(
        asset.originalname,
      )}`,
    });

    return sdkStreamMixin(data).pipe(res);
  }
}

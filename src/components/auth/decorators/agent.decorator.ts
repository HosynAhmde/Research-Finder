import type { AppRequest } from '@Common/modules';
import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import { UAParser } from 'ua-parser-js';

export const Agent = createParamDecorator(
  (data: never, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AppRequest>();
    return UAParser(request.get('User-Agent'));
  },
);

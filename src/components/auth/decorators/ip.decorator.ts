import type { AppRequest } from '@Common/modules';
import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';

export const IP = createParamDecorator((data: never, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<AppRequest>();
  return request.ip;
});

import type { AppRequest } from '@Common/modules';
import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';

export const Field = createParamDecorator(
  (data: never, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AppRequest>();
    const { permission, body } = request;

    return permission.field(body);
  },
);

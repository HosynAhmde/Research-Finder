import { type AppRequest } from '@Common/modules/request';
import { type ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';

export const RefreshToken = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const { refreshToken } = ctx.switchToHttp().getRequest<AppRequest>();
  return refreshToken;
});

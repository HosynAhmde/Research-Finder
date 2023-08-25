import type { AppRequest } from '@Common/modules';
import type { JwtToken } from '@Components/auth/interface';
import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator(
  (data: keyof JwtToken | undefined, ctx: ExecutionContext) => {
    const { token } = ctx.switchToHttp().getRequest<AppRequest>();
    return data ? token[data] : token;
  },
);

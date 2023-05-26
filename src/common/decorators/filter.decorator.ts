import { type ExecutionContext, createParamDecorator } from '@nestjs/common';
import { type Filter as FilterType } from '@Common/interfaces';
import { AppRequest } from '@Common/modules';

export const Filter = createParamDecorator((_data: (keyof FilterType)[], ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<AppRequest>();
  return request.filter;
});

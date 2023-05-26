import { type CanActivate, type ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

import { type AppRequest } from './request.interface';

@Injectable()
export class MetaGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const request = ctx.switchToHttp().getRequest<AppRequest>();

    request.__class = ctx.getClass().name;
    request.__function = ctx.getHandler().name;

    return true;
  }
}

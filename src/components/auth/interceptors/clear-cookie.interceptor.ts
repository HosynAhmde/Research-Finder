import { type CallHandler, type ExecutionContext, type NestInterceptor } from '@nestjs/common';
import { Injectable, mixin } from '@nestjs/common';
import { type Response } from 'express';
import { type Observable } from 'rxjs';
import { tap } from 'rxjs';

import { COOKIE_NAME } from '../constants';

export const ClearCookie = (cookieName: string = COOKIE_NAME) => {
  @Injectable()
  class MixinInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
      const response = context.switchToHttp().getResponse<Response>();

      return next.handle().pipe(
        tap(responseDto => {
          response.clearCookie(cookieName);
          return responseDto;
        }),
      );
    }
  }

  return mixin(MixinInterceptor);
};

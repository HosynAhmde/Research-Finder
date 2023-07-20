import { AUTH_CONFIG } from '@Common/configs';
import { type CallHandler, type ExecutionContext, type NestInterceptor } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { type Response } from 'express';
import { type Observable } from 'rxjs';
import { tap } from 'rxjs';

import { COOKIE_NAME } from '../constants';
import { type AuthSerializer } from '../serializers';

const { COOKIE_OPTIONS } = AUTH_CONFIG();

@Injectable()
export class SetRefreshTokenInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<AuthSerializer> | Promise<Observable<AuthSerializer>> {
    const response: Response = context.switchToHttp().getResponse<Response>();
    return next.handle().pipe(
      tap((dto: AuthSerializer) => {
        response.cookie(COOKIE_NAME, dto.refreshToken, COOKIE_OPTIONS);

        return dto;
      }),
    );
  }
}

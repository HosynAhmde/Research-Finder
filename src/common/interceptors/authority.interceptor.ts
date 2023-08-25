import type { AppRequest } from '@Common/modules/request';
import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { Observable } from 'rxjs';

@Injectable()
export class AuthorityInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const request = ctx.switchToHttp().getRequest<AppRequest>();

    const { permission, token } = request;

    if (!permission)
      throw new Error(
        'Permission is required please check your code and use @PolicyGuard',
      );

    if (permission.granted && permission.granted) return next.handle();

    request.filter.query = {
      ...request.filter.query,
      createdBy: token.sub,
    };

    return next.handle();
  }
}

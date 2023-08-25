import type { AppRequest } from '@Common/modules/request';
import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { Observable } from 'rxjs';

@Injectable()
export class SetOwnerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() !== 'http') return next.handle();

    const request = context.switchToHttp().getRequest<AppRequest>();
    const token = request.token;

    if ('files' in request) {
      request.files.forEach(file => {
        file.createdBy = token.sub;
      });
    }

    request.body.createdBy = token.sub;

    return next.handle();
  }
}

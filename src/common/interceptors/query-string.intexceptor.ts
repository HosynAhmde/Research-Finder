import { type AppRequest } from '@Common/modules';
import { type CallHandler, type ExecutionContext, Injectable, type NestInterceptor } from '@nestjs/common';

@Injectable()
export class QueryStringParserInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler) {
    const request = ctx.switchToHttp().getRequest<AppRequest>();

    const { projection, sort, limit, skip } = request.query;

    const filter: any = {
      projection,
      pagination: {
        sort,
        limit,
        skip,
      },
      query: {},
    };

    request.filter = filter;

    return next.handle();
  }
}

import type { NestMiddleware } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class CookieParserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    cookieParser()(req, res, next);
  }
}

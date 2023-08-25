import { AUTH_CONFIG } from '@Common/configs';
import { AES } from '@Common/helpers';
import { BlacklistedService } from '@Common/modules';
import { type AppRequest } from '@Common/modules/request';
import { COOKIE_NAME } from '@Components/auth/constants';
import { type JwtToken } from '@Components/auth/interface';
import {
  type CanActivate,
  type ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { log } from 'abacl';

@Injectable()
export class RefreshGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly blacklisted: BlacklistedService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AppRequest>();

    const rawToken =
      request.cookies[COOKIE_NAME] ??
      request.headers.authorization?.split(/\s+/g)[1] ??
      request.body.refresh;

    if (!rawToken) throw new UnauthorizedException('AUTH.INVALID_TOKEN');

    try {
      request.refreshToken = this.jwtService.verify<JwtToken>(rawToken, {
        secret: AUTH_CONFIG().REFRESH_TOKEN.secret,
      });

      const isBlacklisted = await this.blacklisted.isBlacklisted(
        ...Object.values(request.refreshToken),
      );

      return !isBlacklisted;
    } catch (err) {
      throw new UnauthorizedException('AUTH.INVALID_TOKEN');
    }
  }
}

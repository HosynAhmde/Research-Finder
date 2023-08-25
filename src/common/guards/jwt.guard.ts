import { AUTH_CONFIG } from '@Common/configs';
import { IS_PUBLIC_KEY } from '@Common/constants';
import { AES } from '@Common/helpers/aes.helper';
import { AppRequest } from '@Common/modules';
import { BlacklistedService } from '@Common/modules/blacklisted';
import { JwtToken } from '@Components/auth/interface';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private readonly blacklisted: BlacklistedService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getClass(),
      context.getHandler(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<AppRequest>();

    const rawToken =
      request.headers.authorization?.split(/\s+/g)[1] ??
      (request.query.token as string);

    if (!rawToken) throw new UnauthorizedException('AUTH.INVALID_TOKEN');

    try {
      request.token = this.jwtService.verify<JwtToken>(rawToken, {
        secret: AUTH_CONFIG().ACCESS_TOKEN.secret,
      });

      const isBlacklisted = await this.blacklisted.isBlacklisted(
        ...Object.values(request.token),
      );

      return !isBlacklisted;
    } catch {
      throw new UnauthorizedException('AUTH.INVALID_TOKEN');
    }
  }
}

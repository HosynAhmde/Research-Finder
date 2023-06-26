import { abilities, CHECK_POLICY_KEY, RESOURCE_KEY } from '@Common/constants';
import { type Action, type Resource, type Role } from '@Common/enum';
import { type AppRequest } from '@Common/modules/request';
import { type CanActivate, type ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import AccessControl from 'abacl';

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ctxClass = context.getClass();
    const ctxHandler = context.getHandler();

    const request = context.switchToHttp().getRequest<AppRequest>();

    if (!request.token) throw new Error('Policy guard must be used with @UseGuard(AuthGuard) decorator');

    const resource = this.reflector.getAllAndOverride<Resource | undefined>(RESOURCE_KEY, [ctxHandler, ctxClass]);

    if (!resource) throw new Error('Resource must be set with @SetResource decorator');

    const action = this.reflector.getAllAndOverride<Action | undefined>(CHECK_POLICY_KEY, [ctxHandler, ctxClass]);

    const ac = new AccessControl<Role>(abilities);

    const permission = ac.can(request.token.roles, action, resource);

    if (!permission.granted) return false;

    request.permission = permission;

    return !!request.permission;
  }
}

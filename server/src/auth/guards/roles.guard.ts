import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { ROLES_KEY } from '../roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()]
      )
      if (!requiredRoles) {
        return true
      }
      const { user } = context.switchToHttp().getRequest()
      if (!user.roles.some((role) => requiredRoles.includes(role))) {
        throw new ForbiddenException('Нет доступа')
      }
      return user.roles.some((role) => requiredRoles.includes(role))
    } catch (e) {
      throw new ForbiddenException('Нет доступа')
    }
  }
}

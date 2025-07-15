import { UserRole } from '@/domain/enums/roles.enum';
import { ROLES_KEY } from '@/shared/decorators/roles.decorator';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        // guard này lấy các roles được yêu cầu từ metadata của route hoặc controller:
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );

        // Nếu không có roles nào được yêu cầu, guard cho phép truy cập:
        if (!requiredRoles) {
            return true;
        }

        // Lấy user từ request:
        const { user } = context.switchToHttp().getRequest();

        // Nếu user không tồn tại hoặc không có quyền, trả về true cho phép truy cập:
        if (!user) {
            return requiredRoles.includes(UserRole.GUEST);
        }
        return requiredRoles.includes(user.role as UserRole);
    }
}

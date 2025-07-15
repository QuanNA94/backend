import { AuthService } from '@/frameworks/auth/auth.service';
import {
    ExecutionContext,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    private readonly logger = new Logger(JwtAuthGuard.name);

    constructor(private readonly authService: AuthService) {
        super();
    }

    getRequest(context: ExecutionContext): Request {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const { req } = ctx.getContext();

        // Gọi phương thức canActivate của lớp cha (AuthGuard('jwt'))
        const result = (await super.canActivate(context)) as boolean;

        // Nếu xác thực thành công, user sẽ được gán vào req bởi Passport
        if (result && req.user) {
            // Có thể thêm logic bổ sung ở đây nếu cần
            return true;
        }

        // Nếu xác thực thất bại, ném ra UnauthorizedException
        throw new UnauthorizedException('Invalid token or user not found');
    }

    handleRequest(
        err: any,
        user: any,
        info: any,
        // context: ExecutionContext,
    ): any {
        if (err || !user) {
            this.logger.error('Authentication failed', { err, info });
            throw (
                err ||
                new UnauthorizedException('Invalid token or user not found')
            );
        }

        this.logger.debug('Authentication successful', { userId: user.id });
        return user;
    }
}

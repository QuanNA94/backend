import { UserRole } from '@/domain/enums/roles.enum';
import { EmailService } from '@/modules/email/email.service';
import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { User } from '../../database/core/user.entity';

@Injectable()
export class AuthService {
    constructor(
        // private readonly usersRepository: UsersRepository,
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,

        private readonly emailService: EmailService,
    ) {}

    async validationUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { ...result } = user;
            return result;
        }
        return null;
    }

    async validateToken(token: string): Promise<User> {
        try {
            const payload = this.jwtService.verify(token);
            const user = await this.usersService.findOne(payload.sub);

            if (!user) {
                throw new UnauthorizedException('User not found');
            }
            return user;
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new UnauthorizedException('Token has expired');
            }
            throw new UnauthorizedException('Invalid token');
        }
    }
    async login(user: User) {
        const payload = { username: user.username, sub: user.id };
        const token = this.jwtService.sign(payload);

        console.log('🔍 Generated Token:', token); // Debug token trước khi trả về

        return {
            access_token: token,
        };
    }

    async forgetPassword(email: string): Promise<void> {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new NotFoundException(`No user found for email: ${email}`);
        }
        await this.emailService.sendResetPasswordLink(email);
    }

    async resetPassword(token: string, password: string): Promise<void> {
        const email = await this.emailService.decodeConfirmationToken(token);

        const user = await this.usersService.findOneByEmail(email);

        if (!user) {
            throw new NotFoundException(`No user found for email: ${email}`);
        }

        user.password = password;
        delete user.resetToken;
    }

    getRole(user: any): UserRole {
        if (!user) return UserRole.GUEST;
        return user.role as UserRole;
    }
}

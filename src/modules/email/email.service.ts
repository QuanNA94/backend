import { UsersService } from '@/users/users.service';
import {
    Injectable,
    NotFoundException,
    Logger,
    BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';

@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name);
    private readonly nodemailerTransport: Mail;

    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,

        private readonly usersService: UsersService,
    ) {
        this.nodemailerTransport = createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: this.configService.get('EMAIL_USER'),
                clientId: this.configService.get('GMAIL_CLIENT_ID'),
                clientSecret: this.configService.get('GMAIL_CLIENT_SECRET'),
                refreshToken: this.configService.get('GMAIL_REFRESH_TOKEN'),
                accessToken: this.configService.get('GMAIL_ACCESS_TOKEN'),
            },
        });
    }

    private sendMail(options: Mail.Options) {
        this.logger.log('Email sent out to', options.to);
        return this.nodemailerTransport.sendMail(options);
    }
    public async sendResetPasswordLink(email: string): Promise<void> {
        const payload = { email };

        const token = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
            expiresIn: `${this.configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}`,
        });

        const user = await this.usersService.findOneByEmail(email);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        await this.usersService.updateResetToken(user.id, token);

        // TODO: Gửi email chứa link reset password
        const resetLink = `${this.configService.get('EMAIL_RESET_PASSWORD_URL')}?token=${token}`;

        const text = `Hi, \nTo reset your password, click here: ${resetLink}`;

        return this.sendMail({
            to: email,
            subject: 'Reset Password',
            text,
        });
    }

    public async decodeConfirmationToken(token: string) {
        try {
            const payload = await this.jwtService.verify(token, {
                secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
            });

            if (typeof payload === 'object' && 'email' in payload) {
                return payload.email;
            }
            throw new BadRequestException();
        } catch (error) {
            if (error?.name === 'TokenExpiredError') {
                throw new BadRequestException(
                    'Email confirmation token expired',
                );
            }
            throw new BadRequestException('Bad confirmation token');
        }
    }
}

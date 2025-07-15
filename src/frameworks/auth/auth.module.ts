import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@/gateways/guards/passport-strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticateUseCase } from '@/domain/use-cases/auth/authenticate-user-use-case';
import { AuthResolver } from '../../authentication/auth.resolver';
import { EmailModule } from '@/modules/email/email.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        EmailModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'default_secret',
            signOptions: { expiresIn: '1h' },
        }),
        UsersModule, // Import UsersModule để dùng UsersService
        PassportModule,
        ConfigModule,
    ],
    providers: [AuthService, JwtStrategy, AuthenticateUseCase, AuthResolver],
    exports: [JwtModule, JwtStrategy, AuthService],
})
export class AuthModule {}

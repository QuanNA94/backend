import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@/gateways/guards/passport-strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticateUseCase } from '@/domain/use-cases/auth/authenticate-user-use-case';
import { AuthResolver } from '../../authentication/auth.resolver';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.ACCESS_TOKEN_SECRET || 'default_secret',
            signOptions: { expiresIn: '60s' },
        }),
        UsersModule, // Import UsersModule để dùng UsersService
        PassportModule,
    ],
    providers: [AuthService, JwtStrategy, AuthenticateUseCase, AuthResolver],
    exports: [JwtModule, JwtStrategy],
})
export class AuthModule {}

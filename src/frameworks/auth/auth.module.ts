import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@/gateways/guards/passport-strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticateUseCase } from '@/domain/use-cases/auth/authenticate-user-use-case';
import { AuthResolver } from '../../authentication/auth.resolver';
import { EmailModule } from '@/modules/email/email.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        EmailModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '1h' },
            }),
            inject: [ConfigService],
        }),
        UsersModule, // Import UsersModule để dùng UsersService
        PassportModule,
        ConfigModule,
    ],
    providers: [AuthService, JwtStrategy, AuthenticateUseCase, AuthResolver],
    exports: [JwtModule, JwtStrategy, AuthService],
})
export class AuthModule {}

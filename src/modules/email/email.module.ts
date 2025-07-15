import { UsersModule } from '@/users/users.module';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from './email.service';
import { EmailController } from '@/gateways/controllers/email/email.controller';

@Module({
    imports: [UsersModule],
    providers: [EmailService, JwtService],
    controllers: [EmailController],
    exports: [EmailService],
})
export class EmailModule {}

import { AuthService } from '@/frameworks/auth/auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('reset-password')
    async resetPassword(
        @Body() { token, password }: { token: string; password: string },
    ): Promise<void> {
        // Implement reset password logic
        return this.authService.resetPassword(token, password);
    }

    @Post('forgot-password')
    async forgotPassword(@Body() { email }: { email: string }): Promise<void> {
        return await this.authService.forgetPassword(email);
    }
}

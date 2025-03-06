import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../frameworks/auth/auth.service';
import { AuthInput } from './dto/auth.input';
import { AuthResponse } from './dto/auth.response';
import { UnauthorizedException } from '@nestjs/common';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => AuthResponse)
    async login(@Args('authInput') authInput: AuthInput) {
        console.log('🔍 Received authInput:', authInput);

        const user = await this.authService.validationUser(
            authInput.username,
            authInput.password,
        );
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.authService.login(user);
    }
}

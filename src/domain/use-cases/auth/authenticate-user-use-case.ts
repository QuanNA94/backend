import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UsersRepository } from 'src/domain/repositories/users.repository';
import { BaseUseCase } from '../base-use-case.interface';

@Injectable()
export class AuthenticateUseCase implements BaseUseCase {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly jwtService: JwtService,
    ) {}

    async execute(name: string, password: string) {
        const user = await this.usersRepository.getByName(name);
        if (!user) {
            return null;
        }
        const passwordHasMatch = await compare(password, user.password);
        if (!passwordHasMatch) {
            return null;
        }
        const payload = { subject: user.id, user_name: user.username };
        return {
            token: this.jwtService.sign(payload),
            user,
        };
    }
}

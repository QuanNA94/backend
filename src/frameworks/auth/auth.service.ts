import { Injectable } from '@nestjs/common';
// import { UsersRepository } from 'src/domain/repositories/users.repository';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/database/core/user.entity';

@Injectable()
export class AuthService {
    constructor(
        // private readonly usersRepository: UsersRepository,
        private readonly usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validationUser(username: string, pass: string): Promise<any> {
        // const user = await this.usersRepository.getByName(username);
        // if (user && user.password === password) {
        //     return user;
        // }
        // return null;
        const user = await this.usersService.findOneByUsername(username);
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password: _, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: User) {
        const payload = { username: user.username, sub: user.id };
        const token = this.jwtService.sign(payload);

        console.log('🔍 Generated Token:', token); // Debug token trước khi trả về

        return {
            access_token: token,
        };
    }
}

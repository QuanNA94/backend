import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { User } from '../../../database/core/user.entity';
import { UsersRepository } from 'src/domain/repositories/users.repository';
import { UsersService } from 'src/users/users.service';
import { BaseUseCase } from '../base-use-case.interface';

@Injectable()
export class CreateUserUseCase implements BaseUseCase {
    constructor(
        private readonly usersService: UsersService,
        private readonly usersRepository: UsersRepository,
    ) {
        console.log('usersService :>> ', usersService);
    }

    async execute(input: User) {
        const password = await hash(input.password, 8);
        const user = this.usersRepository.create({
            ...input,
            password,
        });
        return user;
    }
}

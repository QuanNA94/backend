import { Inject, Injectable } from '@nestjs/common';
import {
    USER_REPOSITORY,
    UsersRepository,
} from 'src/domain/repositories/users.repository';
import { User } from '../database/core/user.entity';
import { CreateUserInput } from '../gateways/controllers/users/dtos/create-user.input';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(
        // @InjectRepository(User)
        // private readonly userRepository: Repository<User>,
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UsersRepository,
    ) {}

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: string): Promise<User> {
        return this.userRepository.findOne({ where: { id } });
    }

    async findOneByUsername(username: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { username } });
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { email } });
    }

    async create(createUserInput: CreateUserInput): Promise<User> {
        if (!createUserInput.password) {
            throw new Error('Password is required');
        }

        const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
        const user = this.userRepository.create({
            ...createUserInput,
            password: hashedPassword,
        });
        return this.userRepository.save(user);
    }

    async update(id: string, user: Partial<User>): Promise<User> {
        await this.userRepository.update(id, user);
        return this.userRepository.findOne({ where: { id } });
    }

    async delete(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}

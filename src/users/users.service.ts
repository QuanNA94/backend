import {
    BadRequestException,
    ConflictException,
    Inject,
    Injectable,
} from '@nestjs/common';

import { User } from '../database/core/user.entity';
import { CreateUserInput } from '../gateways/controllers/users/dtos/create-user.input';
import * as bcrypt from 'bcryptjs';
import { UserRole } from '@/domain/enums/roles.enum';
import {
    USER_REPOSITORY,
    UsersRepository,
} from '@/domain/repositories/users.repository';

@Injectable()
export class UsersService {
    constructor(
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
        // Kiểm tra password
        if (!createUserInput.password) {
            throw new BadRequestException('Password is required');
        }

        // Kiểm tra username và email đã tồn tại chưa
        const existingUser = await this.userRepository.findOne({
            where: [
                { username: createUserInput.username },
                { email: createUserInput.email },
            ],
        });

        if (existingUser) {
            throw new ConflictException('Username or email already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(createUserInput.password, 10);

        // Tạo user mới với role mặc định là USER
        const user = this.userRepository.create({
            ...createUserInput,
            password: hashedPassword,
            role: UserRole.USER, // Gán role mặc định ở đây
        });

        // Lưu user vào database
        try {
            return await this.userRepository.save(user);
        } catch {
            throw new BadRequestException('Failed to create user');
        }
    }

    async update(id: string, user: Partial<User>): Promise<User> {
        await this.userRepository.update(id, user);
        return this.userRepository.findOne({ where: { id } });
    }

    async updateResetToken(userId: string, resetToken: string): Promise<void> {
        await this.userRepository.update(userId, { resetToken });
    }

    async delete(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}

import { JwtAuthGuard } from '@/gateways/guards/jwt-auth-guard';
import { User } from '../../../database/core/user.entity';
import { UsersService } from '@/users/users.service';
import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    NotFoundException,
    UseGuards,
    ParseUUIDPipe,
    HttpCode,
    HttpStatus,
    BadRequestException,
} from '@nestjs/common';
import { RolesGuard } from '@/gateways/guards/roles.guard';
import { Roles } from '@/shared/decorators/roles.decorator';
import { UserRole } from '@/domain/enums/roles.enum';
import { CreateUserInput } from './dtos/create-user.input';
import { UpdateUserInput } from './dtos/update-user.input';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    //get all users
    @Get()
    @Roles(UserRole.ADMIN)
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    //get user by id
    @Get(':id')
    @Roles(UserRole.ADMIN, UserRole.USER)
    async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
        const user = await this.usersService.findOne(id);
        if (!user) {
            throw new NotFoundException('User does not exist!');
        } else {
            return user;
        }
    }

    //create user
    @Post()
    @Roles(UserRole.ADMIN)
    @HttpCode(HttpStatus.CREATED)
    @Post()
    @Roles(UserRole.ADMIN)
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateUserInput): Promise<User> {
        try {
            return await this.usersService.create(createUserDto);
        } catch {
            throw new BadRequestException('Failed to create user');
        }
    }

    //update user
    @Put(':id')
    @Roles(UserRole.ADMIN)
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateUserDto: UpdateUserInput,
    ): Promise<User> {
        try {
            const updatedUser = await this.usersService.update(
                id,
                updateUserDto,
            );
            if (!updatedUser) {
                throw new NotFoundException(`User with ID "${id}" not found`);
            }
            return updatedUser;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new BadRequestException('Failed to update user');
        }
    }

    //delete user
    @Delete(':id')
    @Roles(UserRole.ADMIN)
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        //handle error if user does not exist
        const user = await this.usersService.findOne(id);
        if (!user) {
            throw new NotFoundException('User does not exist!');
        }
        return this.usersService.delete(id);
    }
}

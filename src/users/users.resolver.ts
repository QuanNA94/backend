import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from 'src/database/core/user.entity';
import { CreateUserInput } from '../gateways/controllers/users/dtos/create-user.input';
import { AuthenticationError } from '@nestjs/apollo';
import { JwtAuthGuard } from '@/gateways/guards/jwt-auth-guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Query(() => [User])
    async users(): Promise<User[]> {
        return this.usersService.findAll();
    }

    // Query to fetch current logged-in user
    @Query(() => User)
    @UseGuards(JwtAuthGuard)
    async currentUser(@Context() context): Promise<User> {
        console.log('User from context:', context.req.user);
        console.log('Headers:', context.req.headers);

        if (!context.req || !context.req.user) {
            throw new AuthenticationError('User not authenticated');
        }

        return context.req.user;
    }

    @Mutation(() => User)
    async createUser(
        @Args('createUserInput') createUserInput: CreateUserInput,
    ): Promise<User> {
        return this.usersService.create(createUserInput);
    }
}

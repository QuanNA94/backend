import { CoffeeOrder } from '@/domain/entities/coffee-order.entity';
import { CoffeeOrdersService } from '@/domain/services/coffee-orders.service';
import { UsersService } from '@/users/users.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateCoffeeOrderInput } from './dto/create-coffee-order.input';
import { CoffeeService } from '@/coffee/coffee.service';

@Resolver(() => CoffeeOrder)
export class CoffeeOrderResolver {
    constructor(
        private readonly coffeeOrdersService: CoffeeOrdersService,
        private readonly usersService: UsersService,
        private readonly coffeeService: CoffeeService,
    ) {}

    @Mutation(() => CoffeeOrder)
    async createCoffeeOrder(
        @Args('createCoffeeOrderInput')
        createCoffeeOrderInput: CreateCoffeeOrderInput,
    ): Promise<CoffeeOrder> {
        const user = await this.usersService.findOne(
            createCoffeeOrderInput.userId,
        );
        const coffee = this.coffeeService.findOne(
            createCoffeeOrderInput.coffeeId.toString(),
        );

        return this.coffeeOrdersService.createCoffeeOrder(
            user?.id,
            coffee?.id,
            createCoffeeOrderInput.quantity,
        );
    }

    @Query(() => [CoffeeOrder])
    async getCoffeeOrdersByUser(
        @Args('userId') userId: string,
    ): Promise<CoffeeOrder[]> {
        return this.coffeeOrdersService.getCoffeeOrdersByUser(userId);
    }
}

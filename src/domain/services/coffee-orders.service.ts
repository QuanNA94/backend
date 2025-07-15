import { InjectRepository } from '@nestjs/typeorm';
import { CoffeeOrder } from '../entities/coffee-order.entity';
import { Repository } from 'typeorm';
import { Coffee } from '../../coffee/entities/coffee.entity';
import { UsersRepository } from '../repositories/users.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CoffeeOrdersService {
    constructor(
        @InjectRepository(CoffeeOrder)
        private coffeeOrderRepository: Repository<CoffeeOrder>,
        private userRepository: UsersRepository,
        @InjectRepository(Coffee)
        private coffeeRepository: Repository<Coffee>,
    ) {}

    async createCoffeeOrder(
        userId: string,
        coffeeId: string,
        quantity: number,
    ): Promise<CoffeeOrder> {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        const coffee = await this.coffeeRepository.findOne({
            where: { id: coffeeId },
        });

        if (!user || !coffee) {
            throw new Error('User or Coffee not found');
        }

        const coffeeOrder = new CoffeeOrder();
        coffeeOrder.user = user;
        coffeeOrder.coffee = coffee;
        coffeeOrder.quantity = quantity;
        coffeeOrder.totalPrice = coffee.price * quantity;

        return await this.coffeeOrderRepository.save(coffeeOrder);
    }

    async getCoffeeOrdersByUser(userId: string): Promise<CoffeeOrder[]> {
        return await this.coffeeOrderRepository.find({
            where: { user: { id: userId } },
            relations: ['user', 'coffee'],
        });
    }
}

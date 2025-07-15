import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
// logic quan ly san pham
export class CoffeeService {
    private readonly coffees: Coffee[] = []; // Tam thoi su dung du lieu trong bo nho

    findAll(): Coffee[] {
        return this.coffees;
    }

    findOne(id: string): Coffee | undefined {
        return this.coffees.find((coffee) => coffee.id === id);
    }

    create(coffee: Coffee): Coffee {
        this.coffees.push(coffee);
        return coffee;
    }

    save(coffee: Coffee): Coffee {
        const existingCoffeeIndex = this.coffees.findIndex(
            (c) => c.id === coffee.id,
        );

        if (existingCoffeeIndex >= 0) {
            this.coffees[existingCoffeeIndex] = coffee;
        } else {
            return this.create(coffee);
        }
    }
}

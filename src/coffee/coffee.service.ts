import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
// logic quan ly san pham
export class CoffeeService {
    private coffees: Coffee[] = []; // Tam thoi su dung du lieu trong bo nho

    findAll(): Coffee[] {
        return this.coffees;
    }

    create(coffee: Coffee): Coffee {
        this.coffees.push(coffee);
        return coffee;
    }
}

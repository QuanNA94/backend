import { Body, Controller, Get, Post } from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { Coffee } from './entities/coffee.entity';

@Controller('coffee')
export class CoffeeController {
    constructor(private readonly coffeeService: CoffeeService) {}

    @Get()
    findAll() {
        return this.coffeeService.findAll();
    }

    @Post()
    create(@Body() coffee: Coffee) {
        return this.coffeeService.create(coffee);
    }
}

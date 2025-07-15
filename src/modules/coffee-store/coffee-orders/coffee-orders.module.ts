import { CoffeeOrder } from '@/domain/entities/coffee-order.entity';
import { CoffeeOrdersService } from '@/domain/services/coffee-orders.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeOrderResolver } from './coffee-orders.resolver';
import { UsersModule } from '@/users/users.module';
import { CoffeeModule } from '@/coffee/coffee.module';
import { Coffee } from '@/coffee/entities/coffee.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([CoffeeOrder, Coffee]),
        UsersModule,
        CoffeeModule,
    ],
    providers: [CoffeeOrdersService, CoffeeOrderResolver],
    exports: [CoffeeOrdersService],
})
export class CoffeeOrdersModule {}

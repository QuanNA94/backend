import { CartModule } from '@/modules/coffee-store/cart/cart.module';
import { CoffeeOrdersModule } from '@/modules/coffee-store/coffee-orders/coffee-orders.module';
import { ProductsModule } from '@/modules/coffee-store/products/products.module';
import { PaymentModule } from '@/payment/payment.module';
import { UsersModule } from '@/users/users.module';
import { Module } from '@nestjs/common';
import { ProductsController } from './products/products.controller';
import { UsersController } from './users/users.controller';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from '@/frameworks/auth/auth.module';

@Module({
    imports: [
        ProductsModule,
        UsersModule,
        CoffeeOrdersModule,
        PaymentModule,
        CartModule,
        AuthModule,
    ],
    controllers: [ProductsController, UsersController, AuthController],
})
export class ControllersModule {}

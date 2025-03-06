import { Module } from '@nestjs/common';
import { ProductsController } from './products/products.controller';
import { ProductsModule } from '@/modules/pet-store/products/products.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from '@/users/users.module';

@Module({
    imports: [ProductsModule, UsersModule],
    controllers: [ProductsController, UsersController],
})
export class ControllersModule {}

import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';
import { DatabaseModule } from '@/database/database.module';

@Module({
    imports: [DatabaseModule],
    providers: [
        // ...cartProviders, // Cung cấp TypeORM Repository cơ bản
        // CartRepository, // Class tuỳ chỉnh mở rộng từ Repository
        CartResolver,
        CartService,
    ],
})
export class CartModule {}

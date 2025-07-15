import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ProductsRepository } from './repository/products.repository';
import { productProviders } from './product.providers';
import { ProductResolver } from './product.resolver';
import { ProductsController } from '@/gateways/controllers/products/products.controller';
import { ProductsService } from './products.service';

@Module({
    // imports: [TypeOrmModule.forFeature([Product])],
    imports: [DatabaseModule],
    controllers: [ProductsController],
    providers: [
        ...productProviders,
        ProductsService,
        ProductsRepository,
        ProductResolver,
    ],
    exports: [ProductsService],
})
export class ProductsModule {}

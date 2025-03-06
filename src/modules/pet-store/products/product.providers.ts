import { DataSource } from 'typeorm';
import { PRODUCT_REPOSITORY } from './repository/products.repository';
import { Provider } from '@nestjs/common';
import { Product } from './entities/product.entity';

export const productProviders: Provider[] = [
    {
        provide: PRODUCT_REPOSITORY,
        useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(Product),
        inject: ['DATA_SOURCE'],
    },
];

import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ProductFavorite } from './entities/product-favorite.entity';
import { Product } from './entities/product.entity';
import { PRODUCT_FAVORITE_REPOSITORY } from './repository/product-favorite.repository';
import { PRODUCT_REPOSITORY } from './repository/products.repository';

export const productProviders: Provider[] = [
    {
        provide: PRODUCT_REPOSITORY,
        useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(Product),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: PRODUCT_FAVORITE_REPOSITORY,
        useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(ProductFavorite),
        inject: ['DATA_SOURCE'],
    },
];

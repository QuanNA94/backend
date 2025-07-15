import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ProductFavorite } from '../entities/product-favorite.entity';

export const PRODUCT_FAVORITE_REPOSITORY = 'PRODUCT_FAVORITE_REPOSITORY';

@Injectable()
export class ProductFavoriteRepository extends Repository<ProductFavorite> {
    constructor(private dataSource: DataSource) {
        super(ProductFavorite, dataSource.createEntityManager());
    }
}

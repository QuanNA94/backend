import { Inject, Injectable } from '@nestjs/common';
import {
    PRODUCT_REPOSITORY,
    ProductsRepository,
} from './repository/products.repository';
import { Product } from './entities/product.entity';
import { CreateProductDto } from '@/gateways/controllers/products/dtos/create-product.input';

@Injectable()
export class ProductsService {
    constructor(
        @Inject(PRODUCT_REPOSITORY)
        private readonly productsRepository: ProductsRepository,
    ) {}

    async getAllProducts(): Promise<Product[]> {
        return this.productsRepository.find();
    }

    async getProductById(id: string): Promise<Product> {
        return this.productsRepository.findOne({ where: { id } });
    }

    async createProduct(
        createProductInput: CreateProductDto,
    ): Promise<Product> {
        const createProduct =
            this.productsRepository.create(createProductInput);
        console.log('Created entity:', createProduct);
        return this.productsRepository.save(createProduct);
    }

    async updateProduct(
        id: string,
        product: Partial<Product>,
    ): Promise<Product> {
        await this.productsRepository.update(id, product);
        return this.productsRepository.findOne({ where: { id } });
    }

    async deleteProduct(id: string): Promise<void> {
        await this.productsRepository.delete(id);
    }
}

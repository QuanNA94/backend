import { CreateProductDto } from '@/gateways/controllers/products/dtos/create-product.input';
import { Inject, Injectable } from '@nestjs/common';
import { ProductFavorite } from './entities/product-favorite.entity';
import { Product } from './entities/product.entity';
import {
    PRODUCT_FAVORITE_REPOSITORY,
    ProductFavoriteRepository,
} from './repository/product-favorite.repository';
import {
    PRODUCT_REPOSITORY,
    ProductsRepository,
} from './repository/products.repository';

@Injectable()
export class ProductsService {
    constructor(
        @Inject(PRODUCT_REPOSITORY)
        private readonly productsRepository: ProductsRepository,
        @Inject(PRODUCT_FAVORITE_REPOSITORY)
        private readonly productFavoritesRepository: ProductFavoriteRepository,
    ) {}

    async getAllProducts(): Promise<Product[]> {
        return this.productsRepository.find();
    }

    async getProductById(id: string): Promise<Product> {
        return this.productsRepository.findOne({ where: { id } });
    }

    async getBestSellerProducts(limit: number = 10): Promise<Product[]> {
        return this.productsRepository.find({
            order: { salesCount: 'DESC' },
            take: limit,
        });
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

    async deleteProduct(id: string): Promise<Product> {
        const product = await this.productsRepository.findOne({
            where: { id },
        });

        if (!product) {
            throw new Error(`Product with ID ${id} not found`);
        }

        await this.productsRepository.delete(id);
        return product;
    }

    // best saler
    async getFeaturedProducts(): Promise<Product[]> {
        return this.productsRepository.find({ where: { isFeatured: true } });
    }

    // product favorite
    async toggleFavoriteProduct(
        userId: string,
        productId: string,
    ): Promise<ProductFavorite | null> {
        const existingFavorite = await this.productFavoritesRepository.findOne({
            where: { userId, productId },
        });

        if (existingFavorite) {
            // Nếu đã tồn tại, đảo ngược trạng thái yêu thích
            existingFavorite.isFavorite = !existingFavorite.isFavorite;
            return this.productFavoritesRepository.save(existingFavorite);
        } else {
            // Nếu chưa tồn tại, tạo mới với trạng thái yêu thích là true
            const newFavorite = this.productFavoritesRepository.create({
                userId,
                productId,
                isFavorite: true,
            });
            return this.productFavoritesRepository.save(newFavorite);
        }
    }
}

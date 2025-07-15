import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { CreateProductDto } from '@/gateways/controllers/products/dtos/create-product.input';
import { ProductFavorite } from './entities/product-favorite.entity';

@Resolver(() => Product)
export class ProductResolver {
    constructor(private readonly productsService: ProductsService) {}

    @Query(() => [Product], { name: 'coffeeStore_products' })
    async findAll(): Promise<Product[]> {
        return this.productsService.getAllProducts();
    }

    @Query(() => Product, { name: 'coffeeStore_product_by_id' })
    async findOne(
        @Args('id', { type: () => String }) id: string,
    ): Promise<Product> {
        return this.productsService.getProductById(id);
    }

    @Query(() => [Product])
    async getFeaturedProducts(): Promise<Product[]> {
        return this.productsService.getFeaturedProducts();
    }

    @Query(() => [Product])
    async getBestSellerProducts(
        @Args('limit', { type: () => Int, nullable: true }) limit?: number,
    ): Promise<Product[]> {
        try {
            return await this.productsService.getBestSellerProducts(
                limit || 10,
            );
        } catch (error) {
            throw new Error(
                `Failed to get best seller products: ${error.message}`,
            );
        }
    }

    // @Query(() => [Product])
    // async getfavoriteProducts(
    //     @Args('userId') userId: string,
    // ): Promise<Product[]> {
    //     try {
    //         const favoriteProductIds =
    //             await this.productsService.getFavoriteProducts(userId);

    //         return await this.productsService.getProductById(
    //             favoriteProductIds,
    //         );
    //     } catch (error) {
    //         throw new Error(
    //             `Failed to get favorite products for user:  ${error.message}`,
    //         );
    //     }
    // }

    @Mutation(() => Product)
    async createProduct(
        @Args('createProductInput') createProductInput: CreateProductDto,
    ): Promise<Product> {
        console.log('Received createProductInput:', createProductInput);
        return this.productsService.createProduct(createProductInput);
    }

    @Mutation(() => Product)
    async deleteProduct(
        @Args('productId') productId: string,
    ): Promise<Product> {
        try {
            return await this.productsService.deleteProduct(productId);
        } catch (error) {
            throw new Error(`Failed to delete product: ${error.message}`);
        }
    }

    @Mutation(() => Product)
    async setProductFeatured(
        @Args('productId') productId: string,
        @Args('isFeatured') isFeatured: boolean,
    ): Promise<Product> {
        try {
            const product =
                await this.productsService.getProductById(productId);
            if (!product) {
                throw new Error(`Product with ID ${productId} not found`);
            }

            product.isFeatured = isFeatured;
            return await this.productsService.updateProduct(productId, product);
        } catch (error) {
            throw new Error(
                `Failed to set product as featured: ${error.message}`,
            );
        }
    }

    @Mutation(() => ProductFavorite, { nullable: true })
    async toggleFavoriteProduct(
        @Args('userId') userId: string,
        @Args('productId') productId: string,
    ): Promise<ProductFavorite | null> {
        // Implement logic to toggle favorite product
        try {
            return await this.productsService.toggleFavoriteProduct(
                userId,
                productId,
            );
        } catch (error) {
            throw new Error(
                `Failed to toggle favorite product: ${error.message}`,
            );
        }
    }
}

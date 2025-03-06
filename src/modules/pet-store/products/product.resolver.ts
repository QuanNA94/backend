import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { CreateProductDto } from '@/gateways/controllers/products/dtos/create-product.input';

@Resolver(() => Product)
export class ProductResolver {
    constructor(private readonly productsService: ProductsService) {}

    @Query(() => [Product], { name: 'products' })
    async findAll(): Promise<Product[]> {
        return this.productsService.getAllProducts();
    }

    @Mutation(() => Product)
    async createProduct(
        @Args('createProductInput') createProductInput: CreateProductDto,
    ): Promise<Product> {
        console.log('Received createProductInput:', createProductInput);
        return this.productsService.createProduct(createProductInput);
    }
}

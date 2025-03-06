import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { Product } from '@/modules/pet-store/products/entities/product.entity';
import { CreateProductDto } from './dtos/create-product.input';
import { ProductsService } from '@/modules/pet-store/products/products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async findAll() {
        return this.productsService.getAllProducts();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.productsService.getProductById(id);
    }

    @Post()
    async create(
        @Body() createProductInput: CreateProductDto,
    ): Promise<Product> {
        return this.productsService.createProduct(createProductInput);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() product: Partial<CreateProductDto>,
    ): Promise<any> {
        return this.productsService.updateProduct(id, product);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.productsService.deleteProduct(id);
    }
}

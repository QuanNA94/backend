import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY';

// Chứa các phương thức giao tiếp trực tiếp với cơ sở dữ liệu thông qua TypeORM
// Trong NestJS, nếu dùng TypeORM, Repository được quản lý bởi TypeORM's Repository API.
export class ProductsRepository extends Repository<Product> {
    async getAllProducts(): Promise<Product[]> {
        return this.find();
    }

    async getDetailProduct(id: string): Promise<Product | null> {
        return this.findOne({ where: { id } });
    }

    async createProduct(data: Partial<Product>): Promise<Product> {
        const product = this.create(data);
        return this.save(product);
    }

    async deleteById(id: string): Promise<Product> {
        const product = await this.findOne({ where: { id } });
        if (!product) {
            throw new Error(`Product with ID ${id} not found`);
        }
        await this.delete(id);
        return product;
    }
}

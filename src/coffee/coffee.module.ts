import { Module } from '@nestjs/common';
import { CoffeeController } from './coffee.controller';
import { CoffeeService } from './coffee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Coffee])],
    controllers: [CoffeeController],
    providers: [CoffeeService],
    exports: [CoffeeService], // Đảm bảo dòng này tồn tại
})
export class CoffeeModule {}

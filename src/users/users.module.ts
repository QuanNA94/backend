import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/database/database.module';
import { usersProvider } from './users.providers';
import { UsersRepository } from 'src/domain/repositories/users.repository';
import { UsersResolver } from './users.resolver';
import { UsersController } from '@/gateways/controllers/users/users.controller';

@Module({
    // imports: [TypeOrmModule.forFeature([User])],
    imports: [DatabaseModule],
    controllers: [UsersController],
    providers: [...usersProvider, UsersService, UsersRepository, UsersResolver],
    exports: [UsersService, UsersRepository],
})
export class UsersModule {}

import { USER_REPOSITORY } from 'src/domain/repositories/users.repository';
import { DataSource } from 'typeorm';
import { User } from '../database/core/user.entity';

export const usersProvider = [
    {
        provide: USER_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
        inject: ['DATA_SOURCE'], // Phụ thuộc vào provider từ DatabaseModule
    },
];

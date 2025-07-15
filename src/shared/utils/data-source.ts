// import { User } from '../../database/core/user.entity';
import { join } from 'path';
import { DataSource } from 'typeorm';
// import { join } from 'path';
// import { User } from 'src/users/entities/user.entity';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'), // Sử dụng DB_PORT
    username: 'postgres',
    password: 'admin',
    database: 'postgres',
    logging: true,
    // entities: [User], // Sử dụng entity trực tiếp
    // entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    entities: [
        // Tìm trong modules
        join(
            __dirname,
            '..',
            '..',
            'modules',
            '**',
            'entities',
            '*.entity{.ts,.js}',
        ),
        // Tìm trong database/core
        join(__dirname, '..', '..', 'database', 'core', '*.entity{.ts,.js}'),
        // Tìm trong domain/entities
        join(__dirname, '..', '..', 'domain', 'entities', '*.entity{.ts,.js}'),
        // Tìm tất cả các entity trong dự án (phòng trường hợp)
        join(__dirname, '..', '..', '**', '*.entity{.ts,.js}'),
    ],
    migrations: [
        join(__dirname, '..', '..', 'database', 'migrations', '*{.ts,.js}'),
    ],

    synchronize: false, // Đặt thành false khi sử dụng migrations
    migrationsTableName: 'typeorm_migrations',
    migrationsRun: true,
});

// import { User } from '../../database/core/user.entity';
import { DataSource } from 'typeorm';
// import { join } from 'path';
// import { User } from 'src/users/entities/user.entity';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'postgres',
    logging: true,
    // entities: [User], // Sử dụng entity trực tiếp
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    // migrations: [
    //     join(__dirname, '/../../', 'database/migrations/**/*{.ts,.js}'),
    // ],
    synchronize: true,
    // migrationsTableName: 'typeorm_migrations',
    // migrationsRun: false,
});

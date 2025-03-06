// import { User } from 'src/domain/entities/user.entity';
// import { DataSource } from 'typeorm';

import { AppDataSource } from 'src/shared/utils/data-source';

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            try {
                return await AppDataSource.initialize();
            } catch (error) {
                console.error(
                    'Error during Data Source initialization:',
                    error,
                );
                throw error;
            }
        },
    },
];

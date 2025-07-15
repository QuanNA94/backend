import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class CreateProductFavoriteTable1747526028005
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.query(
                `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`,
            );

            const favoriteTableExists =
                await queryRunner.hasTable('product_favorite');

            if (!favoriteTableExists) {
                await queryRunner.createTable(
                    new Table({
                        name: 'product_favorite',
                        columns: [
                            {
                                name: 'id',
                                type: 'uuid',
                                isPrimary: true,
                                default: 'uuid_generate_v4()',
                            },
                            {
                                name: 'productId',
                                type: 'uuid',
                                isNullable: false,
                            },
                            {
                                name: 'userId',
                                type: 'uuid',
                                isNullable: false,
                            },
                            {
                                name: 'createdAt',
                                type: 'timestamp',
                                default: 'CURRENT_TIMESTAMP',
                            },
                        ],
                    }),
                );
            }

            // Tạo liên kết với bảng product và user
            await queryRunner.createForeignKey(
                'product_favorite',
                new TableForeignKey({
                    columnNames: ['productId'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'product',
                    onDelete: 'CASCADE',
                }),
            );

            await queryRunner.createForeignKey(
                'product_favorite',
                new TableForeignKey({
                    columnNames: ['userId'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'user',
                    onDelete: 'CASCADE',
                }),
            );
        } catch (error) {
            console.error('Error creating product_favorite table', error);
            throw error;
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.getTable('product_favorite');

        if (tableExists) {
            // Xóa các foreign keys
            const favoriteTable =
                await queryRunner.getTable('product_favorite');
            const foreignKeys = favoriteTable?.foreignKeys || [];
            for (const foreignKey of foreignKeys) {
                await queryRunner.dropForeignKey(
                    'product_favorite',
                    foreignKey,
                );
            }

            // Xóa bảng
            await queryRunner.dropTable('product_favorite');
        }
    }
}

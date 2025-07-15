import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export class CreateProductCategoryTable1747368287486
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.query(
                `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`,
            );

            // Kiểm tra và tạo bảng product_category nếu chưa tồn tại
            const categoryTableExists =
                await queryRunner.hasTable('product_category');
            if (!categoryTableExists) {
                await queryRunner.createTable(
                    new Table({
                        name: 'product_category',
                        columns: [
                            {
                                name: 'id',
                                type: 'uuid',
                                isPrimary: true,
                                default: 'uuid_generate_v4()',
                            },
                            {
                                name: 'name',
                                type: 'varchar',
                                length: '255',
                                isNullable: false,
                            },
                            {
                                name: 'description',
                                type: 'text',
                                isNullable: true,
                            },
                            {
                                name: 'createdAt',
                                type: 'timestamp',
                                default: 'CURRENT_TIMESTAMP',
                            },
                            {
                                name: 'updatedAt',
                                type: 'timestamp',
                                default: 'CURRENT_TIMESTAMP',
                            },
                        ],
                    }),
                );
            }

            // Kiểm tra xem bảng product đã tồn tại chưa
            const productTableExists = await queryRunner.hasTable('product');
            if (!productTableExists) {
                // Tạo bảng product nếu chưa tồn tại
                await queryRunner.createTable(
                    new Table({
                        name: 'product',
                        columns: [
                            {
                                name: 'id',
                                type: 'uuid',
                                isPrimary: true,
                                default: 'uuid_generate_v4()',
                            },
                            // Thêm các cột khác của bảng product nếu cần
                            {
                                name: 'name',
                                type: 'varchar',
                                length: '255',
                                isNullable: false,
                            },
                            {
                                name: 'description',
                                type: 'text',
                                isNullable: true,
                            },
                            {
                                name: 'price',
                                type: 'decimal',
                                precision: 10,
                                scale: 2,
                                default: 0,
                            },
                            {
                                name: 'createdAt',
                                type: 'timestamp',
                                default: 'CURRENT_TIMESTAMP',
                            },
                            {
                                name: 'updatedAt',
                                type: 'timestamp',
                                default: 'CURRENT_TIMESTAMP',
                            },
                        ],
                    }),
                );
            }

            // Thêm cột categoryId vào bảng product nếu bảng product đã tồn tại
            const productTable = await queryRunner.getTable('product');
            if (productTable) {
                const hasCategoryIdColumn = productTable.columns.some(
                    (column) => column.name === 'categoryId',
                );
                if (!hasCategoryIdColumn) {
                    await queryRunner.addColumn(
                        'product',
                        new TableColumn({
                            name: 'categoryId',
                            type: 'uuid',
                            isNullable: true,
                        }),
                    );

                    await queryRunner.createForeignKey(
                        'product',
                        new TableForeignKey({
                            columnNames: ['categoryId'],
                            referencedColumnNames: ['id'],
                            referencedTableName: 'product_category',
                            onDelete: 'SET NULL',
                        }),
                    );
                }
            }
        } catch (error) {
            console.error('Migration failed:', error);
            throw error; // Đảm bảo lỗi được ném ra để TypeORM biết migration thất bại
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Xóa foreign key từ bảng product nếu có
        const productTable = await queryRunner.getTable('product');
        if (productTable) {
            const foreignKey = productTable.foreignKeys.find(
                (fk) => fk.columnNames.indexOf('categoryId') !== -1,
            );
            if (foreignKey) {
                await queryRunner.dropForeignKey('product', foreignKey);
            }
            await queryRunner.dropColumn('product', 'categoryId');
        }

        // Xóa bảng product_category
        await queryRunner.dropTable('product_category');
    }
}

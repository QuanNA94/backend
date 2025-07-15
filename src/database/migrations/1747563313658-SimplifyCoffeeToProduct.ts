import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export class SimplifyCoffeeToProduct1747563313658
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            const coffeeOrderExists =
                await queryRunner.hasTable('coffee_order');

            if (coffeeOrderExists) {
                // 1. Thêm cột productId vào coffee_order
                const coffeeOrderTable =
                    await queryRunner.getTable('coffee_order');
                const hasProductIdColumn = coffeeOrderTable.columns.some(
                    (column) => column.name === 'productId',
                );

                if (!hasProductIdColumn) {
                    await queryRunner.addColumn(
                        'coffee_order',
                        new TableColumn({
                            name: 'productId',
                            type: 'uuid',
                            isNullable: true,
                        }),
                    );

                    // Thêm foreign key cho productId
                    await queryRunner.createForeignKey(
                        'coffee_order',
                        new TableForeignKey({
                            columnNames: ['productId'],
                            referencedColumnNames: ['id'],
                            referencedTableName: 'product',
                            onDelete: 'SET NULL',
                        }),
                    );
                }

                // 2. Đổi tên bảng coffee_order thành product_order
                await queryRunner.renameTable('coffee_order', 'product_order');

                // 3. Xóa cột coffeeId và foreign key liên quan
                const productOderTable =
                    await queryRunner.getTable('product_order');
                const foreignKeys = productOderTable.foreignKeys || [];

                for (const foreignKey of foreignKeys) {
                    if (foreignKey.columnNames.includes('coffeeId')) {
                        await queryRunner.dropForeignKey(
                            'product_order',
                            foreignKey,
                        );
                    }
                }

                await queryRunner.dropColumn('product_order', 'coffeeId');
            }

            // 4. Xóa bảng coffee nếu tồn tại
            const coffeeExists = await queryRunner.hasTable('coffee');
            if (coffeeExists) {
                await queryRunner.dropTable('coffee');
            }
        } catch (error) {
            console.error('Failed to simplify coffee to product:', error);
            throw error;
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        try {
            // 1. Tạo lại bảng coffee
            const coffeeExists = await queryRunner.hasTable('coffee');
            if (!coffeeExists) {
                await queryRunner.query(`
                    CREATE TABLE coffee(
                        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                        name VARCHAR NOT NULL,
                        description TEXT,
                        price DECIMAL(10, 2) NOT NULL,
                        stock INTEGER NOT NULL DEFAULT 0
                        )`);
            }

            // 2. Kiểm tra xem bảng product_order có tồn tại không
            const productOrderExists =
                await queryRunner.hasTable('product_order');
            if (productOrderExists) {
                // Đổi tên bảng product_order thành coffee_order
                await queryRunner.renameTable('product_order', 'coffee_order');

                // Thêm cột coffeeId
                await queryRunner.addColumn(
                    'coffee_order',
                    new TableColumn({
                        name: 'coffeeId',
                        type: 'uuid',
                        isNullable: true,
                    }),
                );

                // Thêm foreign key cho coffeeId
                await queryRunner.createForeignKey(
                    'coffee_order',
                    new TableForeignKey({
                        columnNames: ['coffeeId'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'coffee',
                        onDelete: 'SET NULL',
                    }),
                );
            }
        } catch (error) {
            console.error('Failed to revert coffee to product:', error);
            throw error;
        }
    }
}

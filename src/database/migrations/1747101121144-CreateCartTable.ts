import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class CreateCartTable1747101121144 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'cart',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'userId',
                        type: 'uuid',
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

        // Tạo foreign key
        await queryRunner.createForeignKey(
            'cart',
            new TableForeignKey({
                columnNames: ['userId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE',
            }),
        );

        // Tạo bảng cart_item
        await queryRunner.createTable(
            new Table({
                name: 'cart_item',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'cartId',
                        type: 'uuid',
                    },
                    {
                        name: 'productId',
                        type: 'uuid',
                    },
                    {
                        name: 'quantity',
                        type: 'int',
                        default: 1,
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

        // Tạo foreign keys cho cart_item
        await queryRunner.createForeignKey(
            'cart_item',
            new TableForeignKey({
                columnNames: ['cartId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'cart',
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'cart_item',
            new TableForeignKey({
                columnNames: ['productId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'product',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Xóa các foreign keys trước
        const cartItemTable = await queryRunner.getTable('cart_item');
        const cartItemForeignKeys = cartItemTable?.foreignKeys || [];
        for (const foreignKey of cartItemForeignKeys) {
            await queryRunner.dropForeignKey('cart_item', foreignKey);
        }

        const cartTable = await queryRunner.getTable('cart');
        const cartForeignKeys = cartTable?.foreignKeys || [];
        for (const foreignKey of cartForeignKeys) {
            await queryRunner.dropForeignKey('cart', foreignKey);
        }

        // Xóa các bảng
        await queryRunner.dropTable('cart_item');
        await queryRunner.dropTable('cart');
    }
}

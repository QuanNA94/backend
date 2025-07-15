import { UserRole } from '../../domain/enums/roles.enum';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoleToUser1742918489522 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Bước 1: Kiểm tra xem cột "role" đã tồn tại chưa
        const hasRoleColumn = await queryRunner.hasColumn('user', 'role');

        if (!hasRoleColumn) {
            // Nếu cột chưa tồn tại, thêm cột mới
            await queryRunner.query(
                `ALTER TABLE "user" ADD COLUMN "role" varchar`,
            );
        }

        // Bước 2: Cập nhật tất cả các bản ghi hiện có với giá trị mặc định
        await queryRunner.query(
            `UPDATE "user" SET "role" = '${UserRole.USER}' WHERE "role" IS NULL OR "role" = ''`,
        );

        // Bước 3: Thay đổi cột role thành NOT NULL
        await queryRunner.query(
            `ALTER TABLE "user" ALTER COLUMN "role" SET NOT NULL`,
        );

        // Bước 4: Thêm ràng buộc CHECK để đảm bảo giá trị hợp lệ
        await queryRunner.query(
            `ALTER TABLE "user" ADD CONSTRAINT "check_valid_role" CHECK ("role" IN ('${UserRole.ADMIN}', '${UserRole.USER}', '${UserRole.GUEST}'))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Xóa ràng buộc CHECK
        await queryRunner.query(
            `ALTER TABLE "user" DROP CONSTRAINT "check_valid_role"`,
        );

        // Cho phép NULL trở lại
        await queryRunner.query(
            `ALTER TABLE "user" ALTER COLUMN "role" DROP NOT NULL`,
        );
    }
}

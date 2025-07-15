import { UserRole } from '../../domain/enums/roles.enum';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserRoleColumn1742919458389 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Tạo enum type nếu chưa tồn tại
        await queryRunner.query(`
            DO $$ BEGIN
                CREATE TYPE "public"."user_role_enum" AS ENUM('${UserRole.ADMIN}', '${UserRole.USER}', '${UserRole.GUEST}');
            EXCEPTION
                WHEN duplicate_object THEN null;
            END $$;
        `);

        // Thêm cột role nếu chưa tồn tại
        await queryRunner.query(`
            DO $$ BEGIN
                ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "role" "public"."user_role_enum";
            EXCEPTION
                WHEN duplicate_column THEN null;
            END $$;
        `);

        // Cập nhật giá trị mặc định cho các bản ghi có role là NULL
        await queryRunner.query(`
            UPDATE "user" SET "role" = '${UserRole.USER}' WHERE "role" IS NULL;
        `);

        // Đặt cột role thành NOT NULL
        await queryRunner.query(`
            ALTER TABLE "user" ALTER COLUMN "role" SET NOT NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Cho phép NULL trở lại
        await queryRunner.query(`
            ALTER TABLE "user" ALTER COLUMN "role" DROP NOT NULL;
        `);

        // Xóa enum type
        await queryRunner.query(`
            DROP TYPE IF EXISTS "public"."user_role_enum";
        `);
    }
}

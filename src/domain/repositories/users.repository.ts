import { Repository } from 'typeorm';
import { User } from '../../database/core/user.entity';

export const USER_REPOSITORY = 'USER_REPOSITORY'; //for register injection tokens

export class UsersRepository extends Repository<User> {
    async getByName(username: string): Promise<User | null> {
        return this.findOne({ where: { username } });
    }

    async getAllUser(): Promise<User[]> {
        return this.find(); // Phương thức này trả về tất cả người dùng từ cơ sở dữ liệu
    }
}

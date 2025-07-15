import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    GUEST = 'guest',
}

registerEnumType(UserRole, {
    name: 'UserRole', // Tên này sẽ được sử dụng trong schema GraphQL
});

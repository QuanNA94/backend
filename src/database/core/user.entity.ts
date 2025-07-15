import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../database/core/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../../domain/enums/roles.enum';

@ObjectType() // Cần cho GraphQL
@Entity() // Cần cho TypeORM
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    username: string;

    @Field()
    @Column({ unique: true })
    email: string;

    @Field()
    @Column()
    password: string;

    @Field()
    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Field()
    @Column({ nullable: true })
    resetToken: string;

    @Field(() => UserRole)
    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    role: UserRole;

    // @Field({ nullable: true }) // Để trường này có thể nullable nếu không có giá trị
    // @Column({ type: 'varchar', nullable: true }) // Cho phép null
    // avatar_url: string;
}

import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../database/core/base.entity';
import { Column, Entity } from 'typeorm';

@ObjectType() // Cần cho GraphQL
@Entity() // Cần cho TypeORM
export class User extends BaseEntity {
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

    // @Field({ nullable: true }) // Để trường này có thể nullable nếu không có giá trị
    // @Column({ type: 'varchar', nullable: true }) // Cho phép null
    // avatar_url: string;
}

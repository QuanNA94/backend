import { Field, ID } from '@nestjs/graphql';
import {
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Field()
    @CreateDateColumn({ type: 'timestamptz' })
    readonly createdAt!: Date;

    @Field()
    @UpdateDateColumn({ type: 'timestamptz' })
    readonly updatedAt!: Date;

    @Field()
    @DeleteDateColumn({ type: 'timestamptz' })
    deletedAt!: Date;
}

import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/database/core/base.entity';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity()
export class Product extends BaseEntity {
    @Field()
    @Column({ name: 'product_name' })
    name: string;

    @Field()
    @Column({ nullable: true })
    imgUrl?: string;

    @Field()
    @Column('decimal')
    price: number;

    @Field()
    @Column('decimal', { nullable: true })
    discount?: number;

    @Field()
    @Column('int')
    rating: number;

    @Field()
    @Column('int')
    reviewsCount: number;
}

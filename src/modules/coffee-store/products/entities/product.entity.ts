import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../../database/core/base.entity';
import { ProductCategory } from './product-category.entity';

@ObjectType()
@Entity()
export class Product extends BaseEntity {
    @Field()
    @Column('uuid')
    id: string;

    @Field()
    @Column({ name: 'product_name' })
    name: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    imgUrl?: string;

    @Field(() => Float)
    @Column('decimal')
    price: number;

    @Field(() => Float, { nullable: true })
    @Column('decimal', { nullable: true })
    discount?: number;

    @Field(() => Int, { nullable: true })
    @Column('int', { nullable: true })
    rating: number;

    @Field(() => Int, { nullable: true })
    @Column('int', { nullable: true })
    reviewsCount: number;

    @Field(() => String, { nullable: true })
    @Column('decimal', { nullable: true })
    description?: string;

    @Field(() => Float, { nullable: true })
    @Column('decimal', { nullable: true })
    quantity?: number;

    @Field(() => String, { nullable: true })
    @Column('uuid', { nullable: true })
    categoryId?: string;

    @Field(() => Boolean, { defaultValue: false })
    @Column({ default: false })
    isFeatured: boolean;

    @Field(() => Int, { defaultValue: 0 })
    @Column({ default: 0 })
    salesCount: number;

    // Thêm mối quan hệ ManyToOne
    @Field(() => ProductCategory, { nullable: true })
    @ManyToOne(() => ProductCategory, (category) => category.products, {
        nullable: true,
    })
    @JoinColumn({ name: 'categoryId' })
    category?: ProductCategory;
}

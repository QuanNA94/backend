import { Field, ObjectType } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { User } from '@/database/core/user.entity';

@ObjectType()
@Entity()
export class ProductFavorite {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column('uuid')
    productId: string;

    @Field()
    @Column('uuid')
    userId: string;

    @Field()
    @Column({ type: 'boolean', default: true })
    isFavorite: boolean;

    @Field(() => Date)
    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'productId' })
    product: Product;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;
}

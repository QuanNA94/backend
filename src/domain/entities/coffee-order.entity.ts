import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Coffee } from '../../coffee/entities/coffee.entity';
import { User } from '../../database/core/user.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class CoffeeOrder {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => User)
    @ManyToOne(() => User)
    user: User;

    @Field(() => Coffee)
    @ManyToOne(() => Coffee)
    coffee: Coffee;

    @Field()
    @Column()
    quantity: number;

    @Field()
    @Column()
    totalPrice: number;

    @Field()
    @Column()
    createdAt: Date;
}

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCoffeeOrderInput {
    @Field(() => String)
    userId: string;

    @Field(() => Number)
    coffeeId: number;

    @Field(() => Number)
    quantity: number;
}

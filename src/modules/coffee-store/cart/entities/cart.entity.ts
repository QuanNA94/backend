import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Cart {
    @Field(() => Int, { description: 'Example field (placeholder)' })
    exampleField: number;
}

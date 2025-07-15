import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaymentVerificationResponse {
    @Field()
    success: boolean;

    @Field()
    resultCode: number;

    @Field()
    message: string;
}

import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaymentVerificationResponse } from './dto/payment-verification.dto';
import { PaymentService } from './payment.service';

@Resolver('Payment')
export class PaymentResolver {
    constructor(private readonly paymentService: PaymentService) {}

    @Query(() => PaymentVerificationResponse)
    async verifyMomoPayment(
        @Args('orderId') orderId: string,
    ): Promise<PaymentVerificationResponse> {
        return this.paymentService.verifyMomoPayment(orderId);
    }
}

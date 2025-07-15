import { Injectable } from '@nestjs/common';
import { PaymentVerificationResponse } from './dto/payment-verification.dto';

@Injectable()
export class PaymentService {
    async verifyMomoPayment(
        orderId: string,
    ): Promise<PaymentVerificationResponse> {
        try {
            const response = await fetch(
                'https://test-payment.momo.vn/v2/gateway/api/query',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        partnerCode: process.env.MOMO_PARTNER_CODE,
                        accessKey: process.env.MOMO_ACCESS_KEY,
                        requestId: Date.now().toString(),
                        orderId: orderId,
                        lang: 'vi',
                    }),
                },
            );

            const data = await response.json();
            return {
                success: data.resultCode === 0,
                resultCode: data.resultCode,
                message: data.message,
            };
        } catch (error) {
            console.error('MOMO verification error:', error);
            return {
                success: false,
                resultCode: -1,
                message: 'Payment verification failed',
            };
        }
    }
}

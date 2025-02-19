import { BalanceStatus, PaymentMethod } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePaymentDto {
    @IsNotEmpty()
    @IsNumber()
    sum: number;

    @IsNotEmpty()
    @IsEnum(BalanceStatus)
    status: BalanceStatus;

    @IsNotEmpty()
    @IsEnum(PaymentMethod)
    paymentMethod: PaymentMethod;
}

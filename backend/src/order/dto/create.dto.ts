import { DeliveryType, PaymentMethod } from '@prisma/client';
import {
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';

export class CreateOrderDto {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    userId: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    itemId: string;

    @IsNotEmpty()
    @IsEnum(PaymentMethod)
    paymentMethod: PaymentMethod;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsOptional()
    @IsEnum(DeliveryType)
    deliveryType: DeliveryType;
}

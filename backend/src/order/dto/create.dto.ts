import { DeliveryType, OrderStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
    @IsString()
    userId: string;

    @IsString()
    itemId: string;

    @IsOptional()
    @IsEnum(DeliveryType)
    deliveryType: DeliveryType;

    @IsOptional()
    @IsEnum(OrderStatus)
    status: OrderStatus;
}

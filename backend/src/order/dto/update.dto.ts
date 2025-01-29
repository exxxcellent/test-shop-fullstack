import { OrderStatus } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateOrderDto {
    @IsOptional()
    @IsEnum(OrderStatus)
    status: OrderStatus;
}

import { DeliveryType, OrderStatus } from '@shared/types';

export interface Order {
    id: string;
    userId: string;
    itemId: string;
    deliveryType: DeliveryType;
    status: OrderStatus;
    createdAt: Date;
    sum: number;
    address: string;
    message: string | null;
}

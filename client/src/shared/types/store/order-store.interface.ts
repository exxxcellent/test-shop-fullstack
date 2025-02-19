import { Order } from '@entities/order';
import { ApiResponse } from '../api/api-response.interface';
import { BalancePaymentMethod } from '../enums/balance-payment_method.enum';
import { OrderStatus } from '../enums/order-status.enum';

export interface CreateOrderBody {
    userId: string;
    itemId: string;
    address: string;
    paymentMethod: BalancePaymentMethod | null;
    status?: OrderStatus;
}

export interface OrdersStore {
    orders: Order[];
    getOrderById: (id: string) => Promise<ApiResponse<Order> | null>;
    getOrdersByUserId: (userId: string) => void;
    create: (body: CreateOrderBody) => Promise<ApiResponse<Order> | null>;
    payOrder: (id: string) => Promise<ApiResponse<Order> | null>;
}

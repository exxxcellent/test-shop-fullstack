import api from '@config/axios';
import { Order } from '@entities/order';
import { ApiResponse, OrdersStore } from '@shared/types';
import { create } from 'zustand';

export const useOrderStore = create<OrdersStore>((set) => ({
    orders: [],
    getOrderById: async (id) => {
        try {
            const response = await api.get<ApiResponse<Order>>(`/order/${id}/`);
            return response.data;
        } catch (e) {
            console.error(e);
            return null;
        }
    },
    getOrdersByUserId: async (userId) => {
        try {
            const response = await api.get<ApiResponse<Order[]>>(
                `/order/${userId}/orders`
            );
            const { data } = response.data;
            set(() => ({
                orders: [...data],
            }));
        } catch (e) {
            console.error(e);
            return null;
        }
    },
    create: async (body) => {
        try {
            const response = await api.post<ApiResponse<Order>>(`/order/`, {
                ...body,
            });
            const { data } = response.data;
            set((state) => ({
                orders: [...state.orders, data],
            }));
            return response.data;
        } catch (e) {
            console.error(e);
            return null;
        }
    },
    payOrder: async (id) => {
        try {
            const response = await api.post<ApiResponse<Order>>(
                `/order/${id}/pay`
            );
            return response.data;
        } catch (e) {
            console.error(e);
            return null;
        }
    },
}));

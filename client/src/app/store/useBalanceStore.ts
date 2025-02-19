import { create } from 'zustand';
import { ApiResponse, BalanceStatus, BalanceStore } from '@shared/types';
import api from '@config/axios';
import { Balance } from '@entities/balance';
import { User } from '@entities/user';

export const useBalanceStore = create<BalanceStore>((set) => ({
    payments: [],
    getBalanceHistoryByUserId: async (userId) => {
        const response = await api.get<ApiResponse<Balance[]>>(
            `/payment/${userId}`
        );
        const { data } = response.data;
        set(() => ({
            payments: [...data.reverse()],
        }));
    },
    fillBalance: async (userId, sum, paymentMethod) => {
        const response = await api.post<
            ApiResponse<{
                user: User;
                payment: Balance;
            }>
        >(`/payment/${userId}`, {
            sum,
            paymentMethod,
            status: BalanceStatus.REFILL,
        });
        const { data } = response.data;
        set((state) => ({
            payments: [...state.payments, data.payment],
        }));
        return data;
    },
}));

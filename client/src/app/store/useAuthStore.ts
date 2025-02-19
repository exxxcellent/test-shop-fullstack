import api from '@config/axios';
import { User } from '@entities/user';
import { ApiResponse, AuthResponseLogin, AuthStore } from '@shared/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            isAuth: false,
            user: null,
            accessToken: null,
            setAuth: (response) => {
                set({
                    isAuth: true,
                    user: response?.data.user,
                    accessToken: response?.data.accessToken,
                });
            },
            login: async (email) => {
                try {
                    const response = await api.post<
                        ApiResponse<AuthResponseLogin>
                    >('/auth/login', {
                        email,
                    });
                    set(() => ({
                        user: response.data.data.user,
                        accessToken: response.data.data.accessToken,
                    }));
                    return response.data;
                } catch (e) {
                    console.error(e);
                    return null;
                }
            },
            refresh: async () => {
                try {
                    const response = await api.get<ApiResponse<string>>(
                        '/auth/refresh',
                        {}
                    );
                    return response.data;
                } catch (e) {
                    console.error(e);
                    return null;
                }
            },
            logout: async () => {
                try {
                    await api.get<ApiResponse<null>>('/auth/logout');
                    set({
                        isAuth: false,
                        user: null,
                        accessToken: null,
                    });
                } catch (e) {
                    console.error(e);
                }
            },
            getById: async (id: string) => {
                try {
                    const response = await api.get<ApiResponse<User>>(
                        `/user/${id}`
                    );
                    return response.data;
                } catch (e) {
                    console.error(e);
                    return null;
                }
            },
            setUser: (user) => {
                set({
                    user,
                });
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                accessToken: state.accessToken,
                isAuth: state.isAuth,
                user: state.user,
            }),
        }
    )
);

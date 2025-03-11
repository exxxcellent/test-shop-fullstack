import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.scss';
import App from './App';
import Layout from './app/layouts/dashboard';
import DashboardPage from '@pages/home';
import CategoriesPage from '@pages/category/categories';
import CategoryPage from '@pages/category/category';
import ItemsPage from '@pages/items/items';
import ItemPage from '@pages/items/item';
import UserPage from '@pages/users/user';
import UsersPage from '@pages/users/users';
import OrdersPage from '@pages/orders/orders';
import OrderPage from '@pages/orders/order';
import AuthPage from '@pages/auth/auth';

const router = createBrowserRouter([
    {
        Component: App,
        children: [
            {
                path: '/',
                Component: Layout,
                children: [
                    {
                        path: '',
                        Component: DashboardPage,
                    },
                    {
                        path: 'auth',
                        Component: AuthPage,
                    },

                    {
                        path: 'users',
                        Component: UsersPage,
                        children: [
                            {
                                path: ':id',
                                Component: UserPage,
                            },
                        ],
                    },
                    {
                        path: 'categories',
                        Component: CategoriesPage,
                        children: [
                            {
                                path: ':id',
                                Component: CategoryPage,
                            },
                        ],
                    },
                    {
                        path: 'items',
                        Component: ItemsPage,
                        children: [
                            {
                                path: ':id',
                                Component: ItemPage,
                            },
                        ],
                    },
                    {
                        path: 'orders',
                        Component: OrdersPage,
                        children: [
                            {
                                path: ':id',
                                Component: OrderPage,
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 3,
        },
    },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </StrictMode>,
);

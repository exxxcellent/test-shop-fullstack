import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { Route, Routes } from 'react-router';
import type { Navigation } from '@toolpad/core';
import Layout from './app/layouts/dashboard';
import DashboardPage from '@pages/home';
import CategoriesPage from '@pages/category/categories';
import CategoryPage from '@pages/category/category';
import ItemsPage from '@pages/items/items';
import ItemPage from '@pages/items/item';
import UsersPage from '@pages/users/users';
import UserPage from '@pages/users/user';
import OrdersPage from '@pages/orders/orders';
import OrderPage from '@pages/orders/order';
import AuthPage from '@pages/auth/auth';

const NAVIGATION: Navigation = [
    {
        kind: 'header',
        title: 'Main',
    },
    {
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Entities',
    },
    {
        segment: 'items',
        title: 'Items',
        icon: <CategoryIcon />,
    },
    {
        segment: 'categories',
        title: 'Categories',
        icon: <CategoryIcon />,
    },
    {
        segment: 'orders',
        title: 'Orders',
        icon: <LocalShippingIcon />,
    },
    {
        segment: 'users',
        title: 'Users',
        icon: <PersonIcon />,
    },
];

const BRANDING = {
    title: 'Admin Panel Test-Shop',
};

export default function App() {
    return (
        <ReactRouterAppProvider
            navigation={NAVIGATION}
            branding={BRANDING}>
            <Routes>
                <Route
                    path="/*"
                    element={<Layout />}>
                    <Route
                        index
                        element={<DashboardPage />}
                    />
                    <Route
                        path="items"
                        element={<ItemsPage />}
                    />
                    <Route
                        path="items/:id"
                        element={<ItemPage />}
                    />
                    <Route
                        path="categories"
                        element={<CategoriesPage />}
                    />
                    <Route
                        path="categories/:id"
                        element={<CategoryPage />}
                    />
                    <Route
                        path="orders"
                        element={<OrdersPage />}
                    />
                    <Route
                        path="orders/:id"
                        element={<OrderPage />}
                    />
                    <Route
                        path="users"
                        element={<UsersPage />}
                    />
                    <Route
                        path="users/:id"
                        element={<UserPage />}
                    />
                </Route>
                <Route
                    path="auth"
                    element={<AuthPage />}
                />
            </Routes>
        </ReactRouterAppProvider>
    );
}

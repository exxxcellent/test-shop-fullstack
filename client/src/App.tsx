import LoginPage from '@pages/auth/login';
import MailActivationPage from '@pages/auth/mail-activation';
import OrderCreateUnauthorizedPage from '@pages/order/order-created-unauthorized';
import SignInPage from '@pages/auth/sign-in';
import CategoryPage from '@pages/category';
import HomePage from '@pages/home';
import ItemPage from '@pages/item';
import OrderCreatePage from '@pages/order/create';
import OrderStatusPage from '@pages/order/order-status';
import BalancePage from '@pages/profile/balance';
import FillBalancePage from '@pages/profile/fill-balance';
import ProfilePage from '@pages/profile/profile';
import { Route, Routes } from 'react-router';

export default function App() {
    return (
        <div className="flex flex-col min-h-screen gap-[10px] xl:w-3/5 xl:mx-auto">
            <Routes>
                <Route
                    path="/"
                    element={<HomePage />}
                />
                <Route
                    path="/category/:category"
                    element={<CategoryPage />}
                />
                <Route
                    path="/category/:category/product/:itemId"
                    element={<ItemPage />}
                />
                <Route
                    path="/auth/sign-in/"
                    element={<SignInPage />}
                />
                <Route
                    path="/auth/mail-activation/"
                    element={<MailActivationPage />}
                />
                <Route
                    path="/auth/order-created-unauthorized/"
                    element={<OrderCreateUnauthorizedPage />}
                />
                <Route
                    path="/auth/login/"
                    element={<LoginPage />}
                />
                <Route
                    path="/profile"
                    element={<ProfilePage />}
                />
                <Route
                    path="/profile/balance"
                    element={<BalancePage />}
                />
                <Route
                    path="/profile/balance/fill"
                    element={<FillBalancePage />}
                />
                <Route
                    path="/order/create/:itemId"
                    element={<OrderCreatePage />}
                />
                <Route
                    path="/order/:orderId"
                    element={<OrderStatusPage />}
                />
            </Routes>
        </div>
    );
}

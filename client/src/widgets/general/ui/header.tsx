import { Link, useLocation, useNavigate } from 'react-router';
import userProfile from '@icons/user.svg';
import { useAuthStore } from '@store/useAuthStore';
import { Button } from '@shared/ui';

export default function Header() {
    const store = useAuthStore((state) => state);

    const location = useLocation();
    const router = useNavigate();

    const onLogoutHandler = () => {
        store.logout();
        router('/auth/sign-in');
    };

    return (
        <header className="h-[70px] border-b-[0.2px] border-[#999] flex items-center justify-between px-4">
            <h1 className="text-base font-bold text-text-secondary">
                <Link to="/">Logo</Link>
            </h1>
            <div className="w-1/3 h-2/3">
                {!store.isAuth && (
                    <Button
                        title="Войти"
                        variant="secondary"
                        size="md"
                        to="/auth/sign-in"
                    />
                )}
                {Boolean(
                    location.pathname === '/profile' ||
                        location.pathname === '/profile/balance'
                ) &&
                    store.isAuth && (
                        <Button
                            title="Выйти"
                            variant="secondary"
                            size="md"
                            onClick={onLogoutHandler}
                        />
                    )}
            </div>
            {!Boolean(
                location.pathname === '/profile' ||
                    location.pathname === '/profile/balance'
            ) &&
                store.isAuth && (
                    <Link to="/profile">
                        <img src={userProfile} />
                    </Link>
                )}
        </header>
    );
}

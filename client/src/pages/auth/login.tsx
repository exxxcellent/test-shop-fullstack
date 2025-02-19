import { useAuthStore } from '@store/useAuthStore';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

export default function LoginPage() {
    const { getById, setAuth, login } = useAuthStore((state) => state);

    const [searchParams] = useSearchParams();
    const router = useNavigate();

    useEffect(() => {
        const loginUser = async () => {
            const id = searchParams.get('id');
            if (!id) {
                return router('/?err=id');
            }
            const user = await getById(id);
            if (!user) {
                return router('/?err=user');
            }
            const loginUser = await login(user.data.email);
            if (!loginUser) return;
            setAuth(loginUser);
            router('/profile');
        };

        loginUser();
    }, []);

    return <></>;
}

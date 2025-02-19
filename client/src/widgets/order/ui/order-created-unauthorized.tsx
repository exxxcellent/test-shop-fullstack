import { useNavigate } from 'react-router';
import mailbox from '@icons/mailbox.svg';
import { useEffect } from 'react';
import { useAuthStore } from '@store/useAuthStore';
import { Button } from '@shared/ui';

export default function OrderCreateUnauthorized() {
    const { isAuth } = useAuthStore((state) => state);

    const router = useNavigate();

    useEffect(() => {
        if (isAuth) router('/profile');
    });

    return (
        <div className="p-4 flex flex-col items-center justify-center gap-5">
            <img src={mailbox} />
            <p className="text-2xl font-semibold text-text-secondary text-center">
                Чтобы просматривать свои заказы, необходимо авторизоваться.
                Ссылка для входа отправлена на вашу введеную почту. Перейдите по
                ссылке и вернитесь на эту страницу.
            </p>
            <div className="flex flex-col gap-3 items-center justify-center">
                <Button
                    title="На главную"
                    to="/"
                />
                <p className="text-xs text-text-tertiary text-center">
                    Продолжая, Вы принимаете{' '}
                    <a
                        href="#"
                        className="underline focus:text-accent-primary outline-none">
                        Пользовательское соглашение
                    </a>{' '}
                    и{' '}
                    <a
                        href="#"
                        className="underline focus:text-accent-primary outline-none">
                        Политику конфиденциальности
                    </a>
                </p>
            </div>
        </div>
    );
}

import { Link, NavLink } from 'react-router';

export default function Footer() {
    return (
        <footer className="flex flex-col gap-5 p-4">
            <div className="flex gap-3 text-xs">
                <Link
                    to="/"
                    className="text-accent-primary underline">
                    Главная
                </Link>
                <Link
                    to="#"
                    className="text-accent-primary underline">
                    Поддержка
                </Link>
            </div>
            <div className="flex flex-col gap-3 text-xs text-text-placeholder">
                <div>
                    Все права принадлежат их правообладателям. <br />
                    All rights belong to their copyright holders.
                </div>
                <div>
                    Roval Services Limited, BRN 77166635 <br />
                    7/F, MW Tower, 111 Bonham Strand, Sheung Wan, Hong Kong
                </div>
                <div>
                    <NavLink to="#">Пользовательское соглашение</NavLink>
                    <br />
                    <NavLink to="#">Политика конфиденциальности</NavLink>
                </div>
            </div>
        </footer>
    );
}

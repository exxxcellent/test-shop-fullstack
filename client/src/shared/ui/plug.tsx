import sad from '@icons/sad.svg';
import { Link } from 'react-router';

export default function Plug() {
    return (
        <div className="flex flex-col gap-3 items-center justify-center">
            <img
                src={sad}
                className="w-24 h-24"
            />
            <div className="text-xl text-center">
                <p>Пока ничего нет :(</p>
                <Link
                    to="/"
                    className="underline text-accent-primary outline-none">
                    На главную
                </Link>
            </div>
        </div>
    );
}

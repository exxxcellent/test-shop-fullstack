import { Link } from 'react-router';

interface LinkProps {
    to: string;
    children: React.ReactNode;
}

export default function NavLink({ children, to }: LinkProps) {
    return (
        <Link
            to={to}
            className="underline focus:text-accent-primary hover:text-accent-primary duration-200 outline-none">
            {children}
        </Link>
    );
}

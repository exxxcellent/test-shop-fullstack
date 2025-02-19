import { useNavigate } from 'react-router';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    variant?: 'primary' | 'secondary';
    size?: 'md' | 'lg';
    to?: string;
    isLoading?: boolean;
}

export default function Button({
    title,
    leftIcon = false,
    rightIcon = false,
    onClick,
    variant = 'primary',
    disabled = false,
    size = 'lg',
    to,
    type = 'button',
    isLoading = false,
}: ButtonProps) {
    const router = useNavigate();
    const variants = {
        primary:
            'bg-accent-primary hover:bg-accent-secondary focus:bg-accent-secondary text-white disabled:bg-accent-disabled disabled:text-text-disabled-primary',
        secondary:
            'bg-white hover:bg-gray-tertiary focus:bg-gray-tertiary border-2 border-gray-tertiary text-text-secondary disabled:text-text-disabled-secondary',
    };

    const sizes = {
        md: 'text-base p-3 rounded-[12px]',
        lg: 'text-lg p-5 rounded-[20px]',
    };

    const className =
        'w-full flex items-center justify-center gap-2 text-lg text-nowrap disabled:cursor-not-allowed duration-150 outline-none';

    const onClickHandler = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        if (onClick) onClick(event);
        if (to) router(to);
    };

    return (
        <button
            type={type}
            className={twMerge(className, variants[variant], sizes[size])}
            onClick={onClickHandler}
            disabled={disabled}>
            {leftIcon && <div className="w-5 h-5">{leftIcon}</div>}
            <div>{title}</div>
            {rightIcon && <div className="w-5 h-5">{rightIcon}</div>}
            {isLoading && <div className="loader btn primary"></div>}
        </button>
    );
}

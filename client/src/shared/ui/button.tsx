import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    variant?: 'primary' | 'secondary';
    size?: 'md' | 'lg';
}

export default function Button({
    title,
    leftIcon = false,
    rightIcon = false,
    onClick,
    variant = 'primary',
    disabled = false,
    size = 'lg',
}: ButtonProps) {
    const variants = {
        primary:
            'bg-accent-primary hover:bg-accent-secondary text-white disabled:bg-accent-disabled disabled:text-text-disabled',
        secondary:
            'bg-white hover:bg-gray-tertiary border-2 border-gray-tertiary text-text-secondary disabled:text-text-disabled-secondary',
    };

    const sizes = {
        md: 'text-base',
        lg: 'text-lg',
    };

    const className =
        'w-full p-5 flex items-center justify-center gap-2 rounded-[20px] text-lg text-nowrap disabled:cursor-not-allowed duration-150';

    return (
        <button
            className={twMerge(className, variants[variant])}
            onClick={onClick}
            disabled={disabled}>
            {leftIcon && <div className="w-5 h-5">{leftIcon}</div>}
            <div className={sizes[size]}>{title}</div>
            {rightIcon && <div className="w-5 h-5">{rightIcon}</div>}
        </button>
    );
}

import { forwardRef, useId } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
    rightIcon?: React.ReactNode;
    dimension?: 'md' | 'lg';
    errorLabel?: string;
    iconType?: 'icon' | 'logo';
    register?: UseFormRegisterReturn;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            type = 'text',
            disabled = false,
            dimension = 'lg',
            rightIcon,
            error = false,
            errorLabel,
            placeholder = '',
            iconType = 'icon',
            register,
            ...rest
        },
        ref
    ) => {
        const id = useId();

        const className =
            'flex bg-gray-tertiary items-center border-2 border-transparent focus-within:border-accent-primary duration-200 w-full py-2';

        const dimensions = {
            md: 'rounded-xl',
            lg: 'rounded-[20px]',
        };

        const icon = {
            icon: 'w-9 h-9',
            logo: 'h-9',
        };

        return (
            <div className="w-full">
                <div
                    className={twMerge(
                        className,
                        dimensions[dimension],
                        error &&
                            'flex-col items-start gap-0 bg-error-secondary focus-within:border-error-primary'
                    )}>
                    {error && errorLabel && (
                        <label
                            className="text-xs text-error-primary px-5"
                            htmlFor={id}>
                            {errorLabel}
                        </label>
                    )}
                    <div className="flex items-center w-full pe-5">
                        <input
                            {...register} // передаем регистратор
                            ref={ref} // передаем реф
                            type={type}
                            disabled={disabled}
                            id={id}
                            placeholder={placeholder}
                            className={twMerge(
                                'outline-none bg-transparent px-5 w-full h-9 placeholder:text-text-placeholder text-text-secondary',
                                error && 'placeholder:text-text-secondary'
                            )}
                            {...rest} // передаем остальные пропсы
                        />
                        {rightIcon && (
                            <div
                                className={twMerge(
                                    icon[iconType],
                                    'flex items-center justify-center'
                                )}>
                                {rightIcon}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
);

export default Input;

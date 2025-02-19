import { twMerge } from 'tailwind-merge';
import informationCircle from '@icons/information-circle.svg';
import React from 'react';
import parseMessage from '../utils/message-parser';

interface AlertProps {
    children: React.ReactNode;
    variant: 'info' | 'error';
}

export default function Alert({ children, variant }: AlertProps) {
    const varinats = {
        info: 'bg-accent-primary/10 border-accent-primary text-text-secondary',
        error: 'bg-error-primary/10 border-error-primary text-error-primary',
    };

    return (
        <div
            className={twMerge(
                'flex gap-[10px] border rounded-[20px] py-[29px] px-[26px] ',
                varinats[variant]
            )}>
            {variant === 'info' && (
                <img
                    src={informationCircle}
                    alt="info"
                    className="w-6 h-6"
                />
            )}
            <p>{parseMessage(children)}</p>
        </div>
    );
}

import sbp_sm from '@icons/sbp_sm.svg';
import visa from '@icons/visa.svg';
import ya_pay from '@icons/ya_pay.svg';
import mir from '@icons/mir.svg';
import { BalancePaymentMethod } from '@shared/types';

interface PaymentMethodProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    method: BalancePaymentMethod;
}

export default function PaymentMethod({
    method,
    onChange,
}: PaymentMethodProps) {
    const title: Record<BalancePaymentMethod, string> = {
        [BalancePaymentMethod.SBP]: 'СБП (QR)',
        [BalancePaymentMethod.YANDEX_PAY]: 'Яндекс Пэй',
        [BalancePaymentMethod.VISA]: 'Visa',
        [BalancePaymentMethod.OTHER]: 'Другое',
    };

    const paymentImages: Record<BalancePaymentMethod, string> = {
        [BalancePaymentMethod.SBP]: sbp_sm,
        [BalancePaymentMethod.VISA]: visa,
        [BalancePaymentMethod.YANDEX_PAY]: ya_pay,
        [BalancePaymentMethod.OTHER]: mir,
    };

    return (
        <div className="bg-white border-gray-primary border-[1px] py-2 px-1 rounded-xl flex flex-col gap-2 items-center justify-center w-full relative">
            <img
                src={paymentImages[method]}
                alt={title[method]}
                className="w-16 h-16"
            />
            <div className="text-text-secondary font-semibold text-center">
                {title[method]}
            </div>
            <input
                className="payment_method hidden"
                type="radio"
                name="paymentMethod"
                value={BalancePaymentMethod[method]}
                id={BalancePaymentMethod[method]}
                onChange={onChange}
            />
            <label
                htmlFor={BalancePaymentMethod[method]}
                className="absolute w-full h-full left-0 top-0 rounded-xl border cursor-pointer duration-150"></label>
        </div>
    );
}

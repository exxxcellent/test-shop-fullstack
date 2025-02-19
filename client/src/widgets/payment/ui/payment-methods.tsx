import { PaymentMethod } from '@entities/balance';
import { BalancePaymentMethod } from '@shared/types';

interface PaymentMethodsProps {
    setPaymentMethod: (paymentMethod: BalancePaymentMethod) => void;
}

export default function PaymentMethods({
    setPaymentMethod,
}: PaymentMethodsProps) {
    const onSelectHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const method = event.target.value as BalancePaymentMethod;
        setPaymentMethod(method);
    };

    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold text-text-secondary">
                Способ оплаты
            </h2>
            <div className="flex justify-between gap-3">
                <PaymentMethod
                    method={BalancePaymentMethod.SBP}
                    onChange={onSelectHandler}
                />
                <PaymentMethod
                    method={BalancePaymentMethod.YANDEX_PAY}
                    onChange={onSelectHandler}
                />
                <PaymentMethod
                    method={BalancePaymentMethod.VISA}
                    onChange={onSelectHandler}
                />
            </div>
            <PaymentMethod
                method={BalancePaymentMethod.OTHER}
                onChange={onSelectHandler}
            />
        </div>
    );
}

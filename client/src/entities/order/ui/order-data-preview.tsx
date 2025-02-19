import { useAuthStore } from '@store/useAuthStore';
import { Order } from '../types/order.interface';

interface OrderDataPreviewProps {
    order: Order;
}

export default function OrderDataPreview({ order }: OrderDataPreviewProps) {
    const { user } = useAuthStore((state) => state);

    return (
        <div className="flex flex-col justify-center gap-4 bg-white rounded-[20px] px-4 py-[10px]">
            <span className="text-text-secondary font-semibold">
                Данные для доставки
            </span>
            <div className="pb-1 border-b border-b-gray-secondary flex flex-col">
                <span className="text-text-tertiary text-xs">Email</span>
                <span>{user?.email}</span>
            </div>
            <div className="pb-1 border-b border-b-gray-secondary flex flex-col">
                <span className="text-text-tertiary text-xs">Address</span>
                <span>{order.address}</span>
            </div>
        </div>
    );
}

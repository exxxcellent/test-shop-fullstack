import type { SwiperOptions } from 'swiper/types';
import type { Good } from '../types/good.interface';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Button from './button';
import { twMerge } from 'tailwind-merge';

interface GoodDrawerProps {
    open: boolean;
    onClose: () => void;
    good: Good | null;
}

export default function GoodDrawer({ open, good, onClose }: GoodDrawerProps) {
    const [accordionOpen, setAccordionOpen] = useState<boolean>(false);

    const swiperOptions: SwiperOptions = {
        slidesPerView: 1.1,
        spaceBetween: 10,
        pagination: {
            el: '.swiper-pagination',
            bulletActiveClass:
                'swiper-pagination-bullet-active bg-accent-primary',
        },
        modules: [Pagination],
    };

    const onBackdropClickHandler = () => {
        onClose();
    };

    const onBuyHandler = () => {
        onClose();
    };

    const onToggleAccordionHandler = () => {
        setAccordionOpen(!accordionOpen);
    };

    useEffect(() => {
        if (!open) {
            document.body.className = 'overflow-x-hidden';
        } else {
            document.body.className = 'overflow-hidden';
        }
    });

    return (
        <>
            {open && (
                <>
                    <div
                        className="fixed w-full h-full bg-black/50"
                        onClick={onBackdropClickHandler}></div>
                    <div className="fixed bottom-0 left-0 w-full bg-gray-secondary rounded-t-[24px] flex flex-col gap-5">
                        <div className="bg-white px-3 py-3 rounded-[24px]">
                            <Swiper {...swiperOptions}>
                                {new Array(3).fill(0).map((_, index) => (
                                    <SwiperSlide
                                        className="bg-gray-primary h-40 w-72 rounded-[11px]"
                                        key={index}></SwiperSlide>
                                ))}
                                <div className="swiper-pagination !static"></div>
                            </Swiper>
                            <p className="text-2xl font-bold text-text-secondary px-2">
                                {good?.price} ₽
                            </p>
                        </div>
                        <div className="flex flex-col gap-5 px-5">
                            <div className="flex flex-col gap-3">
                                <h3 className="text-2xl font-semibold text-text-secondary">
                                    {good?.title}
                                </h3>
                                <p
                                    className={twMerge(
                                        'text-xl text-text-tertiary mb-3',
                                        accordionOpen ? '' : 'line-clamp-2'
                                    )}>
                                    {good?.description}
                                </p>
                                <button
                                    className="text-xl text-accent-primary flex items-center gap-1 "
                                    onClick={onToggleAccordionHandler}>
                                    {accordionOpen ? 'свернуть' : 'больше'}
                                    {accordionOpen && (
                                        <img
                                            src="/src/assets/icons/arrow-down.svg"
                                            alt="arrow-down"
                                            className="w-6 h-6"
                                        />
                                    )}
                                    {!accordionOpen && (
                                        <img
                                            src="/src/assets/icons/arrow-up.svg"
                                            alt="arrow-up"
                                            className="w-6 h-6"
                                        />
                                    )}
                                </button>
                            </div>
                            <Button
                                title="Купить"
                                onClick={onBuyHandler}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

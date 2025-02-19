import { SwiperOptions } from 'swiper/types';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function ItemSlider() {
    const slidesPerView = window.innerWidth <= 392 ? 1.2 : 1;

    const swiperOptions: SwiperOptions = {
        slidesPerView,
        spaceBetween: 10,
        pagination: {
            el: '.swiper-pagination',
            bulletActiveClass:
                'swiper-pagination-bullet-active bg-accent-primary',
        },
        modules: [Pagination],
    };

    return (
        <>
            <Swiper
                {...swiperOptions}
                className="px-3 lg:px-0">
                {new Array(3).fill(0).map((_, index) => (
                    <SwiperSlide
                        className="bg-gray-primary h-48 w-[350px] lg:h-64 lg:w-full rounded-[11px] cursor-grab"
                        key={index}></SwiperSlide>
                ))}
                <div className="swiper-pagination !static"></div>
            </Swiper>
        </>
    );
}

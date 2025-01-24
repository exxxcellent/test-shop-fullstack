import type { SwiperOptions } from 'swiper/types';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function News() {
    const swiperOptions: SwiperOptions = {
        slidesPerView: 1.3,
        spaceBetween: 10,
    };
    
    return (
        <section
            id="banner"
            className="px-5">
            <Swiper {...swiperOptions}>
                {new Array(5).fill(0).map((_, index) => (
                    <SwiperSlide
                        className="bg-gray-primary h-40 w-72 rounded-[11px]"
                        key={index}></SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

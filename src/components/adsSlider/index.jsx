'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';

const images = [
  {
    src: 'https://cdn.salla.sa/form-builder/WE97diiRxpWt75TpUynAfg3erJ4GUGnjgRzUnhG6.png',
    alt: 'عرض العيادة ١',
  },
  {
    src: 'https://cdn.salla.sa/form-builder/zvO27IFI0p5mJA2BVcLvTpVG1QFhxzSWPs4HpaBl.jpg',
    alt: 'عرض العيادة ٢',
  },
  {
    src: 'https://cdn.salla.sa/form-builder/e85OTv4DMNp2xNEEZPAaj7AoJT4m2qzWApYmS2jG.png',
    alt: 'عرض العيادة ٣',
  },
];

export default function ProductImageSlider() {
  return (
    <div className="w-full relative" dir="rtl">
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        pagination={{
          clickable: true,
          el: '.swiper-pagination-custom',
          type: "bullets",
          bulletClass: 'swiper-bullet-custom',
          bulletActiveClass: 'swiper-bullet-active-custom'
        }}
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        loop={true}
        className="w-full relative"
      >
        {images.length > 0 ? (
          images.map((img, index) => (
            <SwiperSlide key={index} className="flex justify-center py-1 px-1 items-center">
              <div className="w-full overflow-hidden rounded-lg">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={300}
                  height={500}
                  className="w-full  object-cover"
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className="w-full aspect-[4/5] flex items-center justify-center bg-gray-200 rounded-lg">
              لا توجد صورة
            </div>
          </SwiperSlide>
        )}

        {/* Custom Navigation Arrows */}
        <button className="custom-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/30 backdrop-blur-sm transition-all duration-300 border border-[#CBA853]/30 hover:border-[#CBA853]/50">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#CBA853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <button className="custom-next absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/30 backdrop-blur-sm transition-all duration-300 border border-[#CBA853]/30 hover:border-[#CBA853]/50">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="#CBA853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Custom Pagination */}
        <div className="absolute bottom-4 left-0 right-0 mx-auto z-10">
          <div className="swiper-pagination-custom flex justify-center items-center gap-1 md:gap-2" />
        </div>
      </Swiper>

      <style jsx global>{`
        .swiper-bullet-custom {
          width: 6px;
          height: 6px;
 background: rgba(200, 200, 200, 0.7);          border-radius: 50%;
          margin: 0 2px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .swiper-bullet-active-custom {
          background: #CBA853;
          width: 8px;
          height: 8px;
        }

        @media (min-width: 768px) {
          .swiper-bullet-custom {
            width: 8px;
            height: 8px;
          }

          .swiper-bullet-active-custom {
            width: 10px;
            height: 10px;
          }
        }
      `}</style>
    </div>
  );
}
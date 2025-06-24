'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // Fixed import path
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'; // Don't forget this for autoplay
import 'swiper/css/effect-fade'; // Required for fade effect

const images = [
  {
    src: 'https://cdn.salla.sa/form-builder/WE97diiRxpWt75TpUynAfg3erJ4GUGnjgRzUnhG6.png',
    alt: 'Clinic promotion 1',
  },
  {
    src: 'https://cdn.salla.sa/form-builder/zvO27IFI0p5mJA2BVcLvTpVG1QFhxzSWPs4HpaBl.jpg',
    alt: 'Clinic promotion 2',
  },
  {
    src: 'https://cdn.salla.sa/form-builder/e85OTv4DMNp2xNEEZPAaj7AoJT4m2qzWApYmS2jG.png',
    alt: 'Clinic promotion 3',
  },
];

export default function ImageSlider() {
  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]} // Correct modules
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{ 
          clickable: true,
          dynamicBullets: true,
          renderBullet: (index, className) => {
            return `<span class="${className} bg-primary-500 hover:bg-primary-600 transition-colors duration-300"></span>`;
          }
        }}
        autoplay={{ 
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        loop={true}
        speed={800}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        className="relative rounded-xl overflow-hidden shadow-xl h-[80vh]"
        style={{
          '--swiper-navigation-color': '#ffffff',
          '--swiper-pagination-color': '#ffffff',
          '--swiper-pagination-bullet-size': '12px',
          '--swiper-pagination-bullet-horizontal-gap': '6px',
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative aspect-video w-full h-full">
              <img
                src={image.src}
                alt={image.alt}
                className="object-cover w-full h-full"
                loading="lazy" // Added lazy loading
              />
            </div>
          </SwiperSlide>
        ))}

        {/* Custom navigation buttons */}
        <div className="swiper-button-prev hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 transition-all duration-300 after:text-lg after:font-bold"></div>
        <div className="swiper-button-next hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 transition-all duration-300 after:text-lg after:font-bold"></div>
      </Swiper>
    </div>
  );
}
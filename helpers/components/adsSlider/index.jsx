import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOffers } from "../../../store/slices/offers";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import TourCard from "./OfferCard";
import SectionTitle from "../SectionTitle/SectionTitle";
import Link from "next/link";

export default function OffersSlider() {
  const dispatch = useDispatch();
  const { items: offers, loading, error } = useSelector((state) => state.offers);

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center py-8">جاري التحميل...</p>;
  }

  if (error) {
    return <p className="text-center py-8 text-red-500">حدث خطأ: {error}</p>;
  }

  return (
    <div className="w-full relative mt-5" dir="rtl">
      <div className="flex justify-center mb-12">
        <div className="w-full max-w-3xl text-center mx-auto">
    <SectionTitle
  title="عروضنا الخاصة"
  subtitle="خصومات وخدمات مميزة"
/>

        </div>
      </div>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        pagination={{
          clickable: true,
          el: ".swiper-pagination-custom",
          type: "bullets",
          bulletClass: "swiper-bullet-custom",
          bulletActiveClass: "swiper-bullet-active-custom",
        }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={16}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="w-[90%] relative mx-auto "
      >
        {offers.length > 0 ? (
          offers.map((offer, index) => (
            <SwiperSlide key={index} className="px-2 py-4">
              <TourCard
                image={offer.image}
                name={offer.title}
                id={offer.id}
                priceAfter={offer.priceAfter}
                priceBefore={offer.priceBefore}
                description={offer.description}
                branches={offer.branches}
                doctors={offer.doctors_ids} // Pass doctors array to the card
                onSelect={(data) => console.log("Selected offer:", data)}
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className="w-full aspect-[4/5] flex items-center justify-center bg-gray-200 rounded-lg">
              لا توجد عروض
            </div>
          </SwiperSlide>
        )}

        {/* Custom Navigation Arrows */}
        <button className="custom-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/30 backdrop-blur-sm transition-all duration-300 border border-[#CBA853]/30 hover:border-[#CBA853]/50">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#CBA853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button className="custom-next absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/30 backdrop-blur-sm transition-all duration-300 border border-[#CBA853]/30 hover:border-[#CBA853]/50">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="#CBA853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Custom Pagination */}
        <div className="absolute bottom-0 left-0 right-0 mx-auto z-10">
          <div className="swiper-pagination-custom flex justify-center items-center gap-1 md:gap-2" />
        </div>
      </Swiper>

      {offers.length > 0 && (
        <div className="w-full max-w-3xl mx-auto mt-8 flex justify-center">
          <div className="btn">
            <Link
              href="/offers"
              className="relative pl-16 inline-flex items-center justify-between 
                         bg-gradient-to-b from-[#A58532] via-[#CBA853] to-[#f0db83]
                         text-white font-bold rounded-full py-3 px-8
                         hover:-translate-y-1 hover:shadow-md transition-all duration-300 gap-4"
            >
              <span className="absolute left-3 w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#CBA853"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </span>
              <span className="flex-1 text-end">عرض جميع العروض</span>
            </Link>
          </div>
        </div>
      )}

      <style jsx global>{`
        .swiper-bullet-custom {
          width: 6px;
          height: 6px;
          background: rgba(200, 200, 200, 0.7);
          border-radius: 50%;
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
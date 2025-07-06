import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOffers } from "../../../store/slices/offers";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import TourCard from "../adsSlider/OfferCard";
import SectionTitle from "../SectionTitle/SectionTitle";
import Link from "next/link";

export default function OffersSection() {
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

  // Featured offers (first 6 for slider)
  const featuredOffers = offers.slice(0, 6);
  // All offers for grid
  const allOffers = offers;

  return (
    <div className="w-full relative mt-5" dir="rtl">


      {/* All Offers Grid */}
      <div className=" w-[90%] mx-auto px-4">
        <div className="flex justify-center mb-12">
          <div className="w-full text-center mx-auto">
            <SectionTitle
              title="جميع العروض"
              subtitle="تصفح كافة العروض المتاحة"
            />
          </div>
        </div>

        {allOffers.length > 0 ? (
          <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allOffers.map((offer, index) => (
              <div key={index} className="px-2 py-4">
                <TourCard
                  image={offer.image}
                  name={offer.title}
                  priceAfter={offer.priceAfter}
                  priceBefore={offer.priceBefore}
                  description={offer.description}
                  branches={offer.branches}
                  onSelect={(data) => console.log("Selected offer:", data)}
                  id={offer.id}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full aspect-[4/5] flex items-center justify-center bg-gray-200 rounded-lg">
            لا توجد عروض متاحة حالياً
          </div>
        )}

     
      </div>

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
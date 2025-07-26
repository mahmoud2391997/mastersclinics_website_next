import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOfferById } from '../../store/slices/offers';
import Image from 'next/image';
import { getImageUrl } from "@/helpers/hooks/imageUrl";

import Navbar from '../../helpers/components/Navbar/Navbar';
import PageTitle from '../../helpers/components/pagetitle/PageTitle';
import Footer from '../../helpers/components/footer/Footer';
import SectionTitle from '../../helpers/components/SectionTitle/SectionTitle';
import OffersSlider from '../../helpers/components/adsSlider/index';
import CtafromSection from '../../helpers/components/Form';

const OfferSinglePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const { selectedOffer: offer, loading, error } = useSelector((state) => state.offers);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">جاري تحميل العرض...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">حدث خطأ أثناء تحميل العرض: {error}</p>
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">العرض غير موجود</p>
      </div>
    );
  }

  const images = [offer.image || '/default-image.jpg'];

  const discountPercentage = Math.round(
    ((offer.priceBefore - offer.priceAfter) / offer.priceBefore) * 100
  );

  return (
    <div className="min-h-screen">
      <Navbar hclass={'wpo-site-header wpo-site-header-s2'} />
      <PageTitle pageTitle={offer.title} pagesub="تفاصيل العرض" />

      <main className="container mx-auto px-4 py-8" dir="rtl">
        <div className="flex flex-col lg:flex-row-reverse gap-8">
          {/* Image */}
          <div className="lg:w-1/2">
            <div className="relative w-full h-full bg-white rounded-xl shadow-md overflow-hidden">
              <Image
                src={getImageUrl(images[activeImage])}
                alt={offer.title}
                fill
                className="object-cover"
                priority
              />
              {discountPercentage > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  خصم {discountPercentage}%
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-1/2">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{offer.title}</h1>
            <p className="text-gray-700 mb-6 leading-relaxed">{offer.description}</p>
            
            {/* Pricing */}
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              {offer.priceBefore > offer.priceAfter && (
                <div className="flex items-center mb-2">
                  <span className="text-gray-500 line-through ml-2">{offer.priceBefore} ر.س</span>
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
                    وفر {offer.priceBefore - offer.priceAfter} ر.س
                  </span>
                </div>
              )}
              <div className="flex items-center">
                <span className="text-3xl font-bold text-[#dec06a]">{offer.priceAfter} ر.س</span>
                {offer.priceBefore > offer.priceAfter && (
                  <span className="text-green-600 text-sm mr-2">(شامل الضريبة)</span>
                )}
              </div>
            </div>

            {/* Booking Button */}
            <button
              className="w-full bg-[#dec06a] hover:bg-[#e8cf8c] text-white py-3 px-6 rounded-lg font-medium transition-colors mb-6"
              onClick={() => {
                const formSection = document.getElementById('appointment-form');
                if (formSection) {
                  formSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              حجز موعد
            </button>

            {/* Offer details */}
            <div className="border-t border-gray-200 pt-6 text-right">
              <h3 className="text-lg font-semibold mb-3">تفاصيل العرض</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex">
                  <span className="font-medium w-32 shrink-0">الفروع:</span>
                  <span>
                    {offer.branches && offer.branches.length > 0
                      ? offer.branches.map(b => b.name).join('، ')
                      : "غير محدد"}
                  </span>
                </li>
                <li className="flex">
                  <span className="font-medium w-32 shrink-0">السعر الأصلي:</span>
                  <span>{offer.priceBefore} ر.س</span>
                </li>
                <li className="flex">
                  <span className="font-medium w-32 shrink-0">السعر بعد الخصم:</span>
                  <span>{offer.priceAfter} ر.س</span>
                </li>
                <li className="flex">
                  <span className="font-medium w-32 shrink-0">نسبة الخصم:</span>
                  <span>{discountPercentage}%</span>
                </li>
                <li className="flex">
                  <span className="font-medium w-32 shrink-0">الخدمات:</span>
                  <span>
                    {offer.services_ids && offer.services_ids.length > 0
                      ? offer.services_ids.map(service => service.title).join('، ')
                      : "غير محدد"}
                  </span>
                </li>
                <li className="flex">
                  <span className="font-medium w-32 shrink-0">الأطباء:</span>
                  <span>
                    {offer.doctors_ids && offer.doctors_ids.length > 0
                      ? offer.doctors_ids.map(doctor => doctor.name).join('، ')
                      : "غير محدد"}
                  </span>
                </li>
              </ul>
            </div>
            {/* Branches Section */}
<div className="mt-8 border-t border-gray-200 pt-6">
  <h3 className="text-lg font-semibold mb-4 text-right">الفروع المتاحة لهذا العرض</h3>
  {offer.branches && offer.branches.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {offer.branches.map((branch) => (
        <div key={branch.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h4 className="font-medium text-lg">{branch.name}</h4>
          <p className="text-gray-600 mt-1">{branch.address}</p>
          {branch.location_link && (
            <a
              href={branch.location_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[#dec06a] hover:underline mt-2"
            >
              <span>عرض الموقع</span>
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </a>
          )}
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500 text-right">لا توجد فروع متاحة لهذا العرض</p>
  )}
</div>
          </div>
        </div>
      </main>

      <div id="appointment-form" className="AppointmentFrom">
        <div className="container">
          <div className="cta_form_s2">
            <div className="title s2">
              <h3>حجز موعد</h3>
              <p>تواصل معنا لحجز موعد ومعرفة كيف يمكننا خدمتك.</p>
            </div>
            <CtafromSection />
          </div>
        </div>
      </div>

      <SectionTitle title="العروض الأخرى" />
      <OffersSlider />
      <Footer hclass={'wpo-site-footer'} />
    </div>
  );
};

export default OfferSinglePage;
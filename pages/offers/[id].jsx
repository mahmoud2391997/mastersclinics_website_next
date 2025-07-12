import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOfferById } from '../../store/slices/offers';
import Image from 'next/image';
import { getImageUrl } from "@/helpers/hooks/imageUrl"

import Navbar from '../../helpers/components/Navbar/Navbar';
import PageTitle from '../../helpers/components/pagetitle/PageTitle';
import Footer from '../../helpers/components/footer/Footer';
import SectionTitle from '../../helpers/components/SectionTitle/SectionTitle';
import OffersSlider from '../../helpers/components/adsSlider/index';
import ContactForm from '../../helpers/main-component/ServiceSinglePage/ServiceFrom';

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
    <div className="min-h-screen ">
      <Navbar hclass={'wpo-site-header wpo-site-header-s2'} />
      <PageTitle pageTitle={offer.title} pagesub="تفاصيل العرض" />
      
      <main className="container mx-auto px-4 py-8"  dir="rtl">
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
                  <span className="text-gray-500 line-through ml-2">
                    {offer.priceBefore} ر.س
                  </span>
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
                    وفر {offer.priceBefore - offer.priceAfter} ر.س
                  </span>
                </div>
              )}
              <div className="flex items-center">
                <span className="text-3xl font-bold text-[#000B47]">
                  {offer.priceAfter} ر.س
                </span>
                {offer.priceBefore > offer.priceAfter && (
                  <span className="text-green-600 text-sm mr-2">(شامل الضريبة)</span>
                )}
              </div>
            </div>

            {/* Booking Button */}
            <button
              className="w-full bg-[#000B47] hover:bg-[#1A237E] text-white py-3 px-6 rounded-lg font-medium transition-colors mb-6"
              onClick={() => router.push('/book-appointment')}
            >
              حجز موعد
            </button>

            {/* Offer details */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold mb-3">تفاصيل العرض</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex">
                  <span className="font-medium w-32">الفروع:</span>
                  <span>
                    {Array.isArray(offer.branches)
                      ? offer.branches.join('، ')
                      : offer.branches
                      ? offer.branches
                      : "غير محدد"}
                  </span>
                </li>
                <li className="flex">
                  <span className="font-medium w-32">السعر الأصلي:</span>
                  <span>{offer.priceBefore} ر.س</span>
                </li>
                <li className="flex">
                  <span className="font-medium w-32">السعر بعد الخصم:</span>
                  <span>{offer.priceAfter} ر.س</span>
                </li>
                <li className="flex">
                  <span className="font-medium w-32">نسبة الخصم:</span>
                  <span>{discountPercentage}%</span>
                </li>
                <li className="flex">
                  <span className="font-medium w-32">الخدمات:</span>
                  <span>
                    {Array.isArray(offer.services_ids) && offer.services_ids.length > 0
                      ? offer.services_ids
                          .flatMap(item => item.split(','))
                          .filter(Boolean)
                          .join('، ')
                      : "غير محدد"}
                  </span>
                </li>
                <li className="flex">
                  <span className="font-medium w-32">الأطباء:</span>
                  <span>
                    {Array.isArray(offer.doctors_ids) && offer.doctors_ids.length > 0
                      ? offer.doctors_ids
                          .flatMap(item => item.split(','))
                          .filter(Boolean)
                          .join('، ')
                      : "غير محدد"}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <div className="AppointmentFrom">
        <div className="container">
          <div className="cta_form_s2">
            <div className="title s2">
              <h3>Make An Appointment</h3>
              <p>Get in touch with us to see how we can help you with your Problems.</p>
            </div>
            <ContactForm />
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

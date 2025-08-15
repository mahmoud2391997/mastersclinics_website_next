"use client"

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOfferById } from '../../store/slices/offers';
import Image from 'next/image';
import { getImageUrl } from "@/helpers/hooks/imageUrl";
import { FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillWave, FaPercentage, FaClinicMedical, FaUserMd, FaHeart, FaRegHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';

import Navbar from '../../helpers/components/Navbar/Navbar';
import PageTitle from '../../helpers/components/pagetitle/PageTitle';
import Footer from '../../helpers/components/footer/Footer';
import SectionTitle from '../../helpers/components/SectionTitle/SectionTitle';
import OffersSlider from '../../helpers/components/adsSlider/index';
import CtafromSection from '../../helpers/components/Form';
import Link from 'next/link';

const OfferSinglePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const { selectedOffer: offer, loading, error } = useSelector((state) => state.offers);
  const [activeImage, setActiveImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem("isAuthenticated") === "true";
      const userData = JSON.parse(localStorage.getItem("user"));
      
      setIsAuthenticated(authStatus);
      setUser(userData);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (isAuthenticated && user && offer) {
      checkWishlistStatus();
    }
  }, [isAuthenticated, user, offer]);

  const checkWishlistStatus = async () => {
    try {
      setWishlistLoading(true);
      const response = await fetch(
        `https://www.ss.mastersclinics.com/api/wishlist/${user.id}`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch wishlist items");
      }
      
      const data = await response.json();
      const isItemWishlisted = data.data?.some(
        item => item.item_id === offer.id && item.item_type === "offer"
      );
      setIsWishlisted(isItemWishlisted);
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
      toast.error("Failed to load wishlist status");
    } finally {
      setWishlistLoading(false);
    }
  };

  const toggleWishlist = async (e) => {
    e.stopPropagation();

    if (!isAuthenticated || !user) {
      toast.error("يجب تسجيل الدخول أولاً لإضافة إلى المفضلة");
      router.push("/auth/login");
      return;
    }

    const newWishlistStatus = !isWishlisted;
    setIsWishlisted(newWishlistStatus); // Optimistic update

    try {
      const endpoint = "https://www.ss.mastersclinics.com/api/wishlist";
      const method = newWishlistStatus ? "POST" : "DELETE";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: user.id,
          item_type: "offer",
          item_id: offer.id
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to ${newWishlistStatus ? "add to" : "remove from"} wishlist`);
      }

      toast.success(
        newWishlistStatus 
          ? "تمت إضافة العرض إلى المفضلة" 
          : "تمت إزالة العرض من المفضلة"
      );
    } catch (err) {
      console.error("Wishlist error:", err);
      toast.error(err.message || "حدث خطأ أثناء تحديث المفضلة");
      // Rollback optimistic update
      setIsWishlisted(!newWishlistStatus);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#dec06a] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xl mt-4 text-gray-700">جاري تحميل العرض...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
          <div className="text-red-500 text-5xl mb-4">!</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">حدث خطأ</h2>
          <p className="text-gray-600 mb-6">حدث خطأ أثناء تحميل العرض: {error}</p>
          <button 
            onClick={() => router.reload()}
            className="bg-[#dec06a] hover:bg-[#d4b95a] text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
          <div className="text-gray-400 text-5xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">العرض غير موجود</h2>
          <p className="text-gray-600 mb-6">عذراً، لا يمكن العثور على العرض المطلوب</p>
          <button 
            onClick={() => router.push('/offers')}
            className="bg-[#dec06a] hover:bg-[#d4b95a] text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            تصفح العروض المتاحة
          </button>
        </div>
      </div>
    );
  }

  const images = [offer.image || '/default-image.jpg'];
  const discountPercentage = Math.round(((offer.priceBefore - offer.priceAfter) / offer.priceBefore) * 100);

  return (
    <div className="min-h-screen ">
      <Navbar hclass={'wpo-site-header wpo-site-header-s2'} />
      
      <PageTitle 
        pageTitle={offer.title} 
        pagesub="تفاصيل العرض"  
        bgImage={"/offers@0.5x.webp"}
      />

      <main className="container mx-auto px-4 py-8 md:py-12" dir="rtl">
        {/* Offer Details Section */}
        <div className="flex flex-col lg:flex-row-reverse gap-8 mb-12">
          {/* Image Gallery */}
          <div className="w-full lg:w-1/2">
            <div className="relative w-full h-[350px] md:h-[700px] bg-white rounded-xl shadow-md overflow-hidden">
              <Image
                src={getImageUrl(images[activeImage]) || '/default-image.jpg'}
                alt={offer.title || 'عرض تجهيل نسائي'}
                fill
                className="object-cover transition-opacity duration-300"
                priority
                sizes="(max-width: 640px) 100vw, 50vw"
                onError={(e) => {
                  const target = e.target;
                  target.onerror = null;
                  target.src = '/default-image.jpg';
                }}
                style={{
                  objectPosition: 'center center'
                }}
              />
              
              {/* Discount Badge */}
              {discountPercentage > 0 && (
                <div className="absolute top-4 left-4 bg-[#D4AF37] text-white font-bold rounded-full w-14 h-14 flex items-center justify-center text-lg shadow-lg">
                  {discountPercentage}%
                </div>
              )}
              
              {/* Wishlist Button */}
              <button
                onClick={toggleWishlist}
                className="absolute top-4 right-4 z-10 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-gray-100 transition-colors"
                aria-label={isWishlisted ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
                disabled={wishlistLoading}
              >
                {wishlistLoading ? (
                  <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : isWishlisted ? (
                  <FaHeart className="h-6 w-6 text-red-500" />
                ) : (
                  <FaRegHeart className="h-6 w-6 text-gray-400 hover:text-red-400" />
                )}
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{offer.title}</h1>
              
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                {offer.description || "عرض مميز يشمل مجموعة من الخدمات الطبية المقدمة بأعلى معايير الجودة والكفاءة."}
              </p>
              
              {/* Pricing Section */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg mb-6 border border-gray-200">
                {offer.priceBefore > offer.priceAfter && (
                  <div className="flex items-center mb-2">
                    <span className="text-gray-500 line-through ml-2 text-lg">{offer.priceBefore} ر.س</span>
                    <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full ml-2">
                      وفر {offer.priceBefore - offer.priceAfter} ر.س
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-4xl font-bold text-[#D4AF37]">{offer.priceAfter} ر.س</span>
                    {offer.priceBefore > offer.priceAfter && (
                      <span className="text-green-600 text-sm mr-2 block mt-1">(شامل الضريبة)</span>
                    )}
                  </div>
                  <button
                    className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] hover:from-[#C9A227] hover:to-[#E4C238] text-white py-3 px-8 rounded-lg font-medium transition-all transform hover:scale-105 shadow-md"
                    onClick={() => {
                      const formSection = document.getElementById('appointment-form');
                      if (formSection) {
                        formSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    <FaCalendarAlt className="inline ml-2" />
                    حجز موعد
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 mb-12 mt-2">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaMapMarkerAlt className="text-[#D4AF37] ml-2" />
                الفروع المتاحة لهذا العرض
              </h3>
              
              {offer.branches && offer.branches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {offer.branches.map((branch) => (
                    <div 
                      key={branch.id} 
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="p-6">
                        <h4 className="font-bold text-xl text-gray-800 mb-2">{branch.name}</h4>
                        <p className="text-gray-600 mb-4">{branch.address}</p>
                        
                        {branch.google_map_link && (
                          <a
                            href={branch.google_map_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center !text-[#dec06a] hover:!text-[#C9A227] font-medium"
                          >
                            <FaMapMarkerAlt className="ml-2" />
                            عرض الموقع على الخريطة
                          </a>
                        )}
                      </div>
                      
                      <div className="mr-6 mb-6">
                        <a
                          href={`/branches/${branch.id}`}
                          className="px-4 py-2 border-2 border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-[#dec06a] hover:bg-[#dec06a]-dark text-center transition-colors"
                        >
                          المزيد من التفاصيل
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-5xl mb-4">
                    <FaMapMarkerAlt className="inline-block" />
                  </div>
                  <h4 className="text-xl font-medium text-gray-700 mb-2">لا توجد فروع متاحة</h4>
                  <p className="text-gray-500">عذراً، لا توجد فروع متاحة لهذا العرض حالياً</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Doctors Section */}
        {offer.doctors_ids && offer.doctors_ids.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">الأطباء المتاحون</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offer.doctors_ids.map((doctor) => (
                <div key={doctor.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center mb-4 gap-2">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                        <Image
                          src={getImageUrl(doctor.image) || '/default-doctor.jpg'}
                          alt={doctor.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className='mt-4'>
                        <h4 className="font-bold text-gray-800">{doctor.name}</h4>
                        <p className="text-[#D4AF37] text-sm">{doctor.specialty}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm">{doctor.services}</p>
                  </div>
                  <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                    <button className="bg-[#D4AF37] hover:bg-[#C9A227] text-white font-medium py-2 px-6 rounded-lg w-full transition-colors">
                      <Link href={`/doctors/${doctor.id}`} className='!text-white'>
                        حجز مع الطبيب
                      </Link>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Appointment Form */}
      <div id="appointment-form" className="AppointmentFrom mb-5">
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

      {/* Related Offers */}
      <SectionTitle title={"عروض مشابهة"}/>
        <OffersSlider />
      <Footer hclass={'wpo-site-footer'} />
    </div>
  );
};

export default OfferSinglePage;
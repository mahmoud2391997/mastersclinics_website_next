"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import SectionTitle from "../SectionTitle/SectionTitle";
import { useSelector, useDispatch } from "react-redux";
import { fetchServices } from "../../../store/slices/services";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useRouter } from "next/router";

const ServiceSection = ({
  hclass = "",
  sliceStart = 0,
  sliceEnd = 6,
  showSectionTitle = true,
  AllServices = true,
}) => {
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { services = [], loading = false, error = null } = useSelector(
    (state) => state.services || {}
  );
console.log(services);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    dispatch(fetchServices());
  }, [dispatch]);

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  const getBranchName = (branchCode) => {
    const branchMap = {
      alawali: "العوالي",
      alkhalidiyah: "الخالدية",
      alshatee: "الشاطئ",
      albasateen: "البساتين",
      abhur: "ابحر الشمالية",
      altaif: "الطائف",
    };
    return branchMap[branchCode] || branchCode;
  };

  const servicesToShow = services.length === 0 ? [] : services.slice(sliceStart, sliceEnd);

  const handleSlideClick = (id) => {
    router.push(`/services/${id}`);
  };

  if (!mounted) return null;

  return (
    <section className={`${hclass} rtl w-[90%] m-auto`} dir="rtl">
      <div className="w-full py-16 px-0">
        {showSectionTitle && (
          <div className="flex justify-center mb-12">
            <div className="w-full max-w-3xl text-center mx-auto">
              <SectionTitle title="خدمات الأقسام الطبية" subtitle="خدماتنا الصحية" />
            </div>
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center py-10">
            <div
              className="spinner-border text-primary"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center py-10">
            <div className="alert alert-danger" role="alert">
              Error loading services: {error}
            </div>
          </div>
        )}

        {!loading && !error && (
          <div className="relative w-full">
            {/* Navigation Arrows */}
            <div className="flex justify-between items-center mb-6 w-full px-4">
              <button
                ref={prevRef}
                className="swiper-button-prev-gradient swiper-button-prev flex items-center justify-center w-12 h-12 rounded-full cursor-pointer transition bg-[#dec06a] border-2 border-[#dec06a] shadow-lg hover:bg-[#d4b45c]"
                aria-label="السابق"
                type="button"
              >
                <i className="flaticon-left-arrow text-lg text-white"></i>
              </button>
              <button
                ref={nextRef}
                className="swiper-button-next-gradient swiper-button-next flex items-center justify-center w-12 h-12 rounded-full cursor-pointer transition bg-[#dec06a] border-2 border-[#dec06a] shadow-lg hover:bg-[#d4b45c]"
                aria-label="التالي"
                type="button"
              >
                <i className="flaticon-right-arrow text-lg text-white"></i>
              </button>
            </div>

            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true, el: ".swiper-pagination-gradient" }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              loop={true}
              className="w-full p-5"
            >
              {servicesToShow.map((service, index) => {
                // Parse branches safely
                let parsedBranches = [];
                try {
                  parsedBranches = Array.isArray(service.branches)
                    ? service.branches
                    : JSON.parse(service.branches || "[]");
                } catch (e) {
                  parsedBranches = [];
                }

                return (
                  <SwiperSlide key={index}>
                    <div
                      className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-full flex flex-col cursor-pointer group"
                      onClick={() => handleSlideClick(service.id)}
                    >
                      <div className="mb-4 flex justify-center items-center w-full" style={{ minHeight: 120 }}>
                        {service.image ? (
                          <img
                            src={service.image}
                            alt={service.name}
                            className="w-full h-48 object-cover border border-[#dec06a]/30 bg-gray-50 rounded-lg"
                          />
                        ) : (
                          <i
                            className={`text-4xl text-primary transition-colors duration-300 group-hover:text-[#dec06a] ${service.icon}`}
                          ></i>
                        )}
                      </div>

                      <div className="flex-grow">
                        <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                          {service.name}
                        </h2>
                        <p className="text-[#dec06a] mb-4 group-hover:text-[#c0a84a] transition-colors duration-300">
                          {service.description}
                        </p>

                   {service.branches && service.branches.length > 0 && (
  <div className="mb-4">
    <p className="text-xs text-gray-500 mb-2">متوفر في:</p>
    <div className="flex flex-wrap gap-1">
      {service.branches.map((branch, branchIndex) => (
        <span
          key={branchIndex}
          className="inline-block bg-gradient-to-r from-[#dec06a]/10 to-[#d4b45c]/10 text-[#dec06a] text-xs px-2 py-1 rounded-full border border-[#dec06a]/20"
        >
          {branch.name}
        </span>
      ))}
    </div>
  </div>
)}

                    </div>

                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-auto">
                        <div
                          className="bg-[#dec06a] h-1.5 rounded-full transition-all duration-500 ease-out"
                          style={{ width: "0%" }}
                          onMouseEnter={(e) => (e.currentTarget.style.width = "100%")}
                          onMouseLeave={(e) => (e.currentTarget.style.width = "0%")}
                        ></div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            <div className="swiper-pagination-gradient flex justify-center mt-6"></div>
          </div>
        )}

        {AllServices && (
          <div className="col-12">
            <div className="btn">
              <Link href="/services" onClick={ClickHandler} className="theme-btn">
                See All Services
              </Link>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .swiper-button-prev-gradient,
        .swiper-button-next-gradient {
          background-color: transparent !important;
          border: none !important;
          box-shadow: none !important;
          color: #dec06a !important;
        }
        .swiper-button-prev-gradient:hover,
        .swiper-button-next-gradient:hover {
          background-color: transparent !important;
          color: #d4b45c !important;
        }
        .swiper-button-prev-gradient i,
        .swiper-button-next-gradient i {
          color: #dec06a !important;
          font-size: 1.5rem;
          transition: color 0.2s;
        }
        .swiper-button-prev-gradient:hover i,
        .swiper-button-next-gradient:hover i {
          color: #d4b45c !important;
        }
        .swiper-button-prev,
        .swiper-button-next {
          color: #dec06a;
          background-color: #dec06a;
          border: 2px solid #dec06a;
          box-shadow: 0 4px 16px rgba(222, 192, 106, 0.2);
        }
        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          background-color: #d4b45c;
          border-color: #d4b45c;
        }
        .swiper-pagination-gradient .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(222, 192, 106, 0.3);
          opacity: 1;
          margin: 0 6px !important;
          transition: all 0.3s ease;
        }
        .swiper-pagination-gradient .swiper-pagination-bullet-active {
          background: #dec06a;
          width: 30px;
          border-radius: 6px;
        }
        .rtl .flaticon-right-arrow {
          transform: rotate(180deg);
        }
        .rtl .flaticon-left-arrow {
          transform: rotate(180deg);
        }
      `}</style>
    </section>
  );
};

export default ServiceSection;

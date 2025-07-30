"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { fetchServices } from "../../../store/slices/services";
import { useRouter } from "next/router";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import getImageUrl from "../../../utilies/getImageUrl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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

  useEffect(() => {
    setMounted(true);
    dispatch(fetchServices());
  }, [dispatch]);

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  // Branch name mapping
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

  // Parse stringified arrays and handle null/undefined values
  const parseServiceData = (service) => {
    try {
      return {
        ...service,
        doctors_ids: service.doctors_ids ? JSON.parse(service.doctors_ids) : [],
        branches: service.branches ? JSON.parse(service.branches) : [],
        capabilities: service.capabilities || [],
        name: service.name_ar || service.name_en || "Unnamed Service",
        description: service.description || "No description available"
      };
    } catch (e) {
      console.error("Error parsing service data:", e);
      return {
        ...service,
        doctors_ids: [],
        branches: [],
        capabilities: [],
        name: service.name_ar || "Unnamed Service",
        description: service.description || "No description available"
      };
    }
  };

  const servicesToShow = services.length === 0 
    ? [] 
    : services.slice(sliceStart, sliceEnd).map(parseServiceData);

  const handleServiceClick = (id) => {
    router.push(`/services/${id}`);
  };

  if (!mounted) return null;

  return (
    <section className={`${hclass} rtl w-[90%] m-auto`} dir="rtl">
      <div className="w-full py-16 px-0">
        {showSectionTitle && (
          <div className="flex justify-center mb-12">
            <div className="w-full max-w-3xl text-center mx-auto">
              <SectionTitle
                title="خدمات الأقسام الطبية"
                subtitle="خدماتنا الصحية"
              />
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
          <div className="relative">
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{
                nextEl: ".service-swiper-button-next",
                prevEl: ".service-swiper-button-prev",
              }}
         
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
            >
              {servicesToShow.map((service, index) => (
                <SwiperSlide key={index} className="pb-10">
                  <div
                    className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-full flex flex-col cursor-pointer group mx-2"
                    onClick={() => handleServiceClick(service.id)}
                  >
                    {/* Service Image or Icon */}
                    <div
                      className="mb-4 flex justify-center items-center w-full"
                      style={{ minHeight: 120 }}
                    >
                      {service.image ? (
                        <img
                          src={getImageUrl(service.image)}
                          alt={service.name}
                          className="w-full h-48 object-cover border border-[#dec06a]/30 bg-gray-50 rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-lg">
                          <i className="flaticon-health text-4xl text-primary transition-colors duration-300 group-hover:text-[#dec06a]"></i>
                        </div>
                      )}
                    </div>

                    <div className="flex-grow">
                      <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                        {service.name_ar}
                      </h2>
                      <p className="text-gray-600 mb-4 text-sm">{service.description}</p>

                      {/* Department Name */}
                      <div className="mb-3">
                        <span className="text-xs text-gray-500">القسم:</span>
                        <p className="text-sm font-medium text-gray-700">
                          {service.department_name || "غير محدد"}
                        </p>
                      </div>

                      {/* Branch Information */}
                      {service.branch_names && service.branch_names.length > 0 ? (
                        <div className="mb-3">
                          <span className="text-xs text-gray-500">الفروع المتاحة:</span>
                          <div className="mt-1">
                            {service.branch_names.map((branch, branchIndex) => (
                              <span
                                key={branchIndex}
                                className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full mr-1 mb-1"
                              >
                                {branch}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      {/* Doctors Information */}
                      {service.doctor_names && service.doctor_names.length > 0 ? (
                        <div className="mb-3">
                          <span className="text-xs text-gray-500">الأطباء المتاحون:</span>
                          <div className="mt-1">
                            {service.doctor_names.map((doctor, doctorIndex) => (
                              <span
                                key={doctorIndex}
                                className="inline-block text-[#dec06a] text-lg px-2 py-1 rounded-full mr-1 mb-1"
                              >
                                {doctor}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>

                    {/* View Details Button */}
                    <div className="mt-auto pt-4">
                      <button
                        className="w-full py-2 px-4 bg-[#dec06a] text-white rounded-lg hover:bg-[#c0a84a] transition-colors duration-300 text-sm font-medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleServiceClick(service.id);
                        }}
                      >
                        عرض التفاصيل
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Arrows */}
            <button className="service-swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CBA853" strokeWidth="2">
                <path d="M15 18L9 12L15 6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <button className="service-swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CBA853" strokeWidth="2">
                <path d="M9 18L15 12L9 6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Pagination */}
            <div className="service-swiper-pagination mt-4 flex justify-center gap-1"></div>
          </div>
        )}

        {/* Centered "Show All Services" Button */}
        {services.length > 0 && (
          <div className="flex justify-center mt-12">
            <Link
              href="/services"
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
              <span className="flex-1 text-end">عرض جميع الخدمات</span>
            </Link>
          </div>
        )}
      </div>

      <style jsx global>{`
        .rtl .flaticon-right-arrow {
          transform: rotate(180deg);
        }
        .rtl .flaticon-left-arrow {
          transform: rotate(180deg);
        }
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
    </section>
  );
};

export default ServiceSection;
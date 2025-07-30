"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { fetchServices } from "../../../store/slices/services";
import { useRouter } from "next/router";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import getImageUrl from "../../../utilies/getImageUrl"; 

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
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesToShow.map((service, index) => (
                <div
                  key={service.id || index}
                  className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-full flex flex-col cursor-pointer group"
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
                    ) : (
                      <div className="mb-3">
                        <span className="text-xs text-gray-500">الفروع المتاحة:</span>
                        <p className="text-sm text-gray-500">غير متوفر في فروع محددة</p>
                      </div>
                    )}

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
                    ) : (
                      <div className="mb-3">
                        <span className="text-xs text-gray-500">الأطباء المتاحون:</span>
                        <p className="text-sm text-gray-500">لا يوجد أطباء محددون</p>
                      </div>
                    )}
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
              ))}
            </div>

            {/* Centered "Show All Services" Button */}
            <div className="flex justify-center mt-12">
              <Link
                href="/services"
                className="relative pl-16 inline-flex items-center justify-between 
                           bg-gradient-to-b from-[#A58532] via-[#CBA853] to-[#f0db83]
                           text-white font-bold rounded-full py-3 px-8
                           hover:-translate-y-1 hover:shadow-md transition-all duration-300 gap-4"
              >
                {/* Arrow on the left */}
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

                {/* Text on the right */}
                <span className="flex-1 text-end">عرض جميع الخدمات</span>
              </Link>
            </div>
          </>
        )}
      </div>

      <style jsx global>{`
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
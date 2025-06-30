"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { fetchServices } from "../../../store/slices/services";
import { useRouter } from "next/router";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

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

  const servicesToShow =
    services.length === 0 ? [] : services.slice(sliceStart, sliceEnd);

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesToShow.map((service, index) => (
              <div
                key={index}
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
                            {getBranchName(branch)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Interactive progress indicator */}
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-auto">
                  <div
                    className="bg-[#dec06a] h-1.5 rounded-full transition-all duration-500 ease-out"
                    style={{ width: "0%" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.width = "100%")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.width = "0%")
                    }
                  ></div>
                </div>
              </div>
            ))}
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
      `}</style>
    </section>
  );
};

export default ServiceSection;
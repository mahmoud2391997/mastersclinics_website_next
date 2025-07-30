"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import getImageUrl from "../../../utilies/getImageUrl";
import Image from "next/image";

const ServiceSection = ({ services = [], searchTerm = '', selectedDepartment = null }) => {
  const router = useRouter();

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

  const filteredServices = services.filter(service => {
    // Filter by department if selected
    if (selectedDepartment && service.department_id !== selectedDepartment) {
      return false;
    }
    
    // Filter by search term if provided
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        (service.name_ar && service.name_ar.toLowerCase().includes(term)) ||
        (service.name_en && service.name_en.toLowerCase().includes(term)) ||
        (service.description && service.description.toLowerCase().includes(term)) ||
        (service.department_name && service.department_name.toLowerCase().includes(term))
      );
    }
    
    return true;
  });

  const handleServiceClick = (id) => {
    router.push(`/services/${id}`);
  };

  return (
    <section className="rtl w-full" dir="rtl">
      <div className="w-full py-8">
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-3xl text-center mx-auto">
            <SectionTitle
              title="خدمات الأقسام الطبية"
              subtitle="خدماتنا الصحية"
            />
          </div>
        </div>

        {filteredServices.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-600">لا توجد خدمات متاحة</h3>
            <p className="text-gray-500 mt-2">حاول تغيير فلتر البحث أو اختيار قسم آخر</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-full flex flex-col cursor-pointer group"
                onClick={() => handleServiceClick(service.id)}
              >
                <div className="mb-4 flex justify-center items-center w-full min-h-[120px]">
                  {service.image ? (
                    <Image
                      src={getImageUrl(service.image)}
                      alt={service.name_ar || service.name_en || "Service"}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover border border-[#dec06a]/30 bg-gray-50 rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-lg">
                      <i className="flaticon-health text-4xl text-primary transition-colors duration-300 group-hover:text-[#dec06a]"></i>
                    </div>
                  )}
                </div>

                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                      {service.name_ar}
                    </h2>
                    <div className="flex gap-2">
                      <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                        {service.doctors_ids?.length || 0} أطباء
                      </span>
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        {service.branches?.length || 0} فروع
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-3 text-sm">
                    {service.description || "خدمة مقدمة من قسم علاجى"}
                  </p>

                  {service.department_name && (
                    <p className="text-[#dec06a] mb-3 text-sm">
                      <span className="text-gray-600">القسم: </span>
                      {service.department_name}
                    </p>
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
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default React.memo(ServiceSection);
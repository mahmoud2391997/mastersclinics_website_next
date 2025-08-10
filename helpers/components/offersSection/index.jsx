import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOffers } from "../../../store/slices/offers";
import React, {  useCallback, useMemo } from 'react';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import TourCard from "../adsSlider/OfferCard";
import SectionTitle from "../SectionTitle/SectionTitle";
import Link from "next/link";
const OffersSection = ({ isOfferPage = false, urlDepartmentId = null }) => {
  const dispatch = useDispatch();
  const { items: offers, loading, error } = useSelector((state) => state.offers);
  
  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [filteredOffers, setFilteredOffers] = useState([]);
  
  // Extract all unique branches and departments
  const { branches, departments } = useMemo(() => {
    const branchesMap = new Map();
    const departmentsMap = new Map();

    offers.forEach(offer => {
      // Extract branches
      offer.branches.forEach(branch => {
        if (!branchesMap.has(branch.id)) {
          branchesMap.set(branch.id, branch);
        }
      });

      // Extract departments from doctors using department_name
      offer.doctors_ids.forEach(doctor => {
        if (doctor.department_id && doctor.department_name && !departmentsMap.has(doctor.department_id)) {
          departmentsMap.set(doctor.department_id, {
            id: doctor.department_id,
            name: doctor.department_name // Using department_name instead of specialty
          });
        }
      });
    });

    return {
      branches: Array.from(branchesMap.values()).sort((a, b) => a.name.localeCompare(b.name)),
      departments: Array.from(departmentsMap.values()).sort((a, b) => a.name.localeCompare(b.name))
    };
  }, [offers]);

  // Initialize department from URL
  useEffect(() => {
    if (urlDepartmentId) {
      const deptId = Number.parseInt(urlDepartmentId, 10);
      if (!isNaN(deptId)) {
        setSelectedDepartment(deptId);
      }
    }
  }, [urlDepartmentId]);

  // Fetch offers on mount
  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  // Filter offers whenever filters change
  useEffect(() => {
    if (offers.length > 0) {
      filterOffers();
    }
  }, [offers, searchTerm, selectedBranch, selectedDepartment]);

  const filterOffers = useCallback(() => {
    let results = offers;

    // Filter by search term
    if (searchTerm) {
      results = results.filter(offer => 
        offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.doctors_ids.some(doctor => 
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (doctor.department_name && doctor.department_name.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      );
    }

    // Filter by branch
    if (selectedBranch !== "all") {
      results = results.filter(offer => 
        offer.branches.some(b => b.id == selectedBranch)
      );
    }

    // Filter by department - using department_id but displaying department_name
    if (selectedDepartment) {
      results = results.filter(offer =>
        offer.doctors_ids.some(d => d.department_id == selectedDepartment)
      );
    }

    setFilteredOffers(results);
  }, [offers, searchTerm, selectedBranch, selectedDepartment]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value);
  };

  const handleDepartmentChange = (deptId) => {
    setSelectedDepartment(deptId === selectedDepartment ? null : deptId);
  };

  if (loading) {
    return <p className="text-center py-8">جاري التحميل...</p>;
  }

  if (error) {
    return <p className="text-center py-8 text-red-500">حدث خطأ: {error}</p>;
  }

  return (
    <div className="w-full relative mt-5" dir="rtl">
      {isOfferPage && (
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="service_sidebar space-y-6 sticky top-4 rtl">
              {/* Search Widget */}
              <div className="search_widget widget bg-white p-4 rounded-lg shadow-sm">
                <form onSubmit={(e) => e.preventDefault()} className="relative">
                  <input
                    type="text"
                    placeholder="ابحث عن عرض، وصف، طبيب أو تخصص..."
                    className="w-full p-2 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#dec06a] focus:border-transparent"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <svg
                    className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </form>
              </div>

              {/* Departments Filter */}
              <div className="departments_widget widget bg-white p-4 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-right text-[#dec06a]">الأقسام الطبية</h2>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  <button
                    onClick={() => handleDepartmentChange(null)}
                    className={`w-full text-right py-2 px-3 rounded transition ${
                      !selectedDepartment ? "bg-[#dec06a] text-white" : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    جميع الأقسام
                  </button>
                  {departments.map((department) => (
                    <button
                      key={department.id}
                      onClick={() => handleDepartmentChange(department.id)}
                      className={`w-full text-right py-2 px-3 rounded transition ${
                        selectedDepartment === department.id
                          ? "bg-[#dec06a] text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {department.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Branches Filter */}
              <div className="branches_widget widget bg-white p-4 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-right text-[#dec06a]">الفروع</h2>
                <select
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#dec06a] focus:border-transparent"
                  value={selectedBranch}
                  onChange={handleBranchChange}
                >
                  <option value="all">جميع الفروع</option>
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Offers Grid */}
          <div className="lg:w-3/4">
            {filteredOffers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOffers.map((offer, index) => (
                  <div key={index} className="px-2 py-4">
                    <TourCard
                      image={offer.image}
                      name={offer.title}
                      priceAfter={offer.priceAfter}
                      priceBefore={offer.priceBefore}
                      description={offer.description}
                      branches={offer.branches}
                      doctors={offer.doctors_ids}
                      onSelect={(data) => console.log("Selected offer:", data)}
                      id={offer.id}
                    />
                  </div>
                ))}
              </div>
            ) : (
             <div className="text-center py-12">
            <h3 className="text-xl text-gray-600">لا توجد عروض متاحة</h3>
            <p className="text-gray-500 mt-2">حاول تغيير فلتر البحث أو اختيار قسم آخر</p>
          </div>
                     
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OffersSection;
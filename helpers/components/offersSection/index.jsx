import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOffers } from "../../../store/slices/offers";
import React, { useCallback, useMemo } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import TourCard from "../adsSlider/OfferCard";
import SectionTitle from "../SectionTitle/SectionTitle";
import Link from "next/link";
import { CustomSelect } from "../../main-component/ServiceSinglePage/sidebar";

const OffersSection = ({ 
  isOfferPage = false, 
  departmentId = null, 
  setShowAuthPopup,
  showTitle = true 
}) => {
  const dispatch = useDispatch();
  const { items: offers, loading, error } = useSelector((state) => state.offers);
  
  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if mobile view
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  // Extract all unique branches and departments
  const { branches, departments } = useMemo(() => {
    const branchesMap = new Map();
    const departmentsMap = new Map();

    offers.forEach(offer => {
      offer.branches.forEach(branch => {
        if (!branchesMap.has(branch.id)) {
          branchesMap.set(branch.id, branch);
        }
      });

      offer.doctors_ids.forEach(doctor => {
        if (doctor.department_id && doctor.department_name && !departmentsMap.has(doctor.department_id)) {
          departmentsMap.set(doctor.department_id, {
            id: doctor.department_id,
            name: doctor.department_name
          });
        }
      });
    });

    return {
      branches: Array.from(branchesMap.values()).sort((a, b) => a.name.localeCompare(b.name)),
      departments: Array.from(departmentsMap.values()).sort((a, b) => a.name.localeCompare(b.name))
    };
  }, [offers]);

  // Initialize department from props if provided
  useEffect(() => {
    if (departmentId) {
      setSelectedDepartment(departmentId);
    }
  }, [departmentId]);

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

    // If departmentId is provided (department-specific view), filter by that department
    if (departmentId) {
      results = results.filter(offer =>
        offer.doctors_ids.some(d => d.department_id == departmentId)
      );
    }
    // If in full offers page and a department is selected, filter by that department
    else if (isOfferPage && selectedDepartment) {
      results = results.filter(offer =>
        offer.doctors_ids.some(d => d.department_id == selectedDepartment)
      );
    }

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

    setFilteredOffers(results);
  }, [offers, searchTerm, selectedBranch, selectedDepartment, departmentId, isOfferPage]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleBranchChange = (branchId) => {
    setSelectedBranch(branchId);
  };

  const handleDepartmentChange = (deptId) => {
    setSelectedDepartment(deptId === "all" ? null : deptId);
  };

  // Determine if we should show filters
  const shouldShowFilters = isOfferPage || !departmentId;

  if (loading) {
    return <p className="text-center py-8">جاري التحميل...</p>;
  }

  if (error) {
    return <p className="text-center py-8 text-red-500">حدث خطأ: {error}</p>;
  }

  return (
    <div className="w-full relative mt-5" dir="rtl">
      {/* Section Title for department-specific view */}
      {departmentId && showTitle && (
        <SectionTitle
          title="عروض القسم"
          subtitle="استفد من العروض الحصرية المتاحة في هذا القسم"
          dir="rtl"
        />
      )}
      
      {/* Filter Bar */}
      {shouldShowFilters && (
        <div className="container mx-auto px-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            {/* Desktop Department Tabs - Only show in full offers page */}
            {isOfferPage && (
              <div className="hidden md:block mb-4">
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => handleDepartmentChange("all")}
                    className={`flex-1 px-6 py-3 text-sm font-medium text-center ${
                      !selectedDepartment
                        ? 'text-[#dec06a] border-b-2 border-[#dec06a]'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    الكل
                  </button>

                  {departments.map((department) => (
                    <button
                      key={department.id}
                      onClick={() => handleDepartmentChange(department.id)}
                      className={`flex-1 px-6 py-3 text-sm font-medium text-center ${
                        selectedDepartment === department.id
                          ? 'text-[#dec06a] border-b-2 border-[#dec06a]'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {department.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0 rtl">
              {/* Search Widget */}
              <div className="search_widget flex-1">
                <form onSubmit={(e) => e.preventDefault()} className="relative">
                  <input
                    className="w-full p-2 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#dec06a] focus:border-transparent"
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder={departmentId ? "ابحث في عروض القسم..." : "ابحث عن عرض، وصف، طبيب أو تخصص..."}
                  />
                  <svg
                    className="absolute left-3 top-3 h-4 w-4 text-gray-400"
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

              {/* Departments Filter - Only on mobile and only in full offers page */}
              {isOfferPage && isMobile && (
                <div className="departments_widget flex-1">
                  <CustomSelect
                    options={[
                      { value: "all", label: "جميع الأقسام" },
                      ...departments.map(department => ({
                        value: department.id,
                        label: department.name
                      }))
                    ]}
                    value={selectedDepartment || "all"}
                    onChange={handleDepartmentChange}
                    placeholder="اختر القسم"
                  />
                </div>
              )}

              {/* Branches Filter */}
              {branches.length > 0 && (
                <div className="branches_widget flex-1">
                  <CustomSelect
                    options={[
                      { value: "all", label: "جميع الفروع" },
                      ...branches.map(branch => ({
                        value: branch.id,
                        label: branch.name
                      }))
                    ]}
                    value={selectedBranch}
                    onChange={handleBranchChange}
                    placeholder="اختر الفرع"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Offers Display */}
      {filteredOffers.length > 0 ? (
        <>
          {/* For department view with multiple offers, use slider */}
          {departmentId && filteredOffers.length > 1 ? (
            <div className="container mx-auto px-4">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                navigation={true}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                className="pb-12"
              >
                {filteredOffers.map((offer, index) => (
                  <SwiperSlide key={index}>
                    <div className="px-2 py-4">
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
                        setShowAuthPopup={setShowAuthPopup}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            // Grid layout for full offers page or single offer for department view
            <div className="container mx-auto px-4">
              {isOfferPage ? (
                // Grid layout for full offers page
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
                        setShowAuthPopup={setShowAuthPopup}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                // Single offer display for department view
                <div className="flex justify-center">
                  <div className="w-full max-w-md">
                    <TourCard
                      image={filteredOffers[0].image}
                      name={filteredOffers[0].title}
                      priceAfter={filteredOffers[0].priceAfter}
                      priceBefore={filteredOffers[0].priceBefore}
                      description={filteredOffers[0].description}
                      branches={filteredOffers[0].branches}
                      doctors={filteredOffers[0].doctors_ids}
                      onSelect={(data) => console.log("Selected offer:", data)}
                      id={filteredOffers[0].id}
                      setShowAuthPopup={setShowAuthPopup}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl text-gray-600">
            {departmentId 
              ? "لا توجد عروض متاحة لهذا القسم حالياً" 
              : "لا توجد عروض متاحة"
            }
          </h3>
          <p className="text-gray-500 mt-2">
            {departmentId 
              ? "يمكنك تجربة البحث بكلمات مختلفة أو اختيار فرع آخر" 
              : "حاول تغيير فلتر البحث أو اختيار قسم آخر"
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default OffersSection;
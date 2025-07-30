import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOffers } from "../../../store/slices/offers";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import TourCard from "../adsSlider/OfferCard";
import SectionTitle from "../SectionTitle/SectionTitle";
import Link from "next/link";

export default function OffersSection({ isOfferPage = false }) {
  const dispatch = useDispatch();
  const { items: offers, loading, error } = useSelector((state) => state.offers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  useEffect(() => {
    if (offers.length > 0) {
      // Extract unique branches from offers
      const uniqueBranchesMap = new Map();
      offers.forEach(offer => {
        offer.branches.forEach(branch => {
          if (!uniqueBranchesMap.has(branch.id)) {
            uniqueBranchesMap.set(branch.id, branch);
          }
        });
      });
      const uniqueBranches = Array.from(uniqueBranchesMap.values());
      setBranches(uniqueBranches);

      // Filter offers
      filterOffers(offers, searchTerm, selectedBranch);
    } else {
      setBranches([]);
      setFilteredOffers([]);
    }
  }, [offers]);

  const filterOffers = (offersToFilter, term, branchId) => {
    let results = offersToFilter;
    
    // Filter by search term
    if (term) {
      results = results.filter(offer => 
        offer.title.toLowerCase().includes(term.toLowerCase()) ||
        offer.description.toLowerCase().includes(term.toLowerCase()) ||
        offer.doctors_ids.some(doctor => 
          doctor.name.toLowerCase().includes(term.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(term.toLowerCase())
        )
      );
    }
    
    // Filter by branch
    if (branchId !== "all") {
      results = results.filter(offer => 
        offer.branches.some(b => b.id == branchId)
      );
    }
    
    setFilteredOffers(results);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterOffers(offers, term, selectedBranch);
  };

  const handleBranchChange = (e) => {
    const branchId = e.target.value;
    setSelectedBranch(branchId);
    filterOffers(offers, searchTerm, branchId);
  };

  if (loading) {
    return <p className="text-center py-8">جاري التحميل...</p>;
  }

  if (error) {
    return <p className="text-center py-8 text-red-500">حدث خطأ: {error}</p>;
  }

  return (
    <div className="w-full relative mt-5" dir="rtl">
      {/* Search and Filter Section - Only shown when isOfferPage is true */}
      {isOfferPage && (
        <div className="flex flex-col md:flex-row gap-4 mb-8 w-[90%] mx-auto px-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث عن عرض، وصف، طبيب أو تخصص..."
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#dec06a] focus:border-transparent"
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
            </div>
          </div>
          
          <div className="w-full md:w-64">
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
      )}

      {/* All Offers Grid */}
      <div className="w-[90%] mx-auto px-4">


        {filteredOffers.length > 0 ? (
          <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
          <div className="w-full aspect-[4/5] flex items-center justify-center bg-gray-200 rounded-lg">
            {searchTerm || selectedBranch !== "all" 
              ? "لا توجد عروض متطابقة مع بحثك" 
              : "لا توجد عروض متاحة حالياً"}
          </div>
        )}
      </div>

      <style jsx global>{`
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
    </div>
  );
}
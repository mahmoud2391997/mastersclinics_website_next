"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchBranches } from "../../store/slices/branches";
import { FaMapMarkerAlt, FaClock, FaSearch } from "react-icons/fa";
import Navbar from "../../helpers/components/Navbar/Navbar";
import PageTitle from "../../helpers/components/pagetitle/PageTitle";
import { getImageUrl } from "../../helpers/hooks/imageUrl";
import Footer from "../../helpers/components/footer/Footer";
import Scrollbar from "../../helpers/components/scrollbar/scrollbar";

export const metadata = {
  title: "فروعنا",
  description: "اكتشف جميع فروعنا ومواعيد العمل",
};

const BranchesPage = () => {
  const dispatch = useDispatch();
  const { items: branches, loading, error } = useSelector((state) => state.branches);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeRegion, setActiveRegion] = useState("all");
  const [filteredBranches, setFilteredBranches] = useState([]);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  // Group branches by region for tabs
  const branchesByRegion = branches.reduce((acc, branch) => {
    if (!acc[branch.region_name]) acc[branch.region_name] = [];
    acc[branch.region_name].push(branch);
    return acc;
  }, {});

  // Add "All Branches" tab
  const allRegions = { all: branches, ...branchesByRegion };

  // Filter branches based on search term and active region
  useEffect(() => {
    let results = activeRegion === "all" 
      ? branches 
      : branchesByRegion[activeRegion] || [];

    if (searchTerm) {
      results = results.filter(branch => 
        branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        branch.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBranches(results);
  }, [activeRegion, searchTerm, branches, branchesByRegion]);

  // Set the first region as active by default when data is loaded
  useEffect(() => {
    if (!loading && !error && branches.length > 0 && !activeRegion) {
      setActiveRegion("all");
    }
  }, [loading, error, branches, activeRegion]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Navbar hclass={'wpo-site-header wpo-site-header-s2'} />
      <PageTitle 
        pageTitle={"فروعنا"} 
        pagesub="اكتشف جميع فروعنا ومواعيد العمل" 
        bgImage={"/branches.webp"} 
      />

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
        {loading && <p className="text-center text-lg">جاري التحميل...</p>}
        {error && <p className="text-center text-red-500">حدث خطأ: {error}</p>}
        
        {!loading && !error && (
          <>
            {/* Search Box */}
            <div className="mb-6 relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="ابحث عن فرع بالاسم أو العنوان..."
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-[#dec06a] focus:border-[#dec06a]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Region Tabs with All Branches */}
            <div className="w-full mb-8">
              <div className="flex w-full overflow-x-auto pb-2">
                {Object.keys(allRegions).map((region) => (
                  <button
                    key={region}
                    onClick={() => setActiveRegion(region)}
                    className={`flex-1 min-w-max py-3 px-1 md:px-4 text-center font-medium text-sm whitespace-nowrap transition-colors ${
                      activeRegion === region
                        ? 'bg-[#dec06a] text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    } first:rounded-r-lg last:rounded-l-lg border border-gray-200`}
                  >
                    {region === "all" ? "جميع الفروع" : region}
                  </button>
                ))}
              </div>
            </div>

            {/* Branches Grid */}
            {filteredBranches.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">لا توجد فروع متطابقة مع بحثك</p>
              </div>
            ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {filteredBranches.map((branch) => (
    <div 
      key={branch.id} 
      className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full hover:shadow-xl transition-shadow"
    >
      {/* Clickable image for Google Maps */}
      <a 
        href={branch.google_map_link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block w-full h-48 hover:opacity-90 transition-opacity"
      >
        <img
          className="w-full h-full object-cover"
          src={getImageUrl(branch.image_url) || "https://cdn.salla.sa/dEYvd/EObtK4Gx7k6mKsNWYobYNsczGSRhLYDESyQm7jnp.jpg"}
          alt={branch.name}
        />
      </a>

      <div className="p-6 flex-grow">
        {/* Branch name links to branch details page */}
<Link 
          href={`/branches/${branch.id}`}
          className="block text-xl font-bold !text-gray-800 mb-3 hover:!text-[#dec06a] transition-colors"
        >
          {branch.name}
        </Link>

        {/* Clickable address for Google Maps */}
        <a 
          href={branch.google_map_link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-start mt-4 group"
        >
          <FaMapMarkerAlt className="text-[#dec06a] mt-1 ml-2 flex-shrink-0" />
          <p className="text-gray-600 hover:text-[#dec06a] transition-colors">
            {branch.address}
          </p>
        </a>

        {/* Working hours */}
        <div className="flex items-start mt-4">
          <FaClock className="text-[#dec06a] mt-1 ml-2 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-gray-700">مواعيد العمل:</h4>
            {branch.working_hours ? (
              <ul className="mt-1 space-y-1">
                {branch.working_hours.map((hours, idx) => (
                  <li key={idx} className="text-gray-600 text-sm">
                    <span className="font-medium">{hours.days}:</span> {hours.time}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">مواعيد العمل غير متاحة</p>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 pt-0">
        <div className="flex flex-col gap-3">
          <Link
            href={`/branches/${branch.id}`}
            className="px-4 py-2 border-2 border-[#dec06a] text-sm font-medium rounded-lg text-[#dec06a] bg-white hover:bg-[#dec06a] hover:text-white text-center transition-colors"
style={{ color: "#dec06a" }}
       
       >
            المزيد من التفاصيل
          </Link>
        </div>
      </div>
    </div>
  ))}
</div>
            )}
          </>
        )}
      </div>
      
      <Footer hclass={'wpo-site-footer'} />
                  <Scrollbar />

    </div>
  );
};

export default BranchesPage;
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchBranches } from "../../store/slices/branches"; // adjust import path if needed
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import Navbar from "../../helpers/components/Navbar/Navbar";
import PageTitle from "../../helpers/components/pagetitle/PageTitle";
import { getImageUrl } from "../../helpers/hooks/imageUrl";

export const metadata = {
  title: "فروعنا",
  description: "اكتشف جميع فروعنا ومواعيد العمل",
};

const BranchesPage = () => {
  const dispatch = useDispatch();
  const { items: branches, loading, error } = useSelector((state) => state.branches);
  console.log(branches);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const branchesByRegion = branches.reduce((acc, branch) => {
    if (!acc[branch.region_name]) acc[branch.region_name] = [];
    acc[branch.region_name].push(branch);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Navbar hclass={'wpo-site-header wpo-site-header-s2'} />
      <PageTitle pageTitle={"فروعنا"} pagesub="اكتشف جميع فروعنا ومواعيد العمل" bgImage={"https://cdn.salla.sa/dEYvd/LgUfWipbId1zQL4vAXAdXtPnedinmGRFunfGfZzN.jpg"} />

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
        {loading && <p className="text-center text-lg">جاري التحميل...</p>}
        {error && <p className="text-center text-red-500">حدث خطأ: {error}</p>}
        {!loading && !error && Object.entries(branchesByRegion).map(([region, regionBranches]) => (
          <div key={region} className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 pb-2 border-b-2 border-[#dec06a]">
              {region}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regionBranches.map((branch) => (
                <div key={branch.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full">
                  {/* Branch image */}
                  <div className="w-full h-48">
                    <img
                      className="w-full h-full object-cover"
                      src={getImageUrl(branch.image_url) || "https://cdn.salla.sa/dEYvd/EObtK4Gx7k6mKsNWYobYNsczGSRhLYDESyQm7jnp.jpg"}
                      alt={branch.name}
                    />
                  </div>

                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{branch.name}</h3>

                    <div className="flex items-start mt-4">
                      <FaMapMarkerAlt className="text-[#dec06a] mt-1 ml-2 flex-shrink-0" />
                      <p className="text-gray-600">{branch.address}</p>
                    </div>

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
                        className="px-4 py-2 border-2 border-[#dec06a] text-sm font-medium rounded-lg text-[#dec06a] bg-white hover:bg-gray-50 text-center transition-colors"
                        style={{ color: "#dec06a" }}
                      >
                        المزيد من التفاصيل
                      </Link>
                      <a
                        href={branch.location_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border-2 border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-[#dec06a] hover:bg-[#dec06a]-dark text-center transition-colors"
                      >
                        عرض على الخريطة
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BranchesPage;
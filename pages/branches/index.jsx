"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchBranches } from "../../store/slices/branches"; // adjust import path if needed
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import Navbar from "../../src/components/Navbar/Navbar";
import PageTitle from "../../src/components/pagetitle/PageTitle";

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
    if (!acc[branch.region]) acc[branch.region] = [];
    acc[branch.region].push(branch);
    return acc;
  }, {});

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      {/* Hero Section */}
  <Navbar hclass={'wpo-site-header wpo-site-header-s2'} />
      <PageTitle pageTitle={"فروعنا"} pagesub="اكتشف جميع فروعنا ومواعيد العمل" />

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {loading && <p className="text-center text-lg">جاري التحميل...</p>}
        {error && <p className="text-center text-red-500">حدث خطأ: {error}</p>}
        {!loading && !error && Object.entries(branchesByRegion).map(([region, regionBranches]) => (
          <div key={region} className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 pb-2 border-b-2 border-[#dec06a]">
              {region}
            </h2>
            <div className="space-y-12">
              {regionBranches.map((branch) => (
                <div key={branch.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  {/* Full-width image */}
                  <div className="w-full ">
                    <img
                      className="w-full h-full object-cover"
                      src={branch.imageUrl || "https://cdn.salla.sa/dEYvd/EObtK4Gx7k6mKsNWYobYNsczGSRhLYDESyQm7jnp.jpg"}
                      alt={branch.name}
                    />
                  </div>

                  <div className="p-6 md:p-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{branch.name}</h3>

                    <div className="flex items-start mt-4">
                      <FaMapMarkerAlt className="text-[#dec06a] mt-1 ml-2 flex-shrink-0" />
                      <p className="text-gray-600 text-lg">{branch.address}</p>
                    </div>

                    <div className="flex items-start mt-5">
                      <FaClock className="text-[#dec06a] mt-1 ml-2 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-700 text-lg">مواعيد العمل:</h4>
                        {branch.working_hours ? (
                          <ul className="mt-2 space-y-1">
                            {branch.working_hours.map((hours, idx) => (
                              <li key={idx} className="text-gray-600">
                                <span className="font-medium">{hours.days}:</span> {hours.time}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-500">مواعيد العمل غير متاحة</p>
                        )}
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                      <Link
                        href={`/branches/${branch.id}`}
                        className="px-6 py-3 border-2 border-[#dec06a] text-lg font-medium rounded-lg text-[#dec06a] bg-white hover:bg-gray-50 text-center transition-colors" style={{ color: "#dec06a" }}
                      >
                        المزيد من التفاصيل
                      </Link>
                      <a
                        href={branch.location_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 border-2 border-transparent text-lg font-medium rounded-lg shadow-sm text-white bg-[#dec06a] hover:bg-[#dec06a]-dark text-center transition-colors"
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

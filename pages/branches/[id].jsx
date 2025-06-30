"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { fetchBranchById } from "../../store/slices/branches";
import { FaMapMarkerAlt, FaClock, FaArrowLeft, FaPhone, FaEnvelope } from "react-icons/fa";
import { Nav } from "reactstrap";
import Navbar from "../../src/components/Navbar/Navbar";
import PageTitle from "../../src/components/pagetitle/PageTitle";

const BranchPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
console.log(id);

  const { selectedBranch: branch, loading, error } = useSelector((state) => state.branches);

  useEffect(() => {
    if (id) {
      dispatch(fetchBranchById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div dir="rtl" className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl">جاري التحميل...</p>
      </div>
    );
  }

  if (error || !branch) {
    return (
      <div dir="rtl" className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">الفرع غير موجود</h1>
          <Link href="/branches" className="text-[#dec06a] hover:underline mt-4 inline-block">
            العودة إلى قائمة الفروع
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div dir="rtl" className="bg-gray-50">
      <Navbar hclass={'wpo-site-header wpo-site-header-s2'} />
      <PageTitle pageTitle={branch.name} pagesub="تفاصيل الفرع" />
      {/* Full-width hero image */}
      <div className="relative  py-12 px-4
       max-w-7xl m-auto mt-5 md:h-screen/2">
        <img
          className="w-full h-full object-cover"
          src={branch.imageUrl}
          alt={branch.name}
        />
   
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
       

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Branch Info */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">معلومات الفرع</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-[#dec06a] mt-1 ml-3 text-xl flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-700 text-xl mb-2">العنوان</h3>
                  <p className="text-gray-600 text-lg">{branch.address}</p>
                  <a
                    href={branch.location_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-[#dec06a] hover:underline text-lg"
                    style={{ color: "#dec06a"}}
                  >
                    عرض على الخريطة
                  </a>
                </div>
              </div>
              
              {branch.working_hours && (
                <div className="flex items-start">
                  <FaClock className="text-[#dec06a] mt-1 ml-3 text-xl flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-700 text-xl mb-2">مواعيد العمل</h3>
                    <ul className="space-y-2">
                      {branch.working_hours.map((hours, idx) => (
                        <li key={idx} className="text-gray-600 text-lg">
                          <span className="font-medium">{hours.days}:</span> {hours.time}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              <div className="flex items-start">
                <FaPhone className="text-[#dec06a] mt-1 ml-3 text-xl flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-700 text-xl mb-2">الهاتف</h3>
                  <p className="text-gray-600 text-lg">+966 12 345 6789</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FaEnvelope className="text-[#dec06a] mt-1 ml-3 text-xl flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-700 text-xl mb-2">البريد الإلكتروني</h3>
                  <p className="text-gray-600 text-lg">info@branch{branch.id}.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-full">
              <iframe
                src={`https://maps.google.com/maps?q=${branch.coordinates.latitude},${branch.coordinates.longitude}&z=15&output=embed`}
                width="100%"
                height="100%"
                className="min-h-[400px] lg:min-h-[500px]"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Full-width Gallery */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">معرض الصور</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((img) => (
              <div key={img} className="overflow-hidden rounded-xl shadow-md">
                <img
                  className="w-full  object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                  src={branch.imageUrl}
                  alt={`${branch.name} - صورة ${img}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchPage;

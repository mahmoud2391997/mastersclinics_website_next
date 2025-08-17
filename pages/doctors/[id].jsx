"use client";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { fetchTeamById } from "../../store/slices/doctor";
import { FaMapMarkerAlt, FaClock, FaClinicMedical, FaUser } from "react-icons/fa";
import { MdMedicalServices } from "react-icons/md";
import Navbar from "../../helpers/components/Navbar/Navbar";
import PageTitle from "../../helpers/components/pagetitle/PageTitle";
import Footer from "../../helpers/components/footer/Footer";
import Scrollbar from "../../helpers/components/scrollbar/scrollbar";
import { getImageUrl } from "../../helpers/hooks/imageUrl";
import Link from "next/link";
import CtafromSection from "../../helpers/components/Form";
import WishlistButton from "../../helpers/hooks/WishlistButton";

const TeamSinglePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const {
    selectedTeam: currentMember = null,
    loading: doctorLoading = false,
    error: doctorError = null,
  } = useSelector((state) => state.teams || {});

  const [showAuthPopup, setShowAuthPopup] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchTeamById(id));
    }
  }, [dispatch, id]);

  if (doctorLoading) return <div className="text-center py-20">جاري تحميل الملف الشخصي للطبيب...</div>;
  if (doctorError) return <div className="text-center py-20 text-danger">خطأ: {doctorError}</div>;
  if (!currentMember) return <div className="text-center py-20">بيانات الطبيب غير متوفرة</div>;

  const services = currentMember.services
    ? currentMember.services.split(",").map((service) => service.trim())
    : [];

  const BranchCard = ({ branch }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-all hover:shadow-xl">
      <div className="w-full h-48 relative overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform hover:scale-105"
          src={getImageUrl(branch.image_url) || "https://cdn.salla.sa/dEYvd/EObtK4Gx7k6mKsNWYobYNsczGSRhLYDESyQm7jnp.jpg"}
          alt={branch.name}
          onError={(e) => {
            e.target.src = "https://cdn.salla.sa/dEYvd/EObtK4Gx7k6mKsNWYobYNsczGSRhLYDESyQm7jnp.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 flex items-end">
          <h3 className="text-xl font-bold text-white">{branch.name}</h3>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="bg-[#f8f3e6] p-2 rounded-full">
            <FaMapMarkerAlt className="text-[#dec06a] text-lg" />
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-1">العنوان:</h4>
            <p className="text-gray-600">{branch.address.replace(/"/g, '')}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-[#f8f3e6] p-2 rounded-full">
            <FaClock className="text-[#dec06a] text-lg" />
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-1">مواعيد العمل:</h4>
            <p className="text-gray-600">من السبت إلى الأربعاء، 9:00 صباحًا - 10:00 مساءً</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <a
            href={branch.location_link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 bg-[#dec06a] text-white font-medium rounded-lg text-center hover:bg-[#d4b45c] transition-colors flex items-center justify-center gap-2"
          >
            <FaMapMarkerAlt />
            عرض على الخريطة
          </a>
          <Link
            href={`/branches/${branch.id}`}
            className="px-4 py-3 border-2 border-[#dec06a] !text-[#dec06a] font-medium rounded-lg text-center hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <FaClinicMedical />
            المزيد عن الفرع
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <Fragment>
      <Navbar hclass={"wpo-site-header wpo-site-header-s2"} showAuthPopup={showAuthPopup}/>
      <PageTitle
        pageTitle={currentMember.name || "الطبيب"}
        pagesub={currentMember.specialty || "أخصائي"}
        bgImage={'/doctors.png'}
      />

      <section className="team_single_page section-padding" dir="rtl">
        <div className="container">
          <div className="flex flex-col lg:flex-row-reverse gap-8">
            <div className="lg:w-2/3">
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 relative">
                <WishlistButton
                  itemId={currentMember.id}
                  itemType="doctor"
                  setShowAuthPopup={setShowAuthPopup}
                  className="absolute top-4 left-4 z-10"
                />

                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 relative">
                    <div className="h-full bg-gradient-to-br from-[#dec06a] via-[#d4b45c] to-[#c9a347] p-2">
                      <div className="h-full bg-white p-2">
                        <img
                          src={getImageUrl(currentMember.image) || "/download.png"}
                          alt={currentMember.name}
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = "/download.png";
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 p-6">
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">{currentMember.name}</h1>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="bg-[#f0e9d8] text-[#b89a3a] px-3 py-1 rounded-full text-sm font-medium">
                            {currentMember.specialty}
                          </span>
                          <span className="bg-[#e8f0fe] text-[#1a73e8] px-3 py-1 rounded-full text-sm font-medium">
                            {currentMember.department.name}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-6">
                          طبيب متخصص في {currentMember.specialty} مع سنوات من الخبرة في تقديم أفضل العلاجات والرعاية الطبية.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold mb-6 pb-3 border-b border-gray-200 flex items-center gap-2">
                  <MdMedicalServices className="text-[#dec06a]" />
                  الخدمات الطبية
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-[#f9f5e9] transition-colors">
                      <span className="bg-[#dec06a] text-white rounded-full w-6 h-6 flex items-center justify-center mt-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-gray-700 font-medium">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {currentMember.branch && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-6 pb-3 border-b border-gray-200 flex items-center gap-2">
                    <FaClinicMedical className="text-[#dec06a]" />
                    معلومات الفرع
                  </h2>
                  <BranchCard branch={currentMember.branch} />
                </div>
              )}

              <div id="appointment-form" className="AppointmentFrom bg-white rounded-xl shadow-md overflow-hidden">
                <div className="cta_form_s2">
                  <div className="title s2 p-6 bg-[#f9f5e9] border-b border-[#e8d9a8]">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">حجز موعد</h3>
                    <p className="text-gray-600">
                      تواصل معنا لحجز موعد مع الدكتور {currentMember.name}
                    </p>
                  </div>
                  <div className="p-6">
                    <CtafromSection />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/3">
              {currentMember.department && (
                <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-8">
                  <div className="bg-gradient-to-r from-[#dec06a] to-[#d4b45c] p-4 text-center">
                    <h2 className="text-xl font-bold text-white">
                      {currentMember.department.name}
                    </h2>
                  </div>
                  <div className="p-6">
                    <div className="h-40 overflow-hidden mb-4 rounded-lg">
                      <img
                        src={getImageUrl(currentMember.department.image) || "/images/dept-default.jpg"}
                        alt={currentMember.department.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-gray-600 mb-6 line-clamp-6">
                      {currentMember.department.description}
                    </p>
                    <Link
                      href={`/departments/${currentMember.department.id}`}
                      className="block w-full text-center px-4 py-3 bg-[#dec06a] text-white rounded-lg hover:bg-[#d4b45c] transition-colors flex items-center justify-center gap-2"
                    >
                      <FaUser />
                      المزيد عن القسم
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer hclass={"wpo-site-footer"} />
      <Scrollbar />
    </Fragment>
  );
};

export default TeamSinglePage;
"use client";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { fetchTeamById } from "../../store/slices/doctor";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import Navbar from "../../helpers/components/Navbar/Navbar";
import PageTitle from "../../helpers/components/pagetitle/PageTitle";
import Footer from "../../helpers/components/footer/Footer";
import Scrollbar from "../../helpers/components/scrollbar/scrollbar";
import ContactForm from "../../helpers/main-component/ServiceSinglePage/ServiceFrom";
import { getImageUrl } from "../../helpers/hooks/imageUrl";
import { Link } from "lucide-react";

const TeamSinglePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const {
    selectedTeam: currentMember = null,
    loading: doctorLoading = false,
    error: doctorError = null,
  } = useSelector((state) => state.teams || {});

  useEffect(() => {
    if (id) {
      dispatch(fetchTeamById(id));
    }
  }, [dispatch, id]);

  if (doctorLoading) return <div className="text-center py-5">جاري تحميل الملف الشخصي للطبيب...</div>;
  if (doctorError) return <div className="text-center py-5 text-danger">خطأ: {doctorError}</div>;
  if (!currentMember) return <div className="text-center py-5">بيانات الطبيب غير متوفرة</div>;

  const services = currentMember.services
    ? currentMember.services.split(",").map((service) => service.trim())
    : [];

  // Branch Card Component
  const BranchCard = ({ branch }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-8 border border-gray-200">
      <div className="w-full h-48 relative">
        <img
          className="w-full h-full object-cover"
          src={getImageUrl(branch.image_url) || "https://cdn.salla.sa/dEYvd/EObtK4Gx7k6mKsNWYobYNsczGSRhLYDESyQm7jnp.jpg"}
          alt={branch.name}
          onError={(e) => {
            e.target.src = "https://cdn.salla.sa/dEYvd/EObtK4Gx7k6mKsNWYobYNsczGSRhLYDESyQm7jnp.jpg";
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-xl font-bold text-white">{branch.name}</h3>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start mb-4">
          <FaMapMarkerAlt className="text-[#dec06a] mt-1 ml-2 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-gray-700">العنوان:</h4>
            <p className="text-gray-600">{branch.address.replace(/"/g, '')}</p>
          </div>
        </div>

        <div className="flex items-start mb-6">
          <FaClock className="text-[#dec06a] mt-1 ml-2 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-gray-700">مواعيد العمل:</h4>
            <p className="text-gray-600">من السبت إلى الأربعاء، 9:00 صباحًا - 10:00 مساءً</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href={branch.location_link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#dec06a] text-white font-medium rounded-lg text-center hover:bg-[#d4b45c] transition-colors"
          >
            عرض على الخريطة
          </a>
          <Link
            href={`/branches/${branch.id}`}
            className="px-4 py-2 border-2 border-[#dec06a] text-[#dec06a] font-medium rounded-lg text-center hover:bg-gray-50 transition-colors"
          >
            المزيد عن الفرع
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <Fragment>
      <Navbar hclass={"wpo-site-header wpo-site-header-s2"} />
      <PageTitle
        pageTitle={currentMember.name || "الطبيب"}
        pagesub={currentMember.specialty || "أخصائي"}
      />

      <section className="team_single_page section-padding" dir="rtl">
        <div className="container">
          <div className="flex flex-col lg:flex-row-reverse gap-8">
            {/* Main Content Column */}
            <div className="lg:w-2/3">
              <div className="flex flex-col lg:flex-row-reverse gap-8">
                {/* Doctor Image Section */}
                <div className="lg:w-1/2">
                  <div className="doctor_profile sticky top-8">
                    <div className="bg-gradient-to-br from-[#dec06a] via-[#d4b45c] to-[#c9a347] p-3 rounded-[25px] shadow-md">
                      <div className="bg-white p-3 rounded-[20px]">
                        <img
                          src={getImageUrl(currentMember.image) || "/download.png"}
                          alt={currentMember.name}
                          className="w-full h-auto rounded-lg shadow-lg"
                          onError={(e) => {
                            e.target.src = "/download.png";
                          }}
                        />
                      </div>
                    </div>
                    <div className="mt-6 text-center lg:text-right">
                      <h3 className="text-2xl font-bold text-gray-800">{currentMember.name}</h3>
                      <p className="text-[#dec06a] text-lg mt-2">{currentMember.specialty}</p>
                      <p className="text-gray-600 mt-1">{currentMember.department_name}</p>
                    </div>
                  </div>
                </div>

                {/* Doctor Services Section */}
                <div className="lg:w-1/2">
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-[#dec06a]">
                      الخدمات الطبية
                    </h2>
                    <ul className="space-y-3">
                      {services.map((service, index) => (
                        <li key={index} className="flex items-start">
                          <span className="bg-[#dec06a] text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                            •
                          </span>
                          <span className="text-gray-700">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Branch Information Section */}
              {currentMember.branch && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-[#dec06a]">
                    معلومات الفرع
                  </h2>
                  <BranchCard branch={currentMember.branch} />
                </div>
              )}

              {/* Appointment Form Section */}
              <div className="mt-16 bg-gray-50 rounded-xl p-8 shadow-sm">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">حجز موعد</h3>
                  <p className="text-gray-600">
                    تواصل معنا لحجز موعد مع الدكتور {currentMember.name}
                  </p>
                </div>
                <ContactForm doctorId={currentMember.id} />
              </div>
            </div>

            {/* Department Info Sidebar */}
            <div className="lg:w-1/3">
              {currentMember.department && (
                <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
                  <h2 className="text-xl font-bold mb-4 text-[#000B47]">
                    {currentMember.department.name}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-6">
                    {currentMember.department.description}
                  </p>
                  <Link
                    href={`/departments/${currentMember.department.id}`}
                    className="block w-full text-center px-4 py-2 bg-[#dec06a] text-white rounded-lg hover:bg-[#d4b45c] transition-colors"
                  >
                    المزيد عن القسم
                  </Link>
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
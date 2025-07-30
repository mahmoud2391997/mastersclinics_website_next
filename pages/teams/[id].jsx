"use client";

import { Fragment, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { fetchTeamById } from "../../store/slices/doctor";
import { fetchBlogs } from "../../store/slices/blogs";

import Navbar from "../../helpers/components/Navbar/Navbar";
import PageTitle from "../../helpers/components/pagetitle/PageTitle";
import Footer from "../../helpers/components/footer/Footer";
import Scrollbar from "../../helpers/components/scrollbar/scrollbar";
import ContactForm from "../../helpers/main-component/ServiceSinglePage/ServiceFrom";

import logo from "../../helpers/images/logo-2.svg";
import { getImageUrl } from "../../helpers/hooks/imageUrl";
import BlogSidebar from "../../helpers/components/BlogSidebar/BlogSidebar";

const TeamSinglePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const [searchText, setSearchText] = useState("");

  const ArrowIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#dec06a"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="ml-2 mt-1 transform rotate-180"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );

  const {
    selectedTeam: currentMember = null,
    loading: doctorLoading = false,
    error: doctorError = null,
  } = useSelector((state) => state.teams || {});

  const {
    items: blogs = [],
    loading: blogLoading = false,
  } = useSelector((state) => state.blogs || {});

  const handleSearch = useCallback((text) => {
    setSearchText(text);
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog?.title2?.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchTeamById(id));
    }
    dispatch(fetchBlogs()); // ✅ استدعاء المقالات
  }, [dispatch, id]);

  if (doctorLoading) return <div className="text-center py-5">جاري تحميل الملف الشخصي للطبيب...</div>;
  if (doctorError) return <div className="text-center py-5 text-danger">خطأ: {doctorError}</div>;
  if (!currentMember) return <div className="text-center py-5">بيانات الطبيب غير متوفرة</div>;

  const services = currentMember.services
    ? currentMember.services.split(",").map((service) => service.trim())
    : [];

  return (
    <Fragment>
      <Navbar Logo={logo} hclass={"wpo-site-header wpo-site-header-s2"} />
      <PageTitle
        pageTitle={currentMember.name || "الطبيب"}
        pagesub={currentMember.specialty || "أخصائي"}
      />

      <section className="team_single_page section-padding" dir="rtl">
        <div className="container">
          <div className="flex flex-col lg:flex-row-reverse gap-8">
            {/* معلومات الطبيب */}
            <div className="lg:w-2/3">
              <div className="flex flex-col lg:flex-row-reverse gap-8">
                {/* صورة الطبيب */}
                <div className="lg:w-1/2">
                  <div className="doctor_profile sticky top-8">
                    <div className="bg-gradient-to-br from-[#dec06a] via-[#d4b45c] to-[#c9a347] p-3 rounded-[25px]">
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
                    <div className="content mt-6 text-center lg:text-right">
                      <h3 className="text-3xl font-bold text-gray-800">{currentMember.name}</h3>
                      <span className="text-[#dec06a] text-xl block mt-2">
                        {currentMember.specialty}
                      </span>
                    </div>
                  </div>
                </div>

                {/* الخدمات */}
                <div className="lg:w-1/2">
                  <div className="doctor_info mb-8 bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-2xl font-bold mb-6 border-b-2 border-[#dec06a] pb-2">
                      الخدمات الطبية
                    </h2>
                    <ul className="space-y-4">
                      {services.map((service, index) => (
                        <li key={index} className="flex items-start text-lg">
                          <ArrowIcon />
                          <span className="mr-2">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* فورم الحجز */}
              <div className="AppointmentFrom mt-16 bg-gray-50 py-12">
                <div className="container">
                  <div className="cta_form_s2">
                    <div className="title s2 text-center mb-8">
                      <h3 className="text-3xl font-bold mb-2">حجز موعد</h3>
                      <p className="text-gray-600 text-xl">
                        تواصل معنا لحجز موعد مع الدكتور {currentMember.name}
                      </p>
                    </div>
                    <ContactForm doctorId={currentMember.id} />
                  </div>
                </div>
              </div>
            </div>

            {/* ✅ الشريط الجانبي للمقالات */}
            <div className="lg:w-1/3">
              <BlogSidebar
                blLeft=""
                recentBlogs={filteredBlogs.length > 0 ? filteredBlogs : blogs}
                onSearch={handleSearch}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer hclass={"wpo-site-footer_s2"} />
      <Scrollbar />
    </Fragment>
  );
};

export default TeamSinglePage;

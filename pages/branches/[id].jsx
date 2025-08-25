"use client";
import { getImageUrl } from "../../helpers/hooks/imageUrl";
import { useEffect , useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { fetchBranchById } from "../../store/slices/branches";
import { FaMapMarkerAlt, FaClock, FaArrowLeft, FaPhone, FaEnvelope } from "react-icons/fa";
import Navbar from "../../helpers/components/Navbar/Navbar";
import PageTitle from "../../helpers/components/pagetitle/PageTitle";
import Image from "next/image";
import TeamSection from "../../helpers/components/TeamSection/TeamSection";
import DepartmentsGrid from "../departments/grid"
import ProjectSection from "../../helpers/components/ProjectSection/ProjectSection";
import Footer from "../../helpers/components/footer/Footer";
import Scrollbar from "../../helpers/components/scrollbar/scrollbar";
import CtafromSection from "../../helpers/components/Form";
const BranchPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  const { selectedBranch: branch, loading, error } = useSelector((state) => state.branches);
console.log(branch);

  useEffect(() => {
    if (id) {
      dispatch(fetchBranchById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div dir="rtl" className="min-h-screen  flex items-center justify-center">
        <p className="text-xl">جاري التحميل...</p>
      </div>
    );
  }

  if (error || !branch) {
    return (
      <div dir="rtl" className="min-h-screen  flex items-center justify-center">
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
    <div className="">
      <Navbar hclass={'wpo-site-header wpo-site-header-s2'} showAuthPopup={showAuthPopup}/>
      <PageTitle pageTitle={branch.name} pagesub="تفاصيل الفرع"         bgImage={ "/branches.webp"} 
 />
      
      {/* Hero Image */}

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="relative max-w-7xl m-auto w-full h-64 md:h-96  mb-10 bg-gray-200">
        <Image
          src={getImageUrl(branch.image_url)}
          alt={branch.name}
          fill
          className="object-cover"
          priority
        />
      </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
          {/* Branch Info */}
          <div className="bg-white flex flex-col justify-between rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">معلومات الفرع</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-[#dec06a] mt-1 ml-3 text-xl flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-700 text-xl mb-2">العنوان</h3>
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
              
                </div>
              </div>
              
              {branch.working_hours && branch.working_hours.length > 0 && (
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
              
          
            </div>
                     <button
              className="w-full bg-[#dec06a] hover:bg-[#e8cf8c] text-white py-3 px-6 rounded-lg font-medium transition-colors mt-10"
              onClick={() => {
                const formSection = document.getElementById('appointment-form');
                if (formSection) {
                  formSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              حجز موعد في الفرع
            </button>
          </div>

          {/* Map Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-full">
              <iframe
                src={branch.location_link}
                width="100%"
                height="100%"
                className="min-h-[400px] lg:min-h-[500px]"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Gallery Section - Only show if we have actual images */}
        {branch.gallery_images && branch.gallery_images.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">معرض الصور</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {branch.gallery_images.map((image, index) => (
                <div key={index} className="overflow-hidden rounded-xl shadow-md h-64">
                  <Image
                    src={getImageUrl(image)}
                    alt={`${branch.name} - صورة ${index + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
       <div id="appointment-form" className="AppointmentFrom mb-5">
        <div className="container">
          <div className="cta_form_s2">
            <div className="title s2">
              <h3>حجز موعد</h3>
              <p>تواصل معنا لحجز موعد ومعرفة كيف يمكننا خدمتك.</p>
            </div>
            <CtafromSection id={id} type={"branch"} setShowAuthPopup={setShowAuthPopup}/>
          </div>
        </div>
      </div>
      <DepartmentsGrid branchId={id} />
      <TeamSection branchId={id} />
      <ProjectSection branchId={id} hclass="project_section section-padding" />
      <Footer hclass={'wpo-site-footer'} />
                  <Scrollbar />

    </div>
  );
};

export default BranchPage;
import React, { Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDeviceById } from '../../store/slices/devices';
import Navbar from '../../helpers/components/Navbar/Navbar';
import PageTitle from '../../helpers/components/pagetitle/PageTitle';
import ContactForm from '../../helpers/main-component/ServiceSinglePage/ServiceFrom';
import Footer from '../../helpers/components/footer/Footer';
import Scrollbar from '../../helpers/components/scrollbar/scrollbar';
import { FaMapMarkerAlt, FaClock, FaArrowDown } from 'react-icons/fa';
import logo from '../../helpers/images/logo-2.svg';
import Psing1 from '../../helpers/images/project-single/img-1.jpg';
import Psing2 from '../../helpers/images/project-single/img-2.jpg';
import getImageUrl from '../../utilies/getImageUrl';
import Link from 'next/link';
import CtafromSection from '../../helpers/components/Form';

const ProjectSinglePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const {
    selectedDevice: currentDevice,
    loading,
    error
  } = useSelector(state => state.devices || {});

  useEffect(() => {
    if (id) {
      dispatch(fetchDeviceById(id));
    }
  }, [dispatch, id]);

  const scrollToForm = () => {
    const formElement = document.getElementById('appointment-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return <div className="text-center py-5">جارٍ تحميل تفاصيل الجهاز...</div>;
  }

  if (error) {
    return <div className="text-center py-5 text-danger">خطأ في تحميل الجهاز: {error}</div>;
  }

  if (!currentDevice) {
    return <div className="text-center py-5">لا توجد بيانات متاحة</div>;
  }

  return (
    <Fragment>
      <Navbar Logo={logo} hclass={'wpo-site-header wpo-site-header-s2 absoulte top-0'} />
      <PageTitle pageTitle={currentDevice.name} pagesub={currentDevice.type} bgImage={"/devices @0.5x.webp"}/>
      
      <section className="project_single section-padding" dir="rtl">
        <div className="container">
          <div className="row">
            <div className="col-12 flex md:flex-row flex-col gap-5">
              <div>

              <h2 className="text-3xl font-bold mb-4 text-right">{currentDevice.name}</h2>
              <p className="text-gray-700 leading-relaxed mb-6 text-right">
                {currentDevice.type} - جهاز متطور يوفر حلولاً متكاملة للعناية بالجسم والبشرة
              </p>
                    <button 
                onClick={scrollToForm}
                className="mt-6 px-6 py-3 bg-[#dec06a] text-white w-full rounded-lg font-medium hover:bg-[#d4b45e] transition-colors flex items-center justify-center"
                >
                <span>سجل الآن</span>
                <FaArrowDown className="mr-2" />
              </button>
                </div>
<div>

              {/* Add Register Now Button */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg text-right">
                <h4 className="font-bold mb-2">معلومات إضافية:</h4>
                <ul className="list-disc pr-4 space-y-1">
                  <li>يتم صيانة الأجهزة دوريًا</li>
                  <li>جميع الأجهزة معتمدة من وزارة الصحة</li>
                  <li>يتم تعقيم الأجهزة قبل كل استخدام</li>
                </ul>
              </div>
</div>
            </div>
            <div className="col-12 mt-4">
              <table className="w-full border-collapse ">
                <tbody className=" w-full">
                  <tr>
                    <td className="text-right py-3 px-4 bg-gray-50 font-bold">نوع الجهاز:</td>
                    <td className="py-3 px-4 text-right">{currentDevice.type}</td>
                  </tr>
               
                  {currentDevice.available_times && (
                    <tr className='w-full'>
                      <td className="text-right py-3 px-4 bg-gray-50 font-bold">مواعيد العمل:</td>
                      <td className="py-3 px-4 text-right">
                        {currentDevice.available_times.split('&').map((time, index) => (
                          <span key={index} className="block">{time.trim()}</span>
                        ))}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

        
            </div>
              <div className="quote bg-gray-50 p-6 rounded-lg my-8 text-right">
                <h4 className="text-xl italic mb-2">"أحدث التقنيات في مجال العناية بالجسم والبشرة"</h4>
                <p className="text-left">— فريق العيادة التجميلية</p>
              </div>
            
          </div>
          
          {/* Branch Card Section */}
          {currentDevice.branches && currentDevice.branches.length > 0 && (
            <div className="row my-8 mt-3 md:mt-0">
              <div className="col-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 pb-2 border-b-2 border-[#dec06a] text-right">
                  الفروع المتاحة لهذا الجهاز
                </h2>

                {currentDevice.branches.map((branch) => (
                  <div key={branch.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row mb-6">
                    <div className="w-full md:w-1/3 h-64 md:h-auto">
                      <img
                        className="w-full h-full object-cover"
                        src={getImageUrl(branch.image_url) || "https://cdn.salla.sa/dEYvd/EObtK4Gx7k6mKsNWYobYNsczGSRhLYDESyQm7jnp.jpg"}
                        alt={branch.name}
                      />
                    </div>

                    <div className="p-6 flex-grow md:w-2/3">
                      <h3 className="text-xl font-bold text-gray-800 mb-3 text-right">{branch.name}</h3>

                      <div className="flex items-start mt-4 text-right">
                        <FaMapMarkerAlt className="text-[#dec06a] mt-1 ml-2 flex-shrink-0" />
                        <p className="text-gray-600">{branch.address}</p>
                      </div>

                      <div className="flex items-start mt-4 text-right">
                        <FaClock className="text-[#dec06a] mt-1 ml-2 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-gray-700">مواعيد العمل:</h4>
                          <p className="text-gray-500 text-sm">يرجى الاتصال بالفرع لمعرفة المواعيد</p>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row gap-3 mt-6">
                        <Link
                          href={`/branches/${branch.id}`}
                          className="px-4 py-2 border-2 border-[#dec06a] text-sm font-medium rounded-lg !text-[#dec06a] bg-white hover:bg-gray-50 text-center transition-colors"
                        >
                          المزيد من التفاصيل
                        </Link>
                        <a
                          href={branch.google_map_link}
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
          )}
          
          <div className="row my-8">
            <div className="col-lg-6 col-12">
              <h3 className="text-2xl font-bold mb-3 text-right">مميزات الجهاز</h3>
              <ul className="space-y-2 pr-4 text-right">
                <li className="flex items-start">
                  <span className="ml-2">•</span>
                  <span>تقنية متطورة وآمنة</span>
                </li>
                <li className="flex items-start">
                  <span className="ml-2">•</span>
                  <span>نتائج فورية وطويلة الأمد</span>
                </li>
                <li className="flex items-start">
                  <span className="ml-2">•</span>
                  <span>مناسب لجميع أنواع البشرة</span>
                </li>
                <li className="flex items-start">
                  <span className="ml-2">•</span>
                  <span>لا يحتاج إلى فترة نقاهة</span>
                </li>
              </ul>
            </div>
            
            <div className="col-lg-6 col-12">
              <h3 className="text-2xl font-bold mb-3 text-right">الاستخدامات الشائعة</h3>
              <ul className="space-y-2 pr-4 text-right">
                <li className="flex items-start">
                  <span className="ml-2">•</span>
                  <span>نحت القوام وتنسيق الجسم</span>
                </li>
                <li className="flex items-start">
                  <span className="ml-2">•</span>
                  <span>تحليل مكونات الجسم</span>
                </li>
                <li className="flex items-start">
                  <span className="ml-2">•</span>
                  <span>علاج مشاكل البشرة</span>
                </li>
                <li className="flex items-start">
                  <span className="ml-2">•</span>
                  <span>تحسين الدورة الدموية</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div id="appointment-form" className="AppointmentFrom bg-white rounded-xl shadow-md overflow-hidden">
          <div className="cta_form_s2">
            <div className="title s2 p-6 bg-[#f9f5e9] border-b border-[#e8d9a8]">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">حجز موعد</h3>
              <p className="text-gray-600">
                تواصل معنا لحجز موعد جلسة بالجهاز 
              </p>
            </div>
            <div className="p-6">
              <CtafromSection  />
            </div>
          </div>
        </div>
      </section>
      
      <Footer hclass={'wpo-site-footer_s2'} />
      <Scrollbar />
    </Fragment>
  );
};

export default ProjectSinglePage;
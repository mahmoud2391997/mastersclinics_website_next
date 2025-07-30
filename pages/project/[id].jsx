import React, { Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDeviceById } from '../../store/slices/devices';
import Navbar from '../../helpers/components/Navbar/Navbar';
import PageTitle from '../../helpers/components/pagetitle/PageTitle';
import ContactForm from '../../helpers/main-component/ServiceSinglePage/ServiceFrom';
import Footer from '../../helpers/components/footer/Footer';
import Scrollbar from '../../helpers/components/scrollbar/scrollbar';
import logo from '../../helpers/images/logo-2.svg';
import Psing1 from '../../helpers/images/project-single/img-1.jpg';
import Psing2 from '../../helpers/images/project-single/img-2.jpg';
import getImageUrl from '../../utilies/getImageUrl';

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
      <PageTitle pageTitle={currentDevice.name} pagesub={currentDevice.type} />
      
      <section className="project_single section-padding" dir="rtl">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-12">
              <h2 className="text-3xl font-bold mb-4 text-right">{currentDevice.name}</h2>
              <p className="text-gray-700 leading-relaxed mb-6 text-right">
                {currentDevice.type} - جهاز متطور يوفر حلولاً متكاملة للعناية بالجسم والبشرة
              </p>
              
              <div className="device-specs mb-8">
                <h3 className="text-2xl font-bold mb-3 text-right">تفاصيل الجهاز</h3>
                <div className="bg-gray-50 p-4 rounded-lg text-right">
                  <p className="whitespace-pre-line">
                    {currentDevice.description || "لا يوجد وصف متوفر حاليًا لهذا الجهاز."}
                  </p>
                </div>
              </div>

              <div className="quote bg-gray-50 p-6 rounded-lg my-8 text-right">
                <h4 className="text-xl italic mb-2">"أحدث التقنيات في مجال العناية بالجسم والبشرة"</h4>
                <p className="text-left">— فريق العيادة التجميلية</p>
              </div>
            </div>
            
            <div className="col-lg-5 col-12">
              <table className="w-full border-collapse">
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="text-right py-3 px-4 bg-gray-50 font-bold">نوع الجهاز:</td>
                    <td className="py-3 px-4 text-right">{currentDevice.type}</td>
                  </tr>
                  <tr>
                    <td className="text-right py-3 px-4 bg-gray-50 font-bold">حالة الجهاز:</td>
                    <td className="py-3 px-4 text-right">
                      {currentDevice.is_active ? "متاح للاستخدام" : "غير متاح حالياً"}
                    </td>
                  </tr>
                  {currentDevice.available_times && (
                    <tr>
                      <td className="text-right py-3 px-4 bg-gray-50 font-bold">مواعيد العمل:</td>
                      <td className="py-3 px-4 text-right">
                        {currentDevice.available_times.split('&').map((time, index) => (
                          <span key={index} className="block">{time.trim()}</span>
                        ))}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td className="text-right py-3 px-4 bg-gray-50 font-bold">تاريخ الإضافة:</td>
                    <td className="py-3 px-4 text-right">
                      {new Date(currentDevice.created_at).toLocaleDateString('ar-EG')}
                    </td>
                  </tr>
                </tbody>
              </table>

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
          
          <div className="row my-8">
            <div className="col-lg-6 col-12 mb-4">
              <img src={Psing1} alt="الجهاز في الاستخدام" className="w-full rounded-lg" />
            </div>
            <div className="col-lg-6 col-12 mb-4">
              <img src={Psing2} alt="نتائج الجهاز" className="w-full rounded-lg" />
            </div>
          </div>
        </div>
        
        <div className="AppointmentFrom bg-gray-100 py-12">
          <div className="container">
            <div className="cta_form_s2 bg-white p-8 rounded-lg shadow-md" dir="rtl">
              <div className="title s2 text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">حجز موعد</h3>
                <p className="text-gray-600">يمكنك حجز موعد للاستفادة من هذا الجهاز</p>
              </div>
              <ContactForm />
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
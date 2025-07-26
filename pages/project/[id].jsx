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

const ClickHandler = () => {
  window.scrollTo(10, 0);
};

const ProjectSinglePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const {
    selectedDevice: currentService,
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

  if (!currentService) {
    return <div className="text-center py-5">لا توجد بيانات متاحة</div>;
  }

  return (
    <Fragment>
      <Navbar Logo={logo} hclass={'wpo-site-header wpo-site-header-s2 absoulte top-0'} />
      <PageTitle pageTitle={currentService.name} pagesub={'جهاز إزالة الشعر'} />
      
      <section className="project_single section-padding" dir="rtl">
        <div className="container">
          <img 
            src={getImageUrl(currentService.image_url) || "/download.png"} 
            alt={currentService.name} 
            className="w-full rounded-lg shadow-lg mb-8" 
          />
          
          <div className="row">
            <div className="col-lg-7 col-12">
              <h2 className="text-3xl font-bold mb-4 text-right">{currentService.name}</h2>
              <p className="text-gray-700 leading-relaxed mb-6 text-right">
                {currentService.type} - جهاز متطور لإزالة الشعر باستخدام تقنية الليزر الآمنة والفعالة
              </p>
              
              <div className="device-specs mb-8">
                <h3 className="text-2xl font-bold mb-3 text-right">مواعيد العمل</h3>
                <div className="bg-gray-50 p-4 rounded-lg text-right">
                  <p className="whitespace-pre-line">{currentService.available_times}</p>
                </div>
              </div>

              <div className="quote bg-gray-50 p-6 rounded-lg my-8 text-right">
                <h4 className="text-xl italic mb-2">"جهاز جنتل برو يوفر حلًا طويل الأمد لإزالة الشعر مع الحد الأدنى من الانزعاج"</h4>
                <p className="text-left">— أخصائية التجميل د. سارة</p>
              </div>
            </div>
            
            <div className="col-lg-5 col-12">
              <table className="w-full border-collapse">
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="text-right py-3 px-4 bg-gray-50 font-bold">الفرع:</td>
                    <td className="py-3 px-4 text-right">{currentService.branch_name}</td>
                  </tr>
                  <tr>
                    <td className="text-right py-3 px-4 bg-gray-50 font-bold">نوع الجهاز:</td>
                    <td className="py-3 px-4 text-right">{currentService.type}</td>
                  </tr>
                  <tr>
                    <td className="text-right py-3 px-4 bg-gray-50 font-bold">متاح في:</td>
                    <td className="py-3 px-4 text-right">
                      {currentService.available_times.split('&')[0].trim()}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right py-3 px-4 bg-gray-50 font-bold">مدة الجلسة:</td>
                    <td className="py-3 px-4 text-right">تختلف حسب المنطقة المعالجة</td>
                  </tr>
                  <tr>
                    <td className="text-right py-3 px-4 bg-gray-50 font-bold">عدد الجلسات المطلوبة:</td>
                    <td className="py-3 px-4 text-right">6-8 جلسات في المتوسط</td>
                  </tr>
                  <tr>
                    <td className="text-right py-3 px-4 bg-gray-50 font-bold">ملاحظات:</td>
                    <td className="py-3 px-4 text-right">يجب استشارة الطبيب قبل الجلسة</td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg text-right">
                <h4 className="font-bold mb-2">نصائح مهمة:</h4>
                <ul className="list-disc pr-4 space-y-1">
                  <li>حافظي على ترطيب البشرة قبل الجلسة</li>
                  <li>تجنبي التعرض للشمس قبل الجلسة</li>
                  <li>احضري بدون مكياج للمنطقة المراد علاجها</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="row my-8">
            <div className="col-lg-6 col-12">
              <h3 className="text-2xl font-bold mb-3 text-right">مميزات الجهاز</h3>
              <p className="text-gray-700 mb-4 text-right">
                يتميز جهاز جنتل برو بتقنية متطورة تجعله مناسبًا لجميع أنواع البشرة تقريبًا، مع تقليل الآثار الجانبية.
              </p>
              <ul className="space-y-2 pr-4 text-right">
                <li className="flex items-start">
                  <span className="ml-2">•</span>
                  <span>مناسب لمعظم أنواع البشرة</span>
                </li>
                <li className="flex items-start">
                  <span className="ml-2">•</span>
                  <span>ألم أقل مقارنة بالطرق التقليدية</span>
                </li>
                <li className="flex items-start">
                  <span className="ml-2">•</span>
                  <span>نتائج طويلة الأمد</span>
                </li>
                <li className="flex items-start">
                  <span className="ml-2">•</span>
                  <span>تقنية تبريد لتقليل الانزعاج</span>
                </li>
              </ul>
            </div>
            
            <div className="col-lg-6 col-12">
              <h3 className="text-2xl font-bold mb-3 text-right">المناطق المعالجة</h3>
              <p className="text-gray-700 mb-4 text-right">يمكن استخدام الجهاز على معظم مناطق الجسم بما في ذلك:</p>
              <ul className="space-y-2 pr-4 text-right">
                <li className="flex items-start">
                  <span className="ml-2">•</span>
                  <span>الوجه (الشفاه، الذقن)</span>
                </li>
                <li className="flex items-start">
                  <span className="ml-2">•</span>
                  <span>الإبطين</span>
                </li>
                <li className="flex items-start">
                  <span className="ml-2">•</span>
                  <span>خط البيكيني</span>
                </li>
                <li className="flex items-start">
                  <span className="ml-2">•</span>
                  <span>الساقين والذراعين</span>
                </li>
                <li className="flex items-start">
                  <span className="ml-2">•</span>
                  <span>الظهر والصدر</span>
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
          
          <div className="row my-8">
            <div className="col-lg-6 col-12">
              <h3 className="text-2xl font-bold mb-3 text-right">إرشادات ما قبل الجلسة</h3>
              <ul className="space-y-2 pr-4 text-right">
                <li className="flex items-start">
                  <span className="ml-2">•</span>
                  <span>تجنب التعرض للشمس قبل الجلسة بأسبوعين</span>
                </li>
                <li className="flex items-start">
                  <span className="ml-2">•</span>
                  <span>لا تستخدمي أي وسيلة لإزالة الشعر قبل الجلسة بـ4 أسابيع</span>
                </li>
                <li className="flex items-start">
                  <span className="ml-2">•</span>
                  <span>حلق المنطقة المراد علاجها قبل الجلسة بيوم</span>
                </li>
                <li className="flex items-start">
                  <span className="ml-2">•</span>
                  <span>تجنب الكريمات المرطبة يوم الجلسة</span>
                </li>
              </ul>
            </div>
            
            <div className="col-lg-6 col-12">
              <h3 className="text-2xl font-bold mb-3 text-right">إرشادات ما بعد الجلسة</h3>
              <ul className="space-y-2 pr-4 text-right">
                <li className="flex items-start">
                  <span className="ml-2">•</span>
                  <span>تجنب التعرض للشمس واستخدمي واقي شمسي</span>
                </li>
                <li className="flex items-start">
                  <span className="ml-2">•</span>
                  <span>لا تستخدمي مستحضرات تحتوي على كحول</span>
                </li>
                <li className="flex items-start">
                  <span className="ml-2">•</span>
                  <span>يمكنك استخدام مرطبات خفيفة</span>
                </li>
                <li className="flex items-start">
                  <span className="ml-2">•</span>
                  <span>تجنب الحمام الساخن لمدة 48 ساعة</span>
                </li>
                <li className="flex items-start">
                  <span className="ml-2">•</span>
                  <span>لا تزلي الشعر بعد الجلسة إلا بالحلاقة</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="AppointmentFrom bg-gray-100 py-12">
          <div className="container">
            <div className="cta_form_s2 bg-white p-8 rounded-lg shadow-md" dir="rtl">
              <div className="title s2 text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">حجز موعد</h3>
                <p className="text-gray-600">يمكنك حجز موعد لإزالة الشعر بالليزر باستخدام هذا الجهاز</p>
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
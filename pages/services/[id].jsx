import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { fetchServiceById } from '../../store/slices/services';
import ServiceForm from '../../helpers/main-component/ServiceSinglePage/ServiceFrom';
import ServiceSidebar from '../../helpers/main-component/ServiceSinglePage/sidebar';
import Navbar from '../../helpers/components/Navbar/Navbar';
import PageTitle from '../../helpers/components/pagetitle/PageTitle';
import Footer from '../../helpers/components/footer/Footer';
import Scrollbar from '../../helpers/components/scrollbar/scrollbar';
import simg1 from '../../helpers/images/service-single/img-1.jpg';
import simg2 from '../../helpers/images/service-single/img-2.jpg';
import logo from '../../helpers/images/logo-2.svg';
import defaultImage from '../../helpers/images/service-single/img-1.jpg';
import Image from 'next/image';
import Head from 'next/head';
import getImageUrl from "../../utilies/getImageUrl";

const ServiceSinglePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const { selectedService: currentService, loading, error } = useSelector((state) => state.services);

  useEffect(() => {
    if (router.isReady && id) {
      dispatch(fetchServiceById(id));
    }
  }, [dispatch, id, router.isReady]);

  if (!router.isReady) {
    return <div className="text-center py-5">جاري تحميل...</div>;
  }

  if (loading) return <div className="text-center py-5">جاري تحميل تفاصيل الخدمة...</div>;
  if (error) return <div className="text-center py-5 text-red-500">خطأ: {error}</div>;
  if (!currentService) return <div className="text-center py-5">الخدمة غير موجودة</div>;

  const capabilitiesArray = Array.isArray(currentService.capabilities) ? currentService.capabilities : [];
  const imageSrc = currentService.image ? getImageUrl(currentService.image) : defaultImage;

  return (
    <Fragment>
      <Head>
        <title>{currentService.name} | خدماتنا</title>
        <meta name="description" content={currentService.shortDescription || currentService.description || "تعرف على خدماتنا بالتفصيل"} />
      </Head>

      <Navbar Logo={logo} hclass={'wpo-site-header wpo-site-header-s2'} />
      <PageTitle pageTitle={currentService.name || 'الخدمة'} pagesub={'خدمة مفردة'} />

      <section dir="rtl" className="service_single section-padding">
        <div className="container">
          <div className="row g-0">
            <div className="col-lg-8 col-12 service_content">
              <div>
                <Image
                  src={getImageUrl(imageSrc)}
                  alt={currentService.title || 'صورة الخدمة'}
                  width={800}
                  height={500}
                  className="rounded mb-4"
                />
                <h2 className="text-right">{currentService.name}</h2>
                <p className="text-right">{currentService.longDescription || currentService.description}</p>
              </div>

              <div className="row my-4">
                <div className="col-lg-6 col-12 mb-3">
                  <Image src={simg1} alt="رسم توضيحي للخدمة" className="rounded" />
                </div>
                <div className="col-lg-6 col-12 mb-3">
                  <Image src={simg2} alt="الخدمة أثناء التنفيذ" className="rounded" />
                </div>
              </div>

              {capabilitiesArray.length > 0 && (
                <div>
                  <h3 className="text-right">قدراتنا</h3>
                  <p className="text-right">{currentService.capabilitiesDescription}</p>
                  <ul className="text-right">
                    {capabilitiesArray.map((capability, index) => (
                      <li key={index}>{capability}</li>
                    ))}
                  </ul>
                </div>
              )}

              {currentService.approach && (
                <div>
                  <h3 className="text-right">نهجنا</h3>
                  <p className="text-right">{currentService.approach}</p>
                </div>
              )}

              <div className="cta_form_s2">
                <div className="title text-right">
                  <h3>احجز موعد</h3>
                  <p>تواصل معنا لمعرفة كيف يمكننا مساعدتك في مشاكلك.</p>
                </div>
                <ServiceForm serviceId={currentService.id} />
              </div>
            </div>

            <div className="col-lg-4 col-12">
              <ServiceSidebar service={currentService} relatedServices={[]} />
            </div>
          </div>
        </div>
      </section>

      <Footer hclass={'wpo-site-footer_s2'} />
      <Scrollbar />
    </Fragment>
  );
};

export default ServiceSinglePage;

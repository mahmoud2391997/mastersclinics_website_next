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
import Image from 'next/image';
import getImageUrl from "../../utilies/getImageUrl";
const ServiceSinglePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const {
    selectedService: currentService,
    loading,
    error,
  } = useSelector((state) => state.services);

  useEffect(() => {
    if (id) {
      dispatch(fetchServiceById(id));
    }
  }, [dispatch, id]);

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  if (loading) return <div className="text-center py-5">Loading service details...</div>;
  if (error) return <div className="text-center py-5 text-red-500">Error: {error}</div>;
  if (!currentService) return <div className="text-center py-5">Service not found</div>;

  // Check if capabilities is an array
  const capabilitiesArray = Array.isArray(currentService.capabilities)
    ? currentService.capabilities
    : [];

  return (
    <Fragment>
      <Navbar Logo={logo} hclass={'wpo-site-header wpo-site-header-s2'} />
      <PageTitle pageTitle={currentService.name} pagesub={'Service Single'} />

      <section className="service_single section-padding">
        <div className="container">
          <div className="row g-0">
            <div className="col-lg-8 col-12 service_content">
              <div>
                
                <Image
                  src={getImageUrl(currentService.image) || '/default-image.jpg'}
                  alt={currentService.title || 'Service Image'}
                  width={800}
                  height={500}
                  className="rounded mb-4"
                />
                <h2>{currentService.name}</h2>
                <p>{currentService.longDescription || currentService.description}</p>
              </div>

              <div className="row my-4">
                <div className="col-lg-6 col-12 mb-3">
                  <Image src={simg1} alt="Service illustration" className="rounded" />
                </div>
                <div className="col-lg-6 col-12 mb-3">
                  <Image src={simg2} alt="Service in action" className="rounded" />
                </div>
              </div>

              {capabilitiesArray.length > 0 && (
                <div>
                  <h3>Our Capabilities</h3>
                  <p>{currentService.capabilitiesDescription}</p>
                  <ul>
                    {capabilitiesArray.map((capability, index) => (
                      <li key={index}>{capability}</li>
                    ))}
                  </ul>
                </div>
              )}

              {currentService.approach && (
                <div>
                  <h3>Our Approach</h3>
                  <p>{currentService.approach}</p>
                </div>
              )}

              <div className="cta_form_s2">
                <div className="title">
                  <h3>Make An Appointment</h3>
                  <p>Get in touch with us to see how we can help you with your problems.</p>
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

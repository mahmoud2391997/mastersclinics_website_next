import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';  // Using Next.js useRouter
import { fetchServiceById } from '../../store/slices/services'; // Adjust the import path as needed
import ServiceForm from '../../helpers/main-component/ServiceSinglePage/ServiceFrom';  // Adjust import path
import ServiceSidebar from '../../helpers/main-component/ServiceSinglePage/sidebar';  // Adjust import path
import Navbar from '../../helpers/components/Navbar/Navbar';
import PageTitle from '../../helpers/components/pagetitle/PageTitle';
import Footer from '../../helpers/components/footer/Footer';
import Scrollbar from '../../helpers/components/scrollbar/scrollbar';
import simg1 from '../../helpers/images/service-single/img-1.jpg';
import simg2 from '../../helpers/images/service-single/img-2.jpg';
import logo from '../../helpers/images/logo-2.svg';

const ServiceSinglePage = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();  // Using Next.js useRouter to access dynamic route parameters
    const { id } = router.query;  // Get 'id' from the dynamic route
console.log(id);

    // Redux state selectors
    const {
        selectedService: currentService,
        loading,
        error
    } = useSelector(state => state.services);

    console.log("Current Service:", currentService);

    useEffect(() => {
        if (id) {  // Ensure 'id' is available before dispatching the fetch request
            dispatch(fetchServiceById(id));
        }
    }, [dispatch, id]);

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    };

    if (loading) return <div className="text-center py-5">Loading service details...</div>;
    if (error) return <div className="text-center py-5 text-danger">Error: {error}</div>;
    if (!currentService) return <div className="text-center py-5">Service not found</div>;

    return (
        <Fragment>
            <Navbar Logo={logo} hclass={'wpo-site-header wpo-site-header-s2'} />
            <PageTitle pageTitle={currentService.name} pagesub={'Service Single'} />
            
            <section className="service_single section-padding">
                <div className="container">
                    <div className="row g-0">
                        <div className="col-lg-8 col-12 service_content">
                            <div>
                                <img helpers={currentService.image} alt={currentService.title} />
                                <h2>{currentService.name}</h2>
                                <p>{currentService.longDescription || currentService.description}</p>
                            </div>

                            <div className="row">
                                <div className="col-lg-6 col-12">
                                    <img helpers={simg1} alt="Service illustration" />
                                </div>
                                <div className="col-lg-6 col-12">
                                    <img helpers={simg2} alt="Service in action" />
                                </div>
                            </div>

                            {currentService.capabilities && (
                                <div>
                                    <h3>Our Capabilities</h3>
                                    <p>{currentService.capabilitiesDescription}</p>
                                    <ul>
                                        {currentService.capabilities.map((capability, index) => (
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

                            {/* Related services logic can be uncommented if needed */}
                            {/* 
                            {relatedServices && relatedServices.length > 0 && (
                                <div className="other-service">
                                    <h3>Related Services</h3>
                                    <div className="row">
                                        {relatedServices.slice(0, 3).map((service) => (
                                            <div className="col-lg-4 col-md-6 col-12" key={service.id}>
                                                <div className="service_card">
                                                    <div className="icon">
                                                        <i className={service.icon}></i>
                                                    </div>
                                                    <div className="content">
                                                        <h2>{service.title}</h2>
                                                        <p>{service.description}</p>
                                                        <Link 
                                                            onClick={ClickHandler} 
                                                            href={`/service/${service.id}`}  // Updated with Next.js Link
                                                        >
                                                            <i className="flaticon-right-arrow"></i>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            */}

                            <div className="cta_form_s2">
                                <div className="title">
                                    <h3>Make An Appointment</h3>
                                    <p>Get in touch with us to see how we can help you with your Problems.</p>
                                </div>
                                <ServiceForm serviceId={currentService.id} />
                            </div>
                        </div>

                        <div className="col-lg-4 col-12">
                            <ServiceSidebar 
                                service={currentService} 
                                relatedServices={[]} 
                            />
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

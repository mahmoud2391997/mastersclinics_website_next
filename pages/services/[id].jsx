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
import { getImageUrl } from '../../helpers/hooks/imageUrl';
import Image from 'next/image';

const ServiceSinglePage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    const {
        selectedService: currentService,
        loading,
        error
    } = useSelector(state => state.services);

    useEffect(() => {
        if (id) {
            dispatch(fetchServiceById(id));
        }
    }, [dispatch, id]);

    if (loading) return <div className="text-center py-5">Loading service details...</div>;
    if (error) return <div className="text-center py-5 text-danger">Error: {error}</div>;
    if (!currentService) return <div className="text-center py-5">Service not found</div>;

    // Parse fields that are stringified JSON
    let parsedService = { ...currentService };

    ['capabilities', 'doctors_ids', 'branches'].forEach(field => {
        if (typeof parsedService[field] === 'string') {
            try {
                parsedService[field] = JSON.parse(parsedService[field]);
            } catch {
                parsedService[field] = [];
            }
        }
    });

    // Get image URLs using getImageUrl helper
    const serviceImage = parsedService.image ? getImageUrl(parsedService.image) : '/default-image.jpg';
    const simg1 = getImageUrl('/service-single/img-1.jpg');
    const simg2 = getImageUrl('/service-single/img-2.jpg');
    const logo = getImageUrl('/logo-2.svg');

    return (
        <Fragment>
            <Navbar Logo={logo} hclass={'wpo-site-header wpo-site-header-s2'} />
            <PageTitle pageTitle={parsedService.title || 'Service'} pagesub={'Service Single'} />

            <section className="service_single section-padding">
                <div className="container">
                    <div className="row g-0">
                        <div className="col-lg-8 col-12 service_content">
                            <div>
                                <Image
                                    src={serviceImage}
                                    alt={parsedService.title}
                                    width={800}
                                    height={500}
                                    className="mb-4 w-100 rounded"
                                />
                                <h2>{parsedService.title}</h2>
                                <p>{parsedService.description}</p>
                            </div>

                            <div className="row">
                                <div className="col-lg-6 col-12">
                                    <Image
                                        src={simg1}
                                        alt="Service illustration"
                                        width={400}
                                        height={300}
                                        className="mb-4 w-100 rounded"
                                    />
                                </div>
                                <div className="col-lg-6 col-12">
                                    <Image
                                        src={simg2}
                                        alt="Service in action"
                                        width={400}
                                        height={300}
                                        className="mb-4 w-100 rounded"
                                    />
                                </div>
                            </div>

                            {parsedService.capabilities && parsedService.capabilities.length > 0 && (
                                <div>
                                    <h3>قدراتنا</h3>
                                    <ul>
                                        {parsedService.capabilities.map((capability, index) => (
                                            <li key={index}>{capability}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {parsedService.approach && (
                                <div>
                                    <h3>نهجنا</h3>
                                    <p>{parsedService.approach}</p>
                                </div>
                            )}

                            <div className="cta_form_s2 mt-5">
                                <div className="title">
                                    <h3>احجز موعدك</h3>
                                    <p>تواصل معنا لمعرفة كيف نستطيع مساعدتك.</p>
                                </div>
                                <ServiceForm serviceId={parsedService.id} />
                            </div>
                        </div>

                        <div className="col-lg-4 col-12">
                            <ServiceSidebar service={parsedService} relatedServices={[]} />
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
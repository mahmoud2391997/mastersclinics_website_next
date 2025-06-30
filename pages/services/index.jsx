import React, { Fragment } from 'react';
import Navbar from '../../src/components/Navbar/Navbar';
import PageTitle from '../../src/components/pagetitle/PageTitle'
import ServiceSection from '../../src/main-component/servicesSection/index';
import CtafromSection from '../../src/components/CtafromSection/CtafromSection';
import Footer from '../../src/components/footer/Footer';
import Scrollbar from '../../src/components/scrollbar/scrollbar';

const ServicePage = () => {
    return (
        <Fragment>
            <Navbar hclass={'wpo-site-header wpo-site-header-s2'}  />
            <PageTitle pageTitle={'Service'} pagesub={'Service'} />
<ServiceSection />
            <CtafromSection hclass={'ctafrom_section'} />
            <Footer hclass={'wpo-site-footer'} />
            <Scrollbar />

        </Fragment>
    )
};
export default ServicePage;

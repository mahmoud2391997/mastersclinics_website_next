import React, { Fragment } from 'react';
import Navbar from '../../src/components/Navbar/Navbar';
import PageTitle from '../../src/components/pagetitle/PageTitle'
import ServiceSection from '../../src/components/ServiceSection/ServiceSection';
import CtafromSection from '../../src/components/CtafromSection/CtafromSection';
import Footer from '../../src/components/footer/Footer';
import Scrollbar from '../../src/components/scrollbar/scrollbar';

const ServicePage = () => {
    return (
        <Fragment>
            <Navbar hclass={'wpo-site-header wpo-site-header-s2'}  />
            <PageTitle pageTitle={'Service'} pagesub={'Service'} />
            <ServiceSection hclass={"service_section_s2 s3 section-padding"} sliceEnd={6} showSectionTitle={false} AllServices={false} />
            <CtafromSection hclass={'ctafrom_section'} />
            <Footer hclass={'wpo-site-footer'} />
            <Scrollbar />

        </Fragment>
    )
};
export default ServicePage;

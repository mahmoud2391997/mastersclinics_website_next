import React, { Fragment } from 'react';
import Navbar from '../../src/components/Navbar/Navbar';
import PageTitle from '../../src/components/pagetitle/PageTitle'
import ServiceSection from '../../src/components/ServiceSection/ServiceSection';
import CtafromSection from '../../src/components/CtafromSection/CtafromSection';
import Footer from '../../src/components/footer/Footer';
import Scrollbar from '../../src/components/scrollbar/scrollbar';
import OffersSection from '../../src/components/offersSection';

const ServicePage = () => {
    return (
        <Fragment>
            <Navbar hclass={'wpo-site-header wpo-site-header-s2'}  />
            <PageTitle pageTitle={'Offers'} pagesub={'Offers'} />
            <OffersSection />
            <Footer hclass={'wpo-site-footer'} />
            <Scrollbar />

        </Fragment>
    )
};
export default ServicePage;

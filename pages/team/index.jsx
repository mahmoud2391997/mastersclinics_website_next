import React, { Fragment } from 'react';
import Navbar from '../../helpers/components/Navbar/Navbar';
import PageTitle from '../../helpers/components/pagetitle/PageTitle'
import TeamSection from '../../helpers/components/TeamSection/TeamSection';
import CtafromSection from '../../helpers/components/CtafromSection/CtafromSection';
import Footer from '../../helpers/components/footer/Footer';
import Scrollbar from '../../helpers/components/scrollbar/scrollbar';


const ServicePage = () => {
    return (
        <Fragment>
            <Navbar hclass={'wpo-site-header wpo-site-header-s2'} />
            <PageTitle pageTitle={'Doctor'} pagesub={'Doctor'} />
            <TeamSection hclass='team_section_s2 section-padding'  showSectionTitle={false}/>
            <CtafromSection hclass={'ctafrom_section'} />
            <Footer hclass={'wpo-site-footer'} />
            <Scrollbar  />

        </Fragment>
    )
};
export default ServicePage;

import React, { Fragment } from 'react';
import Navbar from '../../helpers/components/Navbar/Navbar';
import PageTitle from '../../helpers/components/pagetitle/PageTitle'
import About from '../../helpers/components/about/about';
import ProcessSection from '../../helpers/components/ProcessSection/ProcessSection';
import FunFact from '../../helpers/components/FunFact/FunFact';
import TeamSection from '../../helpers/components/TeamSection/TeamSection';
import CtaSectionS2 from '../../helpers/components/CtaSectionS2/CtaSectionS2';
import BlogSection from '../../helpers/components/BlogSection/BlogSection';
import CtafromSection from '../../helpers/components/CtafromSection/CtafromSection';
import Footer from '../../helpers/components/footer/Footer';
import Scrollbar from '../../helpers/components/scrollbar/scrollbar';


const AboutPage = () => {
    return (
        <Fragment>
            <Navbar hclass={'wpo-site-header wpo-site-header-s2'}  />
            <PageTitle pageTitle={'من نحن'} pagesub={'من نحن'} bgImage={'/Rectangle 3 (1).png'}   />
            <About hclass={'about_section section-padding s4'} />
            <ProcessSection hclass={"work_section_s2 section-padding"} />
            <FunFact hclass={'funfact_section'} />
            <TeamSection hclass={'team_section_s2 section-padding'} />
            <CtaSectionS2 />
            <BlogSection tClass={'blog_section section-padding'} />
            <CtafromSection hclass={'ctafrom_section'} />
            <Footer hclass={'wpo-site-footer'} />
            <Scrollbar />

        </Fragment>
    )
};
export default AboutPage;

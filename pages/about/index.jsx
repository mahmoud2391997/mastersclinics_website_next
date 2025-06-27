import React, { Fragment } from 'react';
import Navbar from '../../src/components/Navbar/Navbar';
import PageTitle from '../../src/components/pagetitle/PageTitle'
import About from '../../src/components/about/about';
import ProcessSection from '../../src/components/ProcessSection/ProcessSection';
import FunFact from '../../src/components/FunFact/FunFact';
import TeamSection from '../../src/components/TeamSection/TeamSection';
import CtaSectionS2 from '../../src/components/CtaSectionS2/CtaSectionS2';
import BlogSection from '../../src/components/BlogSection/BlogSection';
import CtafromSection from '../../src/components/CtafromSection/CtafromSection';
import Footer from '../../src/components/footer/Footer';
import Scrollbar from '../../src/components/scrollbar/scrollbar';


const AboutPage = () => {
    return (
        <Fragment>
            <Navbar hclass={'wpo-site-header wpo-site-header-s2'}  />
            <PageTitle pageTitle={'About Us'} pagesub={'About Us'} />
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

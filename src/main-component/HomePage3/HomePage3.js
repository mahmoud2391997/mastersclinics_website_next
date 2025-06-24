import React, { Fragment } from 'react';
import Navbar from '../../components/Navbar/Navbar'
import Hero3 from '../../components/hero3/hero3';
import AppointmentSection from '../../components/AppointmentSection/AppointmentSection';
import AboutS3 from '../../components/aboutS3/aboutS3.js';
import ProcessSection from '../../components/ProcessSection/ProcessSection';
import ServiceSection from '../../components/ServiceSection/ServiceSection';
import ProjectSection from '../../components/ProjectSection/ProjectSection';
import Testimonial from '../../components/Testimonial/Testimonial';
import CtaSectionS2 from '../../components/CtaSectionS2/CtaSectionS2.js';
import TeamSection from '../../components/TeamSection/TeamSection';
import FunFact from '../../components/FunFact/FunFact';
import BlogSection from '../../components/BlogSection/BlogSection';
import CtafromSection from '../../components/CtafromSection/CtafromSection';
import Footer from '../../components/footer/Footer';
import Scrollbar from '../../components/scrollbar/scrollbar';

import Logo from '../../images/logo-2.svg'

const HomePage3 = () => {
    return (
        <Fragment>
            <Navbar hclass={'wpo-site-header wpo-site-header-s2'} Logo={Logo} />
            <Hero3 />
            <AppointmentSection hclass={'appointment_section_s2'} />
            <AboutS3/>
            <ProcessSection hclass={"work_section_s2 section-padding"} />
            <ServiceSection hclass={"service_section_s3 section-padding"} />
            <ProjectSection hclass={'project_section_s3 section-padding'} />
            <Testimonial tClass={'testimonial_section testimonial_section_slider section-padding pt-0'} />
            <CtaSectionS2 />
            <TeamSection hclass={'team_section_s2 section-padding'} />
            <FunFact hclass={'funfact_section'} />
            <BlogSection tClass={'blog_section section-padding'} />
            <CtafromSection hclass={'ctafrom_section'} />
            <Footer hclass={'wpo-site-footer'} />
            <Scrollbar />
        </Fragment>
    )
};
export default HomePage3;
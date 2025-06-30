import React, { Fragment } from 'react';
import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/hero/hero';
import ServiceSection from '../../components/ServiceSection/ServiceSection';
import About from '../../components/about/about';
import ProcessSection from '../../components/ProcessSection/ProcessSection';
import ProjectSection from '../../components/ProjectSection/ProjectSection';
import Testimonial from '../../components/Testimonial/Testimonial';
import TeamSection from '../../components/TeamSection/TeamSection';
import FunFact from '../../components/FunFact/FunFact';
import BlogSection from '../../components/BlogSection/BlogSection';
import CtafromSection from '../../components/CtafromSection/CtafromSection';
import Footer from '../../components/footer/Footer';
import Scrollbar from '../../components/scrollbar/scrollbar';
import ImageSlider from '../../components/adsSlider/index';

const HomePage = () => {
    return (
        <Fragment>
            <div className='bg-[#f6eecd] pb-5'>

            <Navbar hclass={'wpo-site-header'}   />
            </div>
            <Hero hclass={'static-hero'} />
            <ImageSlider />
            <ServiceSection hclass={"service_section section-padding"} />
            <About hclass={'about_section section-padding'}/>
            <ProcessSection hclass={"work_section section-padding"}/>
            <ProjectSection hclass={'project_section section-padding'}/>
            <Testimonial tClass={'testimonial_section testimonial_section_slider'} />
            <TeamSection hclass={'team_section section-padding'} sliceEnd={3}/>
            <FunFact hclass={'funfact_section'} />
            <BlogSection tClass={'blog_section section-padding'}/>
            <CtafromSection hclass={'ctafrom_section'}/>
            <Footer hclass={'wpo-site-footer'}/>
            <Scrollbar />
        </Fragment>
    )
};
export default HomePage;
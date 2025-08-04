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
import CtafromSection from '../../components/Form';
import Footer from '../../components/footer/Footer';
import Scrollbar from '../../components/scrollbar/scrollbar';
import ImageSlider from '../../components/adsSlider/index';

const HomePage = () => {
    return (
        <Fragment className="w-full">
            <div className='bg-[#f6eecd] md:pb-5 w-full ' >

            <Navbar hclass={'wpo-site-header  '}  nav={true} />
            </div>
            <Hero hclass={'static-hero'} />
            <ImageSlider />
            <ServiceSection hclass={"service_section section-padding"} sliceEnd={3}/>
            {/* <About hclass={'about_section section-padding'}/> */}
            {/* <ProcessSection hclass={"work_section section-padding"}/> */}
            <ProjectSection hclass={'project_section section-padding'}/>
            <Testimonial tClass={'testimonial_section testimonial_section_slider'} />
            <TeamSection hclass={'team_section section-padding'} sliceEnd={3} slider={true}/>
            <FunFact hclass={'funfact_section'} />
            <BlogSection tClass={'blog_section section-padding'} slider={true}/>
            <Footer hclass={'wpo-site-footer'}/>
            <Scrollbar />
        </Fragment>
    )
};
export default HomePage;
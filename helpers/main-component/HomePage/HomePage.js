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
import DepartmentsGrid from '@/pages/departments/grid';

const HomePage = () => {
    return (
        <div className="w-full relative overflow-hidden">
            <Navbar hclass={'wpo-site-header wpo-site-header-s2'} nav={true} />
            <Hero hclass={'static-hero'} />
            <ImageSlider />
            <DepartmentsGrid isSwiper={true} slidesToShow={3} slidesToScroll={2} />
            <ServiceSection hclass={"service_section section-padding"} sliceEnd={6} slider={true}/>
            <TeamSection hclass={'team_section section-padding'} sliceEnd={6} slider={true}/>
            <ProjectSection hclass={'project_section section-padding'} slider={true} sliceStart={0} sliceEnd={6}/>
            <FunFact hclass={'funfact_section '} />
            <BlogSection tClass={'blog_section section-padding'} slider={true}/>
            <Testimonial tClass={'testimonial_section testimonial_section_slider'} />
            <Footer hclass={'wpo-site-footer'}/>
            <Scrollbar />
        </div>
    )
};
export default HomePage;
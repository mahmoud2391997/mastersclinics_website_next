import React, { useEffect, useState } from 'react';
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
import Footer from '../../components/footer/Footer';
import Scrollbar from '../../components/scrollbar/scrollbar';
import ImageSlider from '../../components/adsSlider/index';
import DepartmentsGrid from '@/pages/departments/grid';
import { useRouter } from 'next/router';
import { Filter } from 'lucide-react';
import ArabicSearchForm from './filtering';

const HomePage = () => {
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [isBackgroundBlack, setIsBackgroundBlack] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.query.scroll === "testimonials") {
      const section = document.getElementById("testimonials-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [router.query.scroll]);

  const handleToggleBackground = () => {
    setIsBackgroundBlack(!isBackgroundBlack);
  };

  return (
    <div className={`w-full relative overflow-hidden `}>
      <Navbar
        hclass={'wpo-site-header wpo-site-header-s2'}
        nav={true}
        showAuthPopup={showAuthPopup}
        handleToggleBackground={handleToggleBackground}
        isBackgroundBlack={isBackgroundBlack}
      />
      <Hero hclass={'static-hero'} />
    <ArabicSearchForm />
      <ImageSlider setShowAuthPopup={setShowAuthPopup} />
      <DepartmentsGrid isSwiper={true} slidesToShow={3} slidesToScroll={2} />
      <ServiceSection hclass={"service_section section-padding"} sliceEnd={6} slider={true}/>
      <TeamSection 
        hclass={'team_section section-padding'} 
        sliceEnd={6} 
        slider={true}
        setShowAuthPopup={setShowAuthPopup}
      />            
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
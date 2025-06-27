import React, { Fragment } from 'react';
import Navbar from '../../src/components/Navbar/Navbar';
import PageTitle from '../../src/components/pagetitle/PageTitle'
import ProjectSection from '../../src/components/ProjectSection/ProjectSection';
import CtafromSection from '../../src/components/CtafromSection/CtafromSection';
import Footer from '../../src/components/footer/Footer';
import Scrollbar from '../../src/components/scrollbar/scrollbar';


const ProjectPage = () => {
    return (
        <Fragment>
            <Navbar hclass={'wpo-site-header wpo-site-header-s2'}  />
            <PageTitle pageTitle={'Portfolio'} pagesub={'Portfolio'} />
            <ProjectSection hclass={"project_section_s3 section-padding"} ShowSectionTitle={false} sliceStart={0} sliceEnd={6} />
            <CtafromSection hclass={'ctafrom_section'} />
            <Footer hclass={'wpo-site-footer'} />
            <Scrollbar />

        </Fragment>
    )
};
export default ProjectPage;






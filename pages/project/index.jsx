import React, { Fragment } from 'react';
import Navbar from '../../helpers/components/Navbar/Navbar';
import PageTitle from '../../helpers/components/pagetitle/PageTitle'
import ProjectSection from '../../helpers/components/ProjectSection/ProjectSection';
import CtafromSection from '../../helpers/components/CtafromSection/CtafromSection';
import Footer from '../../helpers/components/footer/Footer';
import Scrollbar from '../../helpers/components/scrollbar/scrollbar';


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






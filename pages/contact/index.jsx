import React, { Fragment } from 'react';
import Navbar from '../../src/components/Navbar/Navbar';
import PageTitle from '../../src/components/pagetitle/PageTitle'
import Contactpage from '../../src/components/Contactpage/Contactpage';
import Scrollbar from '../../src/components/scrollbar/scrollbar'
import Footer from '../../src/components/footer/Footer';


const ContactPage = () => {
    return (
        <Fragment>
            <Navbar hclass={'wpo-site-header wpo-site-header-s2'} />
            <PageTitle pageTitle={'Contact Us'} pagesub={'Contact'} />
            <Contactpage />
            <Footer hclass={'wpo-site-footer_s2'} />
            <Scrollbar />
        </Fragment>
    )
};
export default ContactPage;


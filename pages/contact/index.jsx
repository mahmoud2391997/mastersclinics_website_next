import React, { Fragment } from 'react';
import Navbar from '../../helpers/components/Navbar/Navbar';
import PageTitle from '../../helpers/components/pagetitle/PageTitle'
import Contactpage from '../../helpers/components/Contactpage/Contactpage';
import Scrollbar from '../../helpers/components/scrollbar/scrollbar'
import Footer from '../../helpers/components/footer/Footer';


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


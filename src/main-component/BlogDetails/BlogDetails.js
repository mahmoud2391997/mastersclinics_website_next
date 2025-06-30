import React, { Fragment } from 'react';
import Navbar from '../../components/Navbar/Navbar'
import PageTitle from '../../components/pagetitle/PageTitle'
import Scrollbar from '../../components/scrollbar/scrollbar'
import blogs from '../../api/blogs'
import BlogSingle from '../../components/BlogDetails/BlogSingle.js'
import Footer from '../../components/footer/Footer';
import logo from '../../images/logo-2.svg';

const BlogDetails = () => {

    const { slug } = useParams()
    const BlogDetails = blogs.find(item => item.slug === slug)

    return (
        <Fragment>
            <Navbar Logo={logo} hclass={'wpo-site-header wpo-site-header-s2'} />
            <PageTitle pageTitle={BlogDetails.title} pagesub={'Blog Single'} />
            <BlogSingle />
            <Footer hclass={"wpo-site-footer_s2"}/>
            <Scrollbar />
        </Fragment>
    )
};
export default BlogDetails;

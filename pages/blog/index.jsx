import  { Fragment } from 'react';
import PageTitle from '../../src/components/pagetitle/PageTitle.js'
import BlogList from '../../src/components/BlogList/BlogList.js'
import Navbar from '../../src/components/Navbar/Navbar.js';
import Footer from '../../src/components/footer/Footer.js';
import Scrollbar from '../../src/components/scrollbar/scrollbar.js';
import blogs from '../../src/api/blogs.js'

const BlogPage = () => {
    return (
        <Fragment>
            <Navbar hclass={'wpo-site-header wpo-site-header-s2'} />
            <PageTitle pageTitle={'Latest News'} pagesub={'Blog'} />
            <BlogList props={blogs} />
            <Footer hclass={'wpo-site-footer_s2'} />
            <Scrollbar />
        </Fragment>
    )
};
export default BlogPage;


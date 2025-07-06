import  { Fragment } from 'react';
import PageTitle from '../../helpers/components/pagetitle/PageTitle.js'
import BlogList from '../../helpers/components/BlogList/BlogList.js'
import Navbar from '../../helpers/components/Navbar/Navbar.js';
import Footer from '../../helpers/components/footer/Footer.js';
import Scrollbar from '../../helpers/components/scrollbar/scrollbar.js';
import blogs from '../../helpers/api/blogs.js'

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


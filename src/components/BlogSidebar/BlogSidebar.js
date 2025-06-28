import React from 'react';
import { useRouter } from 'next/router'; // useRouter is useful for programmatic navigation
import about from '../../images/blog/about-widget.jpg';
import blogs from '../../api/blogs';

const SubmitHandler = (e) => {
    e.preventDefault();
};

const ClickHandler = () => {
    window.scrollTo(10, 0);
};

const BlogSidebar = (props) => {
    const router = useRouter(); // Initialize useRouter hook for programmatic navigation

    // Function to handle navigation programmatically
    const handleNavigation = (slug) => {
        router.push(`/blog-single/${slug}`);
        ClickHandler(); // Scroll to the top after navigation
    };

    return (
        <div className={`col col-lg-4 col-12 ${props.blLeft}`}>
            <div className="blog-sidebar">
                <div className="widget about-widget">
                    <div className="img-holder">
                        <img src={about} alt="" />
                    </div>
                    <h4>Linda Johns</h4>
                    <p>Hi! beautiful people. I`m an author of this blog. Read our post - stay with us</p>
                    <div className="social">
                        <ul className="clearfix">
                            <li>
                                <span onClick={() => handleNavigation('Why-Industry-Are-A-Juicy-Target-For-Cyberattack')}>
                                    <i className="ti-facebook"></i>
                                </span>
                            </li>
                            <li>
                                <span onClick={() => handleNavigation('Why-Industry-Are-A-Juicy-Target-For-Cyberattack')}>
                                    <i className="ti-twitter-alt"></i>
                                </span>
                            </li>
                            <li>
                                <span onClick={() => handleNavigation('Why-Industry-Are-A-Juicy-Target-For-Cyberattack')}>
                                    <i className="ti-linkedin"></i>
                                </span>
                            </li>
                            <li>
                                <span onClick={() => handleNavigation('Why-Industry-Are-A-Juicy-Target-For-Cyberattack')}>
                                    <i className="ti-pinterest"></i>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="widget search-widget">
                    <h3>Search Here</h3>
                    <form onSubmit={SubmitHandler}>
                        <div>
                            <input type="text" className="form-control" placeholder="Search Post.." />
                            <button type="submit"><i className="ti-search"></i></button>
                        </div>
                    </form>
                </div>

                <div className="widget category-widget">
                    <h3>Post Categories</h3>
                    <ul>
                        <li>
                            <span onClick={() => handleNavigation('Why-Industry-Are-A-Juicy-Target-For-Cyberattack')}>
                                Neurology <span>5</span>
                            </span>
                        </li>
                        <li>
                            <span onClick={() => handleNavigation('Why-Industry-Are-A-Juicy-Target-For-Cyberattack')}>
                                Urology <span>7</span>
                            </span>
                        </li>
                        <li>
                            <span onClick={() => handleNavigation('Why-Industry-Are-A-Juicy-Target-For-Cyberattack')}>
                                Bags <span>3</span>
                            </span>
                        </li>
                        <li>
                            <span onClick={() => handleNavigation('Why-Industry-Are-A-Juicy-Target-For-Cyberattack')}>
                                HIV/AIDS <span>6</span>
                            </span>
                        </li>
                        <li>
                            <span onClick={() => handleNavigation('Why-Industry-Are-A-Juicy-Target-For-Cyberattack')}>
                                Gestrology <span>2</span>
                            </span>
                        </li>
                        <li>
                            <span onClick={() => handleNavigation('Why-Industry-Are-A-Juicy-Target-For-Cyberattack')}>
                                Dermatology <span>8</span>
                            </span>
                        </li>
                        <li>
                            <span onClick={() => handleNavigation('Why-Industry-Are-A-Juicy-Target-For-Cyberattack')}>
                                Otolaryngology <span>7</span>
                            </span>
                        </li>
                    </ul>
                </div>

                <div className="widget recent-post-widget">
                    <h3>Related Posts</h3>
                    <div className="posts">
                        {blogs.slice(0, 3).map((blog, bl) => (
                            <div className="post" key={bl}>
                                <div className="img-holder">
                                    <img src={blog.screens} alt="" />
                                </div>
                                <div className="details">
                                    <h4>
                                        <span onClick={() => handleNavigation(blog.slug)}>
                                            {blog.title2}
                                        </span>
                                    </h4>
                                    <span className="date">{blog.create_at}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="widget tag-widget">
                    <h3>Tags</h3>
                    <ul>
                        <li>
                            <span onClick={() => handleNavigation('Why-Industry-Are-A-Juicy-Target-For-Cyberattack')}>
                                Health
                            </span>
                        </li>
                        <li>
                            <span onClick={() => handleNavigation('Why-Industry-Are-A-Juicy-Target-For-Cyberattack')}>
                                Beauty
                            </span>
                        </li>
                        <li>
                            <span onClick={() => handleNavigation('Why-Industry-Are-A-Juicy-Target-For-Cyberattack')}>
                                Heart
                            </span>
                        </li>
                        <li>
                            <span onClick={() => handleNavigation('Why-Industry-Are-A-Juicy-Target-For-Cyberattack')}>
                                Doctor
                            </span>
                        </li>
                        <li>
                            <span onClick={() => handleNavigation('Why-Industry-Are-A-Juicy-Target-For-Cyberattack')}>
                                Hospital
                            </span>
                        </li>
                        <li>
                            <span onClick={() => handleNavigation('Why-Industry-Are-A-Juicy-Target-For-Cyberattack')}>
                                Nurocare
                            </span>
                        </li>
                        <li>
                            <span onClick={() => handleNavigation('Why-Industry-Are-A-Juicy-Target-For-Cyberattack')}>
                                Dental
                            </span>
                        </li>
                        <li>
                            <span onClick={() => handleNavigation('Why-Industry-Are-A-Juicy-Target-For-Cyberattack')}>
                                Dermatologist
                            </span>
                        </li>
                        <li>
                            <span onClick={() => handleNavigation('Why-Industry-Are-A-Juicy-Target-For-Cyberattack')}>
                                Pediatrician
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BlogSidebar;

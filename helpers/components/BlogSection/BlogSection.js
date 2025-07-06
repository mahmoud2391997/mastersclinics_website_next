import React from "react";
import Link from 'next/link';
import SectionTitle from "../SectionTitle/SectionTitle";
import blogs from '../../api/blogs';

const ClickHandler = () => {
    window.scrollTo(10, 0);
}

const BlogSection = (props) => {
    return (
        <section className={props.tClass || ""}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-9 col-12">
                        <SectionTitle title="Our Blog" subtitle="Latest Post & Article" />
                    </div>
                </div>
                <div className="row">
                    {blogs.slice(0, 3).map((bloge, bkye) => (
                        <div className="col-lg-4 col-md-6 col-12" key={bkye}>
                            <div className="blog_card">
                                <img src={bloge.screens} alt={bloge.title} />
                                <span>{bloge.tag}</span>
                                <div className="content">
                                    <ul>
                                        <li>{bloge.create_at}</li>
                                        <li>{bloge.author}</li>
                                    </ul>
                                    <h3>{bloge.title}</h3>
                                    {/* Only render the Link if the slug exists */}
                                    {bloge.slug ? (
                                        <Link href={`/blog-single/${bloge.slug}`} onClick={ClickHandler}>
                                            <i className="flaticon-right-arrow"></i>
                                        </Link>
                                    ) : (
                                        <span>No Link Available</span>  // Fallback if no slug
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default BlogSection;

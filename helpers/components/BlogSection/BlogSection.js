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
                                        <Link href={`/blog-single/${bloge.slug}`} onClick={ClickHandler} className=" items-center justify-center" style={{display:"flex"}}>
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                width="40" 
                                                height="40" 
                                                viewBox="0 0 24 24" 
                                                fill="white" 
                                                stroke="white" 
                                                strokeWidth="2" 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round"
                                                className="ml-1"
                                                                          style={{ color: "white", fill: "white", stroke: "white" }}

                                            >
                                                <path d="M5 12h14M12 5l7 7-7 7"/>
                                            </svg>
                                        </Link>
                                    ) : (
                                        <span>No Link Available</span>
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
import React from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../SectionTitle/SectionTitle";
import blogs from '../../api/blogs';

const ClickHandler = () => {
    window.scrollTo(10, 0);
};

const BlogSection = (props) => {
    return (
        <section className={`${props.tClass} py-16`} dir="rtl">
            <div className="container mx-auto px-4">
                <div className="flex justify-center mb-12">
                    <div className="w-full lg:w-9/12">
                        <SectionTitle 
                            title="مدونتنا" 
                            subtitle="أحدث المقالات والمنشورات"
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-2">
                    {blogs.slice(0, 3).map((blog, index) => (
                        <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-16" key={index}>
                            <div className="blog-card relative bg-white shadow-[0px_0px_22px_rgba(18,47,105,0.05),0px_0px_0px_rgba(63,85,204,0.05)] rounded-[20px] mx-[10px] md:mx-0 mb-[60px]">
                                {/* Gold tag */}
                                <span className="absolute right-5 top-5 text-white text-base font-normal leading-7 px-5 py-0.5 rounded-full bg-gradient-to-b from-[#A58532] via-[#B59542] to-[#f0db83]">
                                    {blog.tag}
                                </span>
                                
                                {/* Blog image */}
                                <img 
                                    src={blog.screens} 
                                    alt={blog.title}
                                    className="w-full rounded-t-[20px]"
                                />
                                
                                {/* Blog content */}
                                <div className="content p-8 md:p-[30px]">
                                    <ul className="pr-0">
                                        {[blog.create_at, blog.author].map((item, i) => (
                                            <li 
                                                key={i}
                                                className="inline-block text-[#767676] text-lg md:text-[18px] font-normal leading-[30px] pr-10 md:pr-[40px] relative"
                                            >
                                                {i > 0 && (
                                                    <span className="absolute right-[-15px] md:right-[-25px] top-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full bg-[#767676]"></span>
                                                )}
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    
                                    <h3 className="mt-1 text-[38px] md:text-[50px] font-normal leading-[40px] md:leading-[50px] text-right">
                                        {blog.title}
                                    </h3>
                                    
                                    <Link
                                        onClick={ClickHandler}
                                        to={`/blog-single/${blog.slug}`}
                                        className="block w-16 h-16 rounded-full bg-gradient-to-b from-[#A58532] via-[#B59542] to-[#f0db83] text-white text-center relative -mb-[63px] mr-5 md:mr-[20px] mt-[30px]"
                                    >
                                        <i className="flaticon-right-arrow text-[26px] leading-[70px] transform rotate-180"></i>
                                    </Link>
                                </div>
                                
                                {/* Decorative elements */}
                                <div 
                                    className="absolute left-5 bottom-[-8px] w-[130px] h-[60px] bg-no-repeat bg-center"
                                    style={{ backgroundImage: "url('/images/common-shape-2.png')" }}
                                ></div>
                                <div 
                                    className="absolute left-[15px] bottom-[-50px] w-[130px] h-[60px] bg-no-repeat bg-center transform rotate-180 -z-10"
                                    style={{ backgroundImage: "url('/images/common-shape-blog.png')" }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
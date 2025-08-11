'use client';

import React, { useEffect, useRef } from "react";
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SectionTitle from "../SectionTitle/SectionTitle";
import { fetchBlogs } from "@/store/slices/blogs";
import getImageUrl from "@/utilies/getImageUrl";

const ClickHandler = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo(10, 0);
  }
};

const BlogSection = ({ tClass = '' }) => {
  const dispatch = useDispatch();
  const sliderRef = useRef(null);

  const blogs = useSelector((state) => state.blogs.items);
  const loading = useSelector((state) => state.blogs.loading);
  const error = useSelector((state) => state.blogs.error);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  // Slider settings with RTL support
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
      autoplay: true,

    slidesToShow: 3,
    slidesToScroll: 1,
    rtl: true, // Right-to-left support
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  const topBlogs = blogs
    .filter((blog) => blog?.slug && blog?.title2)
    .slice(0, 6); // Show more items for slider

  if (loading) {
    return <p style={{ textAlign: 'center' }}>جاري تحميل أحدث المقالات...</p>;
  }

  if (error) {
    return <p style={{ textAlign: 'center', color: 'red' }}>حدث خطأ أثناء جلب المقالات: {error}</p>;
  }

  return (
    <section className={tClass}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-9 col-12">
            <SectionTitle title="مدونتنا" subtitle="أحدث المقالات والنصائح" />
          </div>
        </div>
        
        {/* Slider Container */}
        <div className="row">
          <div className="col-12">
            <Slider ref={sliderRef} {...settings}>
                 {topBlogs.map((blog, index) => (
            <div className="col-lg-4 col-md-6 col-12 p-1" key={blog.id || index} dir="ltr">
              <div className="blog_card">
                {blog.image && (
                  <img src={getImageUrl(blog.image)} alt={blog.title2} style={{ height: 200, objectFit: 'cover' }} />
                )}
                <span>{blog.tag || "مقال"}</span>
                <div className="content">
                  <ul>
                    <li>{new Date(blog.create_at).toLocaleDateString('ar-EG')}</li>
                    <li className="text-[#dec06a]" style={{color:"#dec06a"}}>{blog.author}</li>
                  </ul>
                  <h3>{blog.title2}</h3>
                  <p style={{ fontSize: '14px', color: '#666' }}>
                    {blog.content?.split('\n')[0]?.slice(0, 100)}...
                  </p>
                  <Link
                    href={`/blog/${blog.id}`}
                    onClick={ClickHandler}
                    className="items-center justify-center"
                    style={{ display: "flex" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="stroke-white rotate-180 flex-shrink-0"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
            </Slider>
          </div>
        </div>

        {/* View All Button */}
        <div className="row justify-content-center mt-5">
          <div className="col-12 text-center">
            <Link
              href="/blogs"
              className="relative pl-16 inline-flex items-center justify-between 
                         bg-gradient-to-b from-[#A58532] via-[#CBA853] to-[#f0db83]
                         text-white font-bold rounded-full py-3 px-8
                         hover:-translate-y-1 hover:shadow-md transition-all duration-300 gap-4"
            >
              <span className="absolute left-3 w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#CBA853"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </span>
              <span className="flex-1 text-end">عرض جميع المقالات</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
'use client';

import React, { useEffect } from "react";
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
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

  const blogs = useSelector((state) => state.blogs.items);
  const loading = useSelector((state) => state.blogs.loading);
  const error = useSelector((state) => state.blogs.error);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const topBlogs = blogs
    .filter((blog) => blog?.slug && blog?.title2)
    .slice(0, 3);

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
        <div className="row">
          {topBlogs.map((blog, index) => (
            <div className="col-lg-4 col-md-6 col-12" key={blog.id || index}>
              <div className="blog_card">
                {blog.image && (
                  <img src={getImageUrl(blog.image)} alt={blog.title2} style={{ height: 200, objectFit: 'cover' }} />
                )}
                <span>{blog.tag || "مقال"}</span>
                <div className="content">
                  <ul>
                    <li>{new Date(blog.create_at).toLocaleDateString('ar-EG')}</li>
                    <li>{blog.author}</li>
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
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

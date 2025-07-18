"use client";

import React, { Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Navbar from "../../helpers/components/Navbar/Navbar";
import PageTitle from "../../helpers/components/pagetitle/PageTitle";
import Footer from "../../helpers/components/footer/Footer";
import BlogSidebar from "../../helpers/components/BlogSidebar/BlogSidebar";
import { fetchBlogById } from "../../store/slices/blogs"; // Adjust path if needed
import { getImageUrl } from "../../helpers/hooks/imageUrl";

const imageUrlFallback = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPPnn7ieaDAQbvg_f37_pB_ILw8quxYBTXKw&s";

const BlogSingle = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const blog = useSelector((state) => state.blogs.selectedBlog);
  const loading = useSelector((state) => state.blogs.loading);
  const error = useSelector((state) => state.blogs.error);

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <p className="text-center mt-10">جارٍ تحميل المقال...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">حدث خطأ: {error}</p>;
  }

  if (!blog) {
    return <p className="text-center mt-10">لم يتم العثور على المقال.</p>;
  }

  const blogImage = getImageUrl(blog.image) || imageUrlFallback;

  return (
    <section className="wpo-blog-single-section section-padding" dir="rtl">
      <div className="container">
        <div className="row">
          <div className={`col col-lg-8 col-12 ${props.blRight}`}>
            <div className="wpo-blog-content">
              <div className="post format-standard-image">
                <div className="entry-media">
                  <img src={blogImage} alt="" className="w-full rounded-lg" />
                </div>
                <div className="entry-meta mt-4">
                  <ul className="flex gap-4 text-gray-600">
                    <li>
                      <i className="fi flaticon-user mr-1"></i> بواسطة{" "}
                      <Link href="#" className="text-primary hover:underline">{blog.author}</Link>
                    </li>
                    <li>
                      <i className="fi flaticon-comment-white-oval-bubble mr-1"></i> تعليقات {blog.comment}
                    </li>
                    <li>
                      <i className="fi flaticon-calendar mr-1"></i> {blog.create_at}
                    </li>
                  </ul>
                </div>
                <h2 className="text-2xl font-bold my-4">{blog.title2}</h2>
                <p className="mb-4">{blog.content || "لا يوجد محتوى متاح لهذا المقال."}</p>

                <blockquote className="border-r-4 border-primary bg-gray-50 p-4 my-6">
                  هذا اقتباس تجريبي يمكن استبداله بمحتوى خاص بالمدونة.
                </blockquote>

                <p className="mb-6">
                  سأشرح لك كيف نشأت كل هذه الأفكار الخاطئة حول إنكار المتعة وتمجيد الألم، وسأعطيك شرحًا كاملًا للنظام، وسأعرض لك التعاليم الحقيقية لمستكشف الحقيقة العظيم، مهندس السعادة البشرية.
                </p>

                {/* You can add SimpleGallery here if you have images array */}
                
                <div className="tag-share clearfix flex justify-between items-center my-6">
                  <div className="tag">
                    <span className="font-medium">التصنيفات: </span>
                    <ul className="inline-flex gap-2">
                      {['تخطيط', 'صحة', 'جمال'].map((tag, index) => (
                        <li key={index}>
                          <Link href="#" className="text-primary hover:underline">{tag}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="author-box bg-gray-50 p-6 rounded-lg my-8">
                  <div className="flex items-center gap-4">
                    <div className="author-avatar">
                      <Link href="#">
                        <img src={blogImage} alt="صورة الكاتب" className="w-16 h-16 rounded-full object-cover" />
                      </Link>
                    </div>
                    <div className="author-content">
                      <Link href="#" className="author-name font-bold text-lg block mb-2">المؤلف: {blog.author}</Link>
                      <p className="text-gray-600 mb-2">لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار المتعة وتمجيد الألم نشأت بالفعل.</p>
                      <div className="socials">
                        <ul className="social-link flex gap-2">
                          {['facebook', 'twitter-alt', 'linkedin', 'instagram'].map((icon, idx) => (
                            <li key={idx}>
                              <Link href="#" className="text-gray-500 hover:text-primary">
                                <i className={`ti-${icon}`}></i>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comments area & form, you can keep as is */}
              </div>
            </div>
          </div>
          <BlogSidebar blLeft={props.blLeft} />
        </div>
      </div>
    </section>
  );
};

const BlogDetails = () => {
  return (
    <Fragment>
      <Navbar hclass={"wpo-site-header wpo-site-header-s2"} />
      <PageTitle pageTitle={"عنوان"} pagesub={"Blog Single"} />
      <BlogSingle />
      <Footer hclass={"wpo-site-footer_s2"} />
    </Fragment>
  );
};

export default BlogDetails;

"use client";
import React, { Fragment } from "react";
import Link from "next/link";
import Navbar from "../../helpers/components/Navbar/Navbar";
import PageTitle from "../../helpers/components/pagetitle/PageTitle";
import Footer from "../../helpers/components/footer/Footer";
import BlogSidebar from "../../helpers/components/BlogSidebar/BlogSidebar";

const imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPPnn7ieaDAQbvg_f37_pB_ILw8quxYBTXKw&s";

const BlogDetailsData = {
  slug: "mockup-slug",
  blogSingleImg: imageUrl,
  author: "د. محمد أحمد",
  comment: 5,
  create_at: "10 يوليو 2025",
  title2: "عنوان تجريبي للمقال الطبي",
};

const SimpleGallery = () => {
  const images = [imageUrl, imageUrl];
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto my-8">
      <img
        src={images[currentIndex]}
        alt={`صورة ${currentIndex + 1}`}
        className="w-full h-64 object-cover rounded-lg transition-all duration-500"
      />
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-60 p-2 rounded-full shadow hover:bg-opacity-80 transition"
      >
        ◀
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-60 p-2 rounded-full shadow hover:bg-opacity-80 transition"
      >
        ▶
      </button>
    </div>
  );
};

const BlogSingle = (props) => {
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <section className="wpo-blog-single-section section-padding" dir="rtl">
      <div className="container">
        <div className="row">
          <div className={`col col-lg-8 col-12 ${props.blRight}`}>
            <div className="wpo-blog-content">
              <div className="post format-standard-image">
                <div className="entry-media">
                  <img src={imageUrl} alt="" className="w-full rounded-lg" />
                </div>
                <div className="entry-meta mt-4">
                  <ul className="flex gap-4 text-gray-600">
                    <li>
                      <i className="fi flaticon-user mr-1"></i> بواسطة{" "}
                      <Link href="#" className="text-primary hover:underline">{BlogDetailsData.author}</Link>
                    </li>
                    <li>
                      <i className="fi flaticon-comment-white-oval-bubble mr-1"></i> تعليقات {BlogDetailsData.comment}
                    </li>
                    <li>
                      <i className="fi flaticon-calendar mr-1"></i> {BlogDetailsData.create_at}
                    </li>
                  </ul>
                </div>
                <h2 className="text-2xl font-bold my-4">{BlogDetailsData.title2}</h2>
                <p className="mb-4">هناك العديد من الأشكال المختلفة لنصوص لوريم إيبسوم المتاحة، ولكن الغالبية تعرضت للتغيير بشكل ما، سواء بإدخال بعض النوادر أو الكلمات العشوائية.</p>
                <blockquote className="border-r-4 border-primary bg-gray-50 p-4 my-6">
                  عند دمجها مع بعض هياكل الجمل النموذجية، ينتج نص لوريم إيبسوم المعقول والخالي من التكرار أو الكلمات غير المميزة.
                </blockquote>
                <p className="mb-6">سأشرح لك كيف نشأت كل هذه الأفكار الخاطئة حول إنكار المتعة وتمجيد الألم، وسأعطيك شرحًا كاملًا للنظام، وسأعرض لك التعاليم الحقيقية لمستكشف الحقيقة العظيم، مهندس السعادة البشرية.</p>
                <SimpleGallery />
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
                        <img src={imageUrl} alt="صورة الكاتب" className="w-16 h-16 rounded-full object-cover" />
                      </Link>
                    </div>
                    <div className="author-content">
                      <Link href="#" className="author-name font-bold text-lg block mb-2">المؤلف: {BlogDetailsData.author}</Link>
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
                <div className="comments-area mt-8">
                  <div className="comments-section">
                    <h3 className="comments-title text-xl font-bold mb-4">التعليقات</h3>
                    <ol className="comments">
                      <li className="comment mb-6">
                        <div className="flex gap-4">
                          <div className="comment-theme">
                            <div className="comment-image">
                              <img src={imageUrl} alt="صورة المعلق" className="w-12 h-12 rounded-full object-cover" />
                            </div>
                          </div>
                          <div className="comment-main-area flex-1">
                            <div className="comment-wrapper">
                              <div className="comments-meta mb-2">
                                <h4 className="font-bold">
                                  جون إبراهيم <span className="comments-date text-sm text-gray-500">12 يناير 2024 الساعة 9:00 ص</span>
                                </h4>
                              </div>
                              <div className="comment-area">
                                <p className="text-gray-700">سأعطيك شرحًا كاملًا للنظام، وسأعرض لك التعاليم الحقيقية لمستكشف الحقيقة العظيم.</p>
                                <div className="comments-reply mt-2">
                                  <Link className="comment-reply-link text-primary hover:underline" href="#">
                                    <span>رد</span>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ol>
                  </div>
                  <div className="comment-respond mt-8">
                    <h3 className="comment-reply-title text-xl font-bold mb-4">أضف تعليقًا</h3>
                    <form onSubmit={(e) => e.preventDefault()} className="comment-form">
                      <div className="form-textarea mb-4">
                        <textarea placeholder="اكتب تعليقك هنا..." className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" rows="5"></textarea>
                      </div>
                      <div className="form-inputs grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <input placeholder="الاسم" type="text" className="p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                        <input placeholder="البريد الإلكتروني" type="email" className="p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                        <input placeholder="الموقع الإلكتروني" type="url" className="p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                      </div>
                      <div className="form-submit">
                        <input value="نشر التعليق" type="submit" className="bg-primary text-white py-3 px-6 rounded-lg cursor-pointer hover:bg-primary-dark transition" />
                      </div>
                    </form>
                  </div>
                </div>
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

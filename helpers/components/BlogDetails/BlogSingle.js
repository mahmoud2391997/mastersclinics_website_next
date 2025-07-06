import React from 'react';
import Link from 'next/link';
import blog3 from '../../images/blog-details/comments-author/img-1.jpg';
import blog4 from '../../images/blog-details/comments-author/img-2.jpg';
import blog5 from '../../images/blog-details/comments-author/img-3.jpg';
import blog6 from '../../images/blog-details/author.jpg';
import gl1 from '../../images/blog/img-1.jpg';
import gl2 from '../../images/blog/img-2.jpg';
import blogs from '../../api/blogs';
import { useRouter } from 'next/router';
import BlogSidebar from '../BlogSidebar/BlogSidebar';

const BlogSingle = (props) => {
    const router = useRouter();
    const { slug } = router.query;

    const BlogDetails = blogs.find(item => item.slug === slug);

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
                                    <img src={BlogDetails.blogSingleImg} alt="" />
                                </div>
                                <div className="entry-meta">
                                    <ul>
                                        <li><i className="fi flaticon-user"></i> بواسطة <Link href="/blog-single/Why-Industry-Are-A-Juicy-Target-For-Cyberattack">{BlogDetails.author}</Link></li>
                                        <li><i className="fi flaticon-comment-white-oval-bubble"></i> تعليقات {BlogDetails.comment}</li>
                                        <li><i className="fi flaticon-calendar"></i> {BlogDetails.create_at}</li>
                                    </ul>
                                </div>
                                <h2>{BlogDetails.title2}</h2>
                                <p>هناك العديد من الأشكال المختلفة لنصوص لوريم إيبسوم المتاحة، ولكن الغالبية تعرضت للتغيير بشكل ما، سواء بإدخال بعض النوادر أو الكلمات العشوائية. إذا كنت تنوي استخدام نص لوريم إيبسوم، يجب أن تتأكد من عدم وجود أي كلمات أو عبارات محرجة مخفية في منتصف النص.</p>
                                <blockquote>
                                    عند دمجها مع بعض هياكل الجمل النموذجية، ينتج نص لوريم إيبسوم المعقول والخالي من التكرار أو الكلمات غير المميزة.
                                </blockquote>
                                <p>سأشرح لك كيف نشأت كل هذه الأفكار الخاطئة حول إنكار المتعة وتمجيد الألم، وسأعطيك شرحًا كاملًا للنظام، وسأعرض لك التعاليم الحقيقية لمستكشف الحقيقة العظيم، مهندس السعادة البشرية.</p>

                                <div className="gallery">
                                    <div>
                                        <img src={gl1} alt="" />
                                    </div>
                                    <div>
                                        <img src={gl2} alt="" />
                                    </div>
                                </div>
                            </div>

                            <div className="tag-share clearfix">
                                <div className="tag">
                                    <span>شارك: </span>
                                    <ul>
                                        <li><Link href="/blog-single/Why-Industry-Are-A-Juicy-Target-For-Cyberattack">تخطيط</Link></li>
                                        <li><Link href="/blog-single/Why-Industry-Are-A-Juicy-Target-For-Cyberattack">صحة</Link></li>
                                        <li><Link href="/blog-single/Why-Industry-Are-A-Juicy-Target-For-Cyberattack">جمال</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="tag-share-s2 clearfix">
                                <div className="tag">
                                    <span>شارك: </span>
                                    <ul>
                                        <li><Link href="/blog-single/Why-Industry-Are-A-Juicy-Target-For-Cyberattack">فيسبوك</Link></li>
                                        <li><Link href="/blog-single/Why-Industry-Are-A-Juicy-Target-For-Cyberattack">تويتر</Link></li>
                                        <li><Link href="/blog-single/Why-Industry-Are-A-Juicy-Target-For-Cyberattack">لينكد إن</Link></li>
                                        <li><Link href="/blog-single/Why-Industry-Are-A-Juicy-Target-For-Cyberattack">بينتريست</Link></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="author-box">
                                <div className="author-avatar">
                                    <Link href="/blog-single/Why-Industry-Are-A-Juicy-Target-For-Cyberattack" target="_blank"><img src={blog6} alt="" /></Link>
                                </div>
                                <div className="author-content">
                                    <Link href="/blog-single/Why-Industry-Are-A-Juicy-Target-For-Cyberattack" className="author-name">المؤلف: {BlogDetails.author}</Link>
                                    <p>لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار المتعة وتمجيد الألم نشأت بالفعل.</p>
                                    <div className="socials">
                                        <ul className="social-link">
                                            <li><Link href="/blog-single/Why-Industry-Are-A-Juicy-Target-For-Cyberattack"><i className="ti-facebook"></i></Link></li>
                                            <li><Link href="/blog-single/Why-Industry-Are-A-Juicy-Target-For-Cyberattack"><i className="ti-twitter-alt"></i></Link></li>
                                            <li><Link href="/blog-single/Why-Industry-Are-A-Juicy-Target-For-Cyberattack"><i className="ti-linkedin"></i></Link></li>
                                            <li><Link href="/blog-single/Why-Industry-Are-A-Juicy-Target-For-Cyberattack"><i className="ti-instagram"></i></Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="more-posts">
                                <div className="previous-post">
                                    <Link href="/blog">
                                        <span className="post-control-link">المقال السابق</span>
                                        <span className="post-name">لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار المتعة وتمجيد الألم نشأت بالفعل.</span>
                                    </Link>
                                </div>
                                <div className="next-post">
                                    <Link href="/blog-left-sidebar">
                                        <span className="post-control-link">المقال التالي</span>
                                        <span className="post-name">لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار المتعة وتمجيد الألم نشأت بالفعل.</span>
                                    </Link>
                                </div>
                            </div>

                            <div className="comments-area">
                                <div className="comments-section">
                                    <h3 className="comments-title">التعليقات</h3>
                                    <ol className="comments">
                                        <li className="comment even thread-even depth-1" id="comment-1">
                                            <div id="div-comment-1">
                                                <div className="comment-theme">
                                                    <div className="comment-image"><img src={blog3} alt="" /></div>
                                                </div>
                                                <div className="comment-main-area">
                                                    <div className="comment-wrapper">
                                                        <div className="comments-meta">
                                                            <h4>جون إبراهيم <span className="comments-date">12 يناير 2024 الساعة 9:00 ص</span></h4>
                                                        </div>
                                                        <div className="comment-area">
                                                            <p>سأعطيك شرحًا كاملًا للنظام، وسأعرض لك التعاليم الحقيقية لمستكشف الحقيقة العظيم.</p>
                                                            <div className="comments-reply">
                                                                <Link className="comment-reply-link" href="/blog-single/Why-Industry-Are-A-Juicy-Target-For-Cyberattack"><span>رد</span></Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul className="children">
                                                <li className="comment">
                                                    <div>
                                                        <div className="comment-theme">
                                                            <div className="comment-image"><img src={blog4} alt="" /></div>
                                                        </div>
                                                        <div className="comment-main-area">
                                                            <div className="comment-wrapper">
                                                                <div className="comments-meta">
                                                                    <h4>ليلي واتسون <span className="comments-date">12 يناير 2024 الساعة 9:00 ص</span></h4>
                                                                </div>
                                                                <div className="comment-area">
                                                                    <p>سأعطيك شرحًا كاملًا للنظام، وسأعرض لك التعاليم الحقيقية لمستكشف الحقيقة العظيم.</p>
                                                                    <div className="comments-reply">
                                                                        <Link className="comment-reply-link" href="/blog-single/Why-Industry-Are-A-Juicy-Target-For-Cyberattack"><span>رد</span></Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <ul>
                                                        <li className="comment">
                                                            <div>
                                                                <div className="comment-theme">
                                                                    <div className="comment-image"><img src={blog5} alt="" /></div>
                                                                </div>
                                                                <div className="comment-main-area">
                                                                    <div className="comment-wrapper">
                                                                        <div className="comments-meta">
                                                                            <h4>جون إبراهيم <span className="comments-date">12 يناير 2024 الساعة 9:00 ص</span></h4>
                                                                        </div>
                                                                        <div className="comment-area">
                                                                            <p>سأعطيك شرحًا كاملًا للنظام، وسأعرض لك التعاليم الحقيقية لمستكشف الحقيقة العظيم.</p>
                                                                            <div className="comments-reply">
                                                                                <Link className="comment-reply-link" href="/blog-single/Why-Industry-Are-A-Juicy-Target-For-Cyberattack"><span>رد</span></Link>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="comment">
                                            <div>
                                                <div className="comment-theme">
                                                    <div className="comment-image"><img src={blog3} alt="" /></div>
                                                </div>
                                                <div className="comment-main-area">
                                                    <div className="comment-wrapper">
                                                        <div className="comments-meta">
                                                            <h4>جون إبراهيم <span className="comments-date">12 يناير 2024 الساعة 9:00 ص</span></h4>
                                                        </div>
                                                        <div className="comment-area">
                                                            <p>سأعطيك شرحًا كاملًا للنظام، وسأعرض لك التعاليم الحقيقية لمستكشف الحقيقة العظيم.</p>
                                                            <div className="comments-reply">
                                                                <Link className="comment-reply-link" href="/blog-single/Why-Industry-Are-A-Juicy-Target-For-Cyberattack"><span>رد</span></Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ol>
                                </div>
                                <div className="comment-respond">
                                    <h3 className="comment-reply-title">أضف تعليقًا</h3>
                                    <form onSubmit={submitHandler} id="commentform" className="comment-form">
                                        <div className="form-textarea">
                                            <textarea id="comment" placeholder="اكتب تعليقك هنا..."></textarea>
                                        </div>
                                        <div className="form-inputs">
                                            <input placeholder="الموقع الإلكتروني" type="url" />
                                            <input placeholder="الاسم" type="text" />
                                            <input placeholder="البريد الإلكتروني" type="email" />
                                        </div>
                                        <div className="form-submit">
                                            <input id="submit" value="نشر التعليق" type="submit" />
                                        </div>
                                    </form>
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

export default BlogSingle;
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlogs } from '../../../store/slices/blogs'; // <-- adjust path if different
import BlogSidebar from '../BlogSidebar/BlogSidebar';
import VideoModal from '../ModalVideo/VideoModal';

const ClickHandler = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo(10, 0);
  }
};

const BlogList = ({ blRight = 'default-blRight-class', blLeft = 'default-blLeft-class' }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // 🔥 Get blogs from Redux store
  const blogs = useSelector((state) => state.blogs.items);
  console.log(blogs);
  
  const loading = useSelector((state) => state.blogs.loading);
  const error = useSelector((state) => state.blogs.error);

  // 🚀 Fetch blogs on mount
  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  // ✅ Filter valid blogs only
  const validBlogs = blogs.filter((blog) => blog?.slug && blog?.title2);

  const handleNavigation = (id) => {
    router.push(`/blog/${id}`);
    ClickHandler();
  };

  if (loading) {
    return <p style={{ textAlign: 'center' }}>Loading blogs...</p>;
  }

  if (error) {
    return <p style={{ textAlign: 'center', color: 'red' }}>Error: {error}</p>;
  }

  return (
    <section className="wpo-blog-pg-section section-padding">
      <div className="container">
        <div className="row">
          <div className={`col col-lg-8 col-12 ${blRight}`}>
            <div className="wpo-blog-content">
              {validBlogs.slice(0, 3).map((blog, bitem) => (
                <div className={`post ${blog.blClass || ''}`} key={blog.id || bitem}>
                  <div className="entry-media video-holder">
                    <img src={blog.blogSingleImg} alt="" />
                    <VideoModal />
                  </div>
                  <div className="entry-meta">
                    <ul>
                      <li>
                        <i className="fi flaticon-user"></i> By{' '}
                        <span
                          onClick={() => handleNavigation(blog.id)}
                          style={{ cursor: 'pointer', color: '#3498db' }}
                        >
                          {blog.author}
                        </span>
                      </li>
                      <li>
                        <i className="fi flaticon-comment-white-oval-bubble"></i> Comments {blog.comment}
                      </li>
                      <li>
                        <i className="fi flaticon-calendar"></i> {blog.create_at}
                      </li>
                    </ul>
                  </div>
                  <div className="entry-details">
                    <h3>
                      <span
                        onClick={() => handleNavigation(blog.id)}
                        style={{ cursor: 'pointer', color: '#3498db' }}
                      >
                        {blog.title2}
                      </span>
                    </h3>
                    <p>
                      {blog.shortDescription ||
                        'Law is a great career path if you want to build a broad skill set that includes everything from critical thinking and strategic planning to communications. If you love rising to a challenge.'}
                    </p>
                    <span
                      onClick={() => handleNavigation(blog.id)}
                      className="read-more"
                      style={{ cursor: 'pointer', color: '#3498db' }}
                    >
                      READ MORE...
                    </span>
                  </div>
                </div>
              ))}

              <div className="pagination-wrapper pagination-wrapper-left">
                <ul className="pg-pagination">
                  <li>
                    <span
                      onClick={() => router.push('/blog-left-sidebar')}
                      aria-label="Previous"
                      style={{ cursor: 'pointer' }}
                    >
                      <i className="fi ti-angle-left"></i>
                    </span>
                  </li>
                  <li className="active">
                    <span onClick={() => router.push('/blog-left-sidebar')} style={{ cursor: 'pointer' }}>
                      1
                    </span>
                  </li>
                  <li>
                    <span onClick={() => router.push('/blog-left-sidebar')} style={{ cursor: 'pointer' }}>
                      2
                    </span>
                  </li>
                  <li>
                    <span onClick={() => router.push('/blog-left-sidebar')} style={{ cursor: 'pointer' }}>
                      3
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={() => router.push('/blog-left-sidebar')}
                      aria-label="Next"
                      style={{ cursor: 'pointer' }}
                    >
                      <i className="fi ti-angle-right"></i>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <BlogSidebar blLeft={blLeft} />
        </div>
      </div>
    </section>
  );
};

export default BlogList;

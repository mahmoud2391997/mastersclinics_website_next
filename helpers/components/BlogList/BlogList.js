'use client';

import React from 'react';
import { useRouter } from 'next/router'; // Import useRouter hook for navigation
import BlogSidebar from '../BlogSidebar/BlogSidebar';
import VideoModal from '../ModalVideo/VideoModal';
import blogs from '../../api/blogs';

const ClickHandler = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo(10, 0);
  }
};

const BlogList = ({ blRight = 'default-blRight-class', blLeft = 'default-blLeft-class' }) => {
  const router = useRouter(); // Initialize useRouter hook to navigate programmatically
  const validBlogs = blogs.filter(blog => blog?.slug && blog?.title2);

  const handleNavigation = (slug) => {
    // Use router.push to navigate to the blog's individual page
    router.push(`/blog-single/${slug}`);
    ClickHandler(); // Scroll to the top after navigation
  };

  return (
    <section className="wpo-blog-pg-section section-padding">
      <div className="container">
        <div className="row">
          <div className={`col col-lg-8 col-12 ${blRight}`}>
            <div className="wpo-blog-content">
              {validBlogs.slice(0, 3).map((blog, bitem) => (
                <div className={`post ${blog.blClass || ''}`} key={bitem}>
                  <div className="entry-media video-holder">
                    <img src={blog.blogSingleImg} alt="" />
                    <VideoModal />
                  </div>
                  <div className="entry-meta">
                    <ul>
                      <li>
                        <i className="fi flaticon-user"></i> By{' '}
                        <span
                          onClick={() => handleNavigation(blog.slug)} // Use handleNavigation for author
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
                        onClick={() => handleNavigation(blog.slug)} // Use handleNavigation for title click
                        style={{ cursor: 'pointer', color: '#3498db' }}
                      >
                        {blog.title2}
                      </span>
                    </h3>
                    <p>
                      Law is a great career path if you want to build a broad skill set that includes
                      everything from critical thinking and strategic planning to communications. If you
                      love rising to a challenge.
                    </p>
                    <span
                      onClick={() => handleNavigation(blog.slug)} // Use handleNavigation for "Read More" click
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
                      onClick={() => router.push('/blog-left-sidebar')} // Programmatic navigation for pagination
                      aria-label="Previous"
                      style={{ cursor: 'pointer' }}
                    >
                      <i className="fi ti-angle-left"></i>
                    </span>
                  </li>
                  <li className="active">
                    <span
                      onClick={() => router.push('/blog-left-sidebar')}
                      style={{ cursor: 'pointer' }}
                    >
                      1
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={() => router.push('/blog-left-sidebar')}
                      style={{ cursor: 'pointer' }}
                    >
                      2
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={() => router.push('/blog-left-sidebar')}
                      style={{ cursor: 'pointer' }}
                    >
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

          {/* Sidebar using default value as well */}
          <BlogSidebar blLeft={blLeft} />
        </div>
      </div>
    </section>
  );
};

export default BlogList;

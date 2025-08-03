"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "@/store/slices/blogs";
import BlogSidebar from "../BlogSidebar/BlogSidebar";
import VideoModal from "../ModalVideo/VideoModal";
import { getImageUrl } from "../../hooks/imageUrl";

const BlogList = ({ blRight = "", blLeft = "" }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { items: blogs, loading, error } = useSelector((state) => state.blogs);

  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  // Fetch blogs on mount
  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  // Filter blogs based on search query
  useEffect(() => {
    if (!blogs || blogs.length === 0) {
      setFilteredBlogs([]);
      return;
    }

    const query = searchQuery.trim().toLowerCase();
    if (query === "") {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter((blog) =>
        blog.title2?.toLowerCase().includes(query) ||
        blog.title?.toLowerCase().includes(query) ||
        blog.excerpt?.toLowerCase().includes(query)
      );
      setFilteredBlogs(filtered);
    }
  }, [blogs, searchQuery]);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const openVideoModal = (videoId) => {
    setSelectedVideoId(videoId);
  };

  const closeVideoModal = () => {
    setSelectedVideoId(null);
  };

  const fallbackImage = "/images/blog/fallback.jpg";

  // Function to truncate content to 3 lines
  const truncateContent = (content) => {
    if (!content) return "لا يوجد وصف متاح.";
    const lines = content.split('\n').filter(line => line.trim() !== '');
    const firstThreeLines = lines.slice(0, 3).join('\n');
    return firstThreeLines;
  };

  if (loading && !blogs.length) {
    return (
      <p style={{ textAlign: "center" }}>جاري تحميل المقالات...</p>
    );
  }

  if (error) {
    return (
      <p style={{ textAlign: "center", color: "red" }}>خطأ: {error}</p>
    );
  }

  return (
    <section className="wpo-blog-pg-section section-padding" dir="rtl">
      <div className="container">
        <div className="row">
          {/* المقالات */}
          <div className={`col col-lg-8 col-12 ${blRight}`}>
            <div className="wpo-blog-content">
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog, index) => (
                  <div className={`post ${blog.blClass || ""}`} key={blog.id || index}>
                    {blog.image && (
                      <div className="entry-media video-holder relative">
                        <img
                          src={getImageUrl(blog.image) || fallbackImage}
                          alt={blog.title2 || blog.title || "مدونة"}
                          onError={(e) => {
                            (e.target).src = fallbackImage;
                          }}
                        />
                        {blog.videoId && (
                          <div
                            className="video-btn"
                            onClick={() => openVideoModal(blog)}
                            style={{ cursor: "pointer" }}
                          >
                            <i className="fi flaticon-play-button"></i>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="entry-meta">
                    <ul className="flex gap-6 text-gray-600" dir="rtl">
    <li className="flex items-center gap-1">
      <span>
        بواسطة
        <span className="hover:underline mr-1" style={{ color: "#dec06a" }}>
          {blog.author}
        </span>{" "}
      </span>
      <i className="fi flaticon-user"></i>
    </li>
    
    <li className="flex items-center gap-1 ">
      <span className="md:mr-3">تعليقات {blog.comment}</span>
      <i className="fi flaticon-comment-white-oval-bubble"></i>
    </li>

    <li className="flex flex-row-reverse items-center gap-1">
        <i className="fi flaticon-calendar"></i>
      <span className="md:mr-3">
        {new Date(blog.create_at).toLocaleDateString("ar-EG", {
          year: "numeric",
          month: "long",
          day: "numeric"
        })}
      </span>
    </li>
  </ul>
                    </div>
                    <div className="entry-details">
                      <h3>
                        <button
                          onClick={() => router.push(`/blog/${blog.id}`)}
                          className="hover:text-[#dec06a] transition-colors"
                        >
                          {blog.title2 || blog.title}
                        </button>
                      </h3>
                      <p style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {blog.content || "لا يوجد وصف متاح."}
                      </p>
                      <a
                        href={`/blog/${blog.id}`}
                        className="read-more"
                      >
                        اقرأ المزيد
                      </a>
                    </div>
                  </div>
                ))
              ) : searchQuery ? (
                <p className="text-right text-gray-500 mt-4">لا توجد نتائج مطابقة لبحثك.</p>
              ) : (
                <p className="text-right text-gray-500">لا توجد مقالات متاحة حالياً.</p>
              )}
            </div>
          </div>

          {/* الشريط الجانبي */}
          <BlogSidebar blLeft={blLeft} onSearch={handleSearch} />
        </div>
      </div>

      {/* فيديو مودال */}
      {selectedVideoId && (
        <VideoModal videoId={selectedVideoId} onClose={closeVideoModal} />
      )}
    </section>
  );
};

export default BlogList;
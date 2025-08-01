"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchBlogs } from "@/store/slices/blogs";
import { getImageUrl } from "../../hooks/imageUrl";

// Types


const BlogSidebar = ({ blLeft = "" }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Get blogs from Redux store
  const { items: blogs, loading } = useSelector((state) => state.blogs);

  // Local state for search
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  // Fallback image
  const fallbackImage = "/download.png";

  // Debounced filtering effect
  useEffect(() => {
    const handler = setTimeout(() => {
      if (!blogs) {
        setFilteredBlogs([]);
        return;
      }

      if (searchQuery.trim() === "") {
        setFilteredBlogs([]);
      } else {
        const query = searchQuery.toLowerCase().trim();
        const filtered = blogs.filter((blog) =>
          (blog.title2 || blog.title || "")
            .toLowerCase()
            .includes(query)
        );
        setFilteredBlogs(filtered);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery, blogs]);

  // Determine which blogs to show
  const blogsToShow = searchQuery.trim() ? filteredBlogs : blogs;

  // Navigate to blog detail page
  const goToBlog = (id) => {
    router.push(`/blog/${id}`);
  };

  // Load blogs on mount
  useEffect(() => {
    if (!blogs?.length && !loading) {
      dispatch(fetchBlogs());
    }
  }, [dispatch, blogs, loading]);

  return (
    <div className={`col col-lg-4 col-12 ${blLeft}`} dir="rtl">
      <div className="blog-sidebar space-y-8">
        {/* 🔍 بحث */}
        <div className="widget search-widget bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-bold mb-4 text-right">ابحث هنا</h3>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              name="search"
              className="w-full p-3 border border-gray-300 rounded-lg pr-10 pl-12 text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ابحث في المقالات.."
            />
         
          </div>
        </div>

        {/* 📰 مقالات أو نتائج */}
        <div className="widget recent-post-widget bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-bold mb-4 text-right">
            {searchQuery ? "نتائج البحث" : "مقالات ذات صلة"}
          </h3>

          {loading && !blogs?.length ? (
            <p className="text-sm text-gray-500 text-center">جاري التحميل...</p>
          ) : blogsToShow?.length === 0 ? (
            <p className="text-sm text-gray-500 text-center">
              {searchQuery ? "لا توجد نتائج" : "لا توجد مقالات متاحة"}
            </p>
          ) : (
            <div className="posts space-y-4">
              {blogsToShow?.slice(0, 3).map((blog) => (
                <div className="post flex gap-3" key={blog.id}>
                  <div className="img-holder flex-shrink-0">
                    <img
                      src={getImageUrl(blog.image) || fallbackImage}
                      alt={blog.title2 || blog.title || "مدونة"}
                      onError={(e) => {
                        (e.target).src = fallbackImage;
                      }}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </div>
                  <div className="details">
                    <h4 className="font-medium mb-1 text-right">
                      <button
                        onClick={() => goToBlog(blog.id)}
                        className="hover:text-[#dec06a] transition-colors text-sm"
                      >
                        {blog.title2 || blog.title}
                      </button>
                    </h4>
                    <span className="date text-sm text-gray-500 text-right block">
                      {new Date(blog.create_at).toLocaleDateString("ar-EG")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;
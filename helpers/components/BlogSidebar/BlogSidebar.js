"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import blogs from '../../api/blogs';
import Link from 'next/link';

const BlogSidebar = (props) => {
  const router = useRouter();
  const imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPPnn7ieaDAQbvg_f37_pB_ILw8quxYBTXKw&s";

  const handleNavigation = (slug) => {
    router.push(`/blog-single/${slug}`);
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
    const searchQuery = e.target.search.value;
    if (searchQuery) {
      router.push(`/blog-search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className={`col col-lg-4 col-12 ${props.blLeft}`}>
      <div className="blog-sidebar space-y-8">
        <div className="widget about-widget bg-white p-6 rounded-lg shadow-sm">
          <div className="img-holder mb-4">
            <img 
              src={imageUrl} 
              alt="صورة الكاتب"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
          <h4 className="text-xl font-bold mb-2">ليندا جونز</h4>
          <p className="text-gray-600 mb-4">
            مرحبًا! أنا كاتبة هذه المدونة. اقرأ مقالاتنا وابقَ معنا.
          </p>
          <div className="social">
            <ul className="flex gap-3">
              {['facebook', 'twitter-alt', 'linkedin', 'pinterest'].map((icon, idx) => (
                <li key={idx}>
                  <Link 
                    href="#" 
                    className="text-gray-500 hover:text-primary text-lg"
                    aria-label={icon}
                  >
                    <i className={`ti-${icon}`}></i>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="widget search-widget bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-bold mb-4">ابحث هنا</h3>
          <form onSubmit={SubmitHandler}>
            <div className="relative">
              <input
                type="text"
                name="search"
                className="w-full p-3 border border-gray-300 rounded-lg pr-12 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="ابحث في المقالات.."
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
              >
                <i className="ti-search"></i>
              </button>
            </div>
          </form>
        </div>

        <div className="widget category-widget bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-bold mb-4">تصنيفات المقالات</h3>
          <ul className="space-y-2">
            {['الأعصاب', 'المسالك', 'الحقائب', 'الإيدز', 'الجهاز الهضمي', 'الجلدية', 'الأنف والأذن'].map((cat, idx) => (
              <li key={idx}>
                <button
                  onClick={() => handleNavigation(`category-${idx}`)}
                  className="w-full text-right flex justify-between items-center py-2 px-3 hover:bg-gray-50 rounded-lg transition"
                >
                  <span>{cat}</span>
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                    {idx + 2}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="widget recent-post-widget bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-bold mb-4">مقالات ذات صلة</h3>
          <div className="posts space-y-4">
            {blogs.slice(0, 3).map((blog) => (
              <div className="post flex gap-3" key={blog.slug}>
                <div className="img-holder flex-shrink-0">
                  <img
                    src={blog.image || imageUrl}
                    alt={blog.title2}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </div>
                <div className="details">
                  <h4 className="font-medium mb-1">
                    <button
                      onClick={() => handleNavigation(blog.slug)}
                      className="text-left hover:text-primary transition"
                    >
                      {blog.title2}
                    </button>
                  </h4>
                  <span className="date text-sm text-gray-500">{blog.create_at}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="widget tag-widget bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-bold mb-4">الوسوم</h3>
          <ul className="flex flex-wrap gap-2">
            {['الصحة', 'الجمال', 'القلب', 'الطبيب', 'المستشفى', 'العناية العصبية', 'الأسنان', 'الجلدية', 'طب الأطفال'].map((tag, idx) => (
              <li key={idx}>
                <button
                  onClick={() => handleNavigation(`tag-${tag}`)}
                  className="text-sm px-3 py-1 bg-gray-100 hover:bg-primary hover:text-white rounded-full transition"
                >
                  {tag}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;
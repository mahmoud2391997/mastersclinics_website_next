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
console.log(blogs);

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
                      <ul>
                        <li>
                          <i className="fi flaticon-user"></i> بواسطة: {blog.author}
                        </li>
                        <li>
                          <i className="fi flaticon-calendar"></i>{" "}
                          {new Date(blog.create_at).toLocaleDateString("ar-EG", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </li>
                      </ul>
                    </div>
                    <div className="entry-details">
                      <h3>
                        <button
                          onClick={() => router.push(`/blog/${blog.id}`)}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {blog.title2 || blog.title}
                        </button>
                      </h3>
                      <p>{blog.content || "لا يوجد وصف متاح."}</p>
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
// [
//     {
//         "id": 2,
//         "slug": "asdasdasd",
//         "title2": "asdasdasd",
//         "author": "asdasd",
//         "blogSingleImg": null,
//         "image": "/uploads/1752600588770-portfolio.webp",
//         "comment": 0,
//         "create_at": "2025-07-15T17:29:48.000Z",
//         "content": "asddasdasd",
//         "created_at": "2025-07-15T17:29:48.000Z",
//         "updated_at": "2025-07-15T17:29:48.000Z"
//     },
//     {
//         "id": 1,
//         "slug": "asdas",
//         "title2": "asdasd",
//         "author": "asdasd",
//         "blogSingleImg": null,
//         "image": "/uploads/1752528650179-c6919f22594368f1bee63a8d2f1df72fab1cf724.jpg",
//         "comment": 0,
//         "create_at": "2025-07-13T17:57:36.000Z",
//         "content": "عدد جلسات الديرما للحصول على نتائج: كم جلسة تكفي؟\r\n\r\n\r\nمن أكثر الأسئلة تكرارًا في مجال العناية بالبشرة:\r\n\r\n\"كم جلسة ديرما أحتاج؟ وهل جلسة واحدة تكفي؟\"\r\n\r\nفي هذا المقال، نجيب عن هذا التساؤل بالتفصيل بناء على نوع البشرة، والمشكلة المستهدفة، وخبرة فريقنا في عيادات ماسترز.\r\n\r\nالعوامل التي تحدد عدد جلسات الديرما\r\nليس هناك رقم واحد يناسب الجميع. يعتمد تحديد عدد الجلسات على عدة عوامل:\r\n\r\nطبيعة المشكلة الجلدية: ندبات؟ تصبغات؟ أو فقط نضارة؟\r\n\r\nدرجة العمق المطلوبة: هل نحتاج تحفيزًا سطحيًا أم إصلاحًا عميقا؟\r\n\r\nاستجابة البشرة للعلاج: تختلف من شخص لآخر.\r\n\r\nالهدف النهائي: هل هو تحسين فوري أم خطة علاج شاملة؟\r\n\r\n\r\nالجدول العملي: كم جلسة ديرما تحتاج كل حالة؟\r\nنوع الحالة\r\n\r\nعدد الجلسات النموذجي\r\n\r\nملاحظات إضافية\r\n\r\nنضارة وتجديد سطح البشرة\r\n\r\nمن 1 إلى 3 جلسات\r\n\r\nتُنفذ غالبًا بفواصل 4 أسابيع\r\n\r\nآثار حب الشباب\r\n\r\nمن 4 إلى 6 جلسات\r\n\r\nتختلف حسب عمق الندبات\r\n\r\nالتصبغات والبقع\r\n\r\n3 إلى 5 جلسات\r\n\r\nيُفضل دمجها مع سيروم تفتيح\r\n\r\nالخطوط الدقيقة\r\n\r\n3 إلى 6 جلسات\r\n\r\nيظهر التحسن تدريجيًا\r\n\r\nتوسيع المسامات\r\n\r\n2 إلى 4 جلسات\r\n\r\nيعتمد على مستوى اتساع المسام\r\n\r\nعلاج ما بعد الحمل أو التقشير الكيميائي\r\n\r\nمن 2 إلى 3 جلسات\r\n\r\nلإعادة توازن البشرة\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nهل جلسة واحدة كافية؟\r\nبصراحة: نادراً ما تكفي جلسة واحدة لتحقيق نتيجة واضحة ومستمرة.\r\n\r\nالتحسن الأولي بعد الجلسة الأولى يكون غالبًا سطحيًا ومؤقتًا.\r\n\r\nلكن عند تكرار الجلسات ضمن بروتوكول علاجي واضح، تكون النتائج أعمق وأكثر استمرارية.\r\n\r\n\r\n\r\nماذا يحدث إذا أوقفت الجلسات قبل اكتمالها؟\r\nالنتائج قد تكون غير مكتملة.\r\n\r\nبعض المشاكل مثل ندبات حب الشباب أو التصبغات تحتاج تراكمًا في العلاج.\r\n\r\nإيقاف الجلسات فجأة قد يُفقد البشرة جزءًا من التحسن المتوقع.\r\n\r\nلذلك في عيادات ماسترز قسم الجلدية والتجميل نوضح من البداية خطة الجلسات والنتائج المرجوة.\r\n\r\n\r\n\r\nهل عدد الجلسات يختلف حسب العمر؟\r\nنعم. فالبشرة في سن العشرينات تختلف عن الأربعينات من حيث سرعة التجدد واستجابة الكولاجين.\r\n\r\nالفئة العمرية\r\n\r\nعدد الجلسات المقترح\r\n\r\nأقل من 25 عاما\r\n\r\n1 – 3 جلسات\r\n\r\nمن 25 – 35 عاما\r\n\r\n3 – 5 جلسات\r\n\r\nمن 35 – 45 عاما\r\n\r\n4 – 6 جلسات\r\n\r\nأكبر من 45 عاما\r\n\r\n5 – 7 جلسات (وقد تُكرر سنويًا)\r\n\r\n\r\n\r\nلمعرفة افضل اجهزة ديرما للبشرة الدهنية\r\n\r\n\r\n\r\nكيف يتم تحديد عدد الجلسات في عيادات ماسترز؟\r\nنحن لا نتبع قاعدة \"عدد ثابت لكل شخص\"، بل نقيم:\r\n\r\nحالة البشرة عبر الفحص المباشر.\r\n\r\nالتاريخ المرضي للمراجع.\r\n\r\nاستجابته السابقة لأي علاج تجميلي.\r\n\r\nرغباته من حيث السرعة والنتيجة.\r\n\r\nبعد ذلك، يوضع جدول جلسات مخصص، مع متابعة دقيقة بعد كل جلسة.\r\n\r\n\r\n\r\nنصائح لضمان نتائج واضحة خلال عدد الجلسات الموصى به\r\nالانتظام: لا تؤجلي الجلسات أكثر من 6 أسابيع.\r\n\r\nالعناية المنزلية: استخدام سيروم وفيتامينات داعمة.\r\n\r\nتجنب العوامل المعرقلة: مثل الشمس، المكياج الثقيل، أو التقشير غير الطبي.\r\n\r\nهل من الممكن تقليل عدد الجلسات؟\r\nنعم، ولكن بشروط:\r\n\r\nاختيار التقنية الأنسب لحالتك.\r\n\r\nدمج الديرما مع علاجات مكمّلة (مثل الميزوثيرابي).\r\n\r\nالتزام عالي بالعناية المنزلية بين الجلسات.\r\n\r\nعدد جلسات الديرما ليس رقما عشوائيا. بل هو خطة علاج متكاملة تصمم بعناية لضمان أفضل نتيجة في أقل وقت.\r\n\r\nفي عيادات ماسترز، نضمن لك نتائج مرئية وملموسة، دون مبالغة أو وعود غير واقعية.\r\n\r\nلمعرفة المزيد عن جلسات الديرما والعناية بالبشرة\r\n📍 اكتشفي خطة الجلسات المناسبة لبشرتك الآن.\r\n\r\nاحجز استشارة مجانية مع أخصائية الجلدية والتجميل في أقرب فرع من عيادات ماسترز.\r\n\r\n",
//         "created_at": "2025-07-13T17:57:36.000Z",
//         "updated_at": "2025-07-19T15:32:45.000Z"
//     }
// ] 

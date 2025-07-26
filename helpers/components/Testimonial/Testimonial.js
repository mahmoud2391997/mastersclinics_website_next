"use client"

import { useEffect } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import SectionTitle from "../SectionTitle/SectionTitle"
import { useDispatch, useSelector } from "react-redux"
import { fetchReviews } from "@/store/slices/reviews"
import getImageUrl from "@/utilies/getImageUrl"

const TestimonialArabic = (props) => {
  const dispatch = useDispatch()
  const testimonials = useSelector((state) => state.reviews.items)
  const loading = useSelector((state) => state.reviews.loading)
  const error = useSelector((state) => state.reviews.error)

  useEffect(() => {
    dispatch(fetchReviews())
  }, [dispatch])

  const settings = {
    dots: false,
    autoplay: true,
    infinite: true,
    arrows: false,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 1,
    rtl: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          dots: true,
          rtl: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          dots: true,
          rtl: true,
        },
      },
    ],
  }

  if (loading) return <p className="text-center mt-10">جارٍ تحميل التقييمات...</p>
  if (error) return <p className="text-center text-red-500 mt-10">حدث خطأ: {error}</p>
  if (!testimonials || testimonials.length === 0)
    return <p className="text-center mt-10">لا توجد تقييمات متاحة حاليًا.</p>

  return (
    <section dir="rtl" className={`${props.tClass || ""} w-full overflow-hidden`}>
      <div className="container-fluid px-3 md:px-4 lg:px-6">
        <div className="row justify-content-right">
          <div className="col-12">
            <SectionTitle title="آراء المرضى" subtitle="ماذا يقول مرضانا عنا" />
          </div>
        </div>
        <div className="row">
          <div className="col-12 px-0">
            <div className="testimonial_slider w-full">
              <Slider {...settings}>
                {testimonials.map((testitem, idx) => (
                  <div className="px-2" key={testitem.id || idx}>
                    <div className="testimonial_card mx-2">
                      <div className="icon flex justify-center items-center">
                        <svg
                          style={{ color: "white", fill: "white", stroke: "white" }}
                          className="w-14 h-14 drop-shadow-sm"
                          viewBox="0 0 24 24"
                        >
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"></path>
                        </svg>
                      </div>

                      {/* Star Rating - Updated to use API rating */}
                      <div className="flex justify-center my-3">
                        {[1, 2, 3, 4, 5].map((star) => ( 
                          <svg
                            key={star}
                            className={`w-5 h-5 mx-0.5 ${star <= testitem.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 !important"}`}
                            viewBox="0 0 20 20"
                            fill={star <= testitem.rating ? "currentColor" : "none"}
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            />
                          </svg>
                        ))}
                      </div>

                      <p className="text-gray-600 text-center px-4 mb-4 line-clamp-3">
                        {testitem.des}
                      </p>

                      <div className="ath flex items-center justify-center gap-3">
                        <div className="image w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow">
                          <img
                            className="w-full h-full object-cover"
                            src={getImageUrl(testitem.img) || "/placeholder.svg"}
                            alt={testitem.title}
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg"
                            }}
                          />
                        </div>
                        <div className="text text-right">
                          <h3 className="font-bold text-gray-800">{testitem.title}</h3>
                          <span className="text-sm text-gray-500">{testitem.sub}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialArabic
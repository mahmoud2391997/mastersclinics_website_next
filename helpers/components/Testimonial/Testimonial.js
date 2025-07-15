"use client";

import React, { useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SectionTitle from '../SectionTitle/SectionTitle';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews } from '@/store/slices/reviews';
import getImageUrl from '@/utilies/getImageUrl';

const TestimonialArabic = (props) => {
    const dispatch = useDispatch();
    const testimonials = useSelector((state) => state.reviews.items);
    const loading = useSelector((state) => state.reviews.loading);
    const error = useSelector((state) => state.reviews.error);

    useEffect(() => {
        dispatch(fetchReviews());
    }, [dispatch]);
console.log(testimonials);

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
                }
            },
        ]
    };

    if (loading) return <p className="text-center mt-10">جارٍ تحميل التقييمات...</p>;
    if (error) return <p className="text-center text-red-500 mt-10">حدث خطأ: {error}</p>;
    if (!testimonials || testimonials.length === 0) return <p className="text-center mt-10">لا توجد تقييمات متاحة حاليًا.</p>;

    return (
        <section dir="rtl" className={props.tClass || ""}>
            <div className="container">
                <div className="row justify-content-right">
                    <div className="col-12">
                        <SectionTitle 
                            title='آراء المرضى' 
                            subtitle="ماذا يقول مرضانا عنا" 
                        />
                    </div>
                </div>
                <div className="row testimonial_slider">
                    <Slider {...settings}>
                        {testimonials.map((testitem, idx) => (
                            <div className="testimonial_card" key={testitem.id || idx}>
                                <div className="icon">
                                    <i className="flaticon-quote"></i>
                                </div>
                                <ul>
                                    <li><i className="flaticon-star"></i></li>
                                    <li><i className="flaticon-star"></i></li>
                                    <li><i className="flaticon-star"></i></li>
                                    <li><i className="flaticon-star"></i></li>
                                    <li><i className="flaticon-star"></i></li>
                                </ul>
                                <p>{testitem.des}</p>
                                <div className="ath">
                                    <div className="image">
                                        <img src={getImageUrl(testitem.img)} alt={testitem.title} />
                                    </div>
                                    <div className="text">
                                        <h3>{testitem.title}</h3>
                                        <span>{testitem.sub}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default TestimonialArabic;

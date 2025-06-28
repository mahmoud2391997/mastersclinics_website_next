import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Img1 from '../../images/testimonial/1.jpg'
import Img2 from '../../images/testimonial/2.jpg'
import Img3 from '../../images/testimonial/3.jpg'
import SectionTitle from '../SectionTitle/SectionTitle';

const testimonials = [
    {
        id: '01',
        img: Img1,
        Des: "نحن سعداء جدًا بالخدمات المقدمة من العيادة. الفريق الطبي كان محترفًا جدًا والنتائج كانت ممتازة. أشعر بتحسن كبير بعد العلاج وأوصي الجميع بهذه العيادة.",
        title: 'كريستين واتسون',
        sub: "مريضة سابقة",
    },
    {
        id: '02',
        img: Img2,
        Des: "تجربتي مع العيادة كانت رائعة من البداية إلى النهاية. الأطباء كانوا متعاونين جدًا وشرحوا لي كل التفاصيل. الخدمة ممتازة والنظافة على أعلى مستوى.",
        title: 'أرماني فيشر',
        sub: "مريض سابق",
    },
    {
        id: '03',
        img: Img3,
        Des: "أشكر الفريق الطبي على الرعاية الممتازة التي تلقيتها. العيادة مجهزة بأحدث الأجهزة والمواعيد كانت دقيقة جدًا. أنصح الجميع بهذه العيادة لعلاجهم.",
        title: 'ربيكا كونلي',
        sub: "مريضة سابقة",
    },
]

const TestimonialArabic = (props) => {
    const settings = {
        dots: false,
        autoplay: true,
        infinite: true,
        arrows: false,
        speed: 300,
        slidesToShow: 2,
        slidesToScroll: 1,
        rtl: true, // Add RTL support for the slider
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

    return (
        <section dir="rtl" className={"" + props.tClass}>
            <div className="container">
                <div className="row justify-content-right"> {/* Changed to right */}
                    <div className="col-12">
                        <SectionTitle 
                            title='آراء المرضى' 
                            subtitle="ماذا يقول مرضانا عنا" 
                        />
                    </div>
                </div>
                <div className="row testimonial_slider">
                    <Slider {...settings}>
                        {testimonials.map((testitem, titem) => (
                            <div className="testimonial_card" key={titem}>
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
                                <p>{testitem.Des}</p>
                                <div className="ath">
                                    <div className="image">
                                        <img src={testitem.img} alt={testitem.title} />
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
}

export default TestimonialArabic;
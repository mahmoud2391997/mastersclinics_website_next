import React from 'react';
import CountUp from 'react-countup';

// image
import Ab1 from '../../images/about.jpg';
import Abd1 from '../../images/doctors/1.jpg';
import Abd2 from '../../images/doctors/2.jpg';
import Abd3 from '../../images/doctors/3.jpg';
import Abd4 from '../../images/doctors/4.jpg';
import sine from '../../images/signeture.png';

const AboutArabic = (props) => {
    return (
        <section dir="rtl" className={"" + props.hclass}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-12 order-lg-2">
                        <div className="about_left">
                            <div className="image">
                                <img src={Ab1} alt="صورة عن العيادة" />
                                <span className="round-on"></span>
                                <span className="round-two"></span>
                                <div className="award">
                                    <div className="icon">
                                        <i className="flaticon-cup"></i>
                                    </div>
                                    <div className="text">
                                        <h2><CountUp end={25} enableScrollSpy />+</h2>
                                        <p>سنوات من الخبرة</p>
                                    </div>
                                </div>
                                <div className="doctors">
                                    <ul>
                                        <li><img src={Abd1} alt="طبيب" /></li>
                                        <li><img src={Abd2} alt="طبيب" /></li>
                                        <li><img src={Abd3} alt="طبيب" /></li>
                                        <li><img src={Abd4} alt="طبيب" /></li>
                                        <li><span>95+</span></li>
                                    </ul>
                                    <h4>أطباء متاحون</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-12 order-lg-1">
                        <div className="content">
                            <h2>عن ميديكالي</h2>
                            <h3>مهمتنا هي ابتسامتك وسعادتك</h3>
                            <p>
                                تشمل سياسة الصحة والمستشفيات لدينا الاستراتيجيات والإرشادات والممارسات التي تستخدمها الشركات 
                                التكنولوجية لتحقيق أهدافها. قد تختلف السياسات حسب حجم الشركة وموقعها في السوق والمنافسة. 
                                نقدم رعاية شاملة ومتكاملة لضمان أفضل النتائج الصحية.
                            </p>
                            <p>
                                نؤمن بأن الابتسامة الصحية تبدأ من الرعاية الشاملة. نهتم بكل التفاصيل لضمان راحة 
                                المرضى ورضاهم التام عن الخدمات المقدمة.
                            </p>
                            <div className="ceo">
                                <div>
                                    <h4>سافانا نغوين</h4>
                                    <span>المدير التنفيذي ومؤسس ميديكالي</span>
                                </div>
                                <div>
                                    <img src={sine} alt="توقيع المدير التنفيذي" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutArabic;
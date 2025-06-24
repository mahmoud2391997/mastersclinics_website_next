import React from 'react';
import CountUp from 'react-countup';


// image
import Ab1 from '../../images/about.jpg'
import Abd1 from '../../images/doctors/1.jpg'
import Abd2 from '../../images/doctors/2.jpg'
import Abd3 from '../../images/doctors/3.jpg'
import Abd4 from '../../images/doctors/4.jpg'
import sine from '../../images/signeture.png'

const about = (props) => {
    return (
        <section className={"" + props.hclass} dir="rtl">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-12">
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
                                            <p>سنة من الخبرة</p>
                                        </div>
                                    </div>
                                    <div className="doctors">
                                        <ul>
                                        <li><img src={Abd1} alt="دكتور 1" /></li>
                                        <li><img src={Abd2} alt="دكتور 2" /></li>
                                        <li><img src={Abd3} alt="دكتور 3" /></li>
                                        <li><img src={Abd4} alt="دكتور 4" /></li>
                                            <li><span>٩٥+</span></li>
                                        </ul>
                                        <h4>الأطباء المتاحون</h4>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-12">
                        <div className="content">
                            <h2>حول العيادات المتخصصة</h2>
                            <h3>ابتسامتك وسعادتك هي مهمتنا الأولى</h3>
                            <p>تشمل سياستنا الصحية والطبية جميع الاستراتيجيات والمبادئ التوجيهية والممارسات التي
                                نستخدمها لتحقيق أهدافنا في تقديم أفضل رعاية صحية. تختلف خدماتنا الطبية
                                حسب احتياجات المرضى وحالتهم الصحية والتخصص المطلوب. نحن ملتزمون
                                بتقديم رعاية صحية شاملة ومتميزة لجميع مرضانا.</p>
                            <p>نحن نقدم خدمات طبية عالية الجودة مع فريق من الأطباء والاستشاريين المتخصصين. 
                                هدفنا هو ضمان حصولك على أفضل علاج طبي في بيئة آمنة ومريحة تلبي جميع احتياجاتك الصحية.</p>
                            <div className="ceo">
                                <div>
                                    <h4>د. أحمد محمود</h4>
                                    <span>المدير التنفيذي ومؤسس العيادات المتخصصة</span>
                                </div>
                                <div>
                                    <img src={sine} alt="توقيع المدير" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default about;
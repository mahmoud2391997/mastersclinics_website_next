import React from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';



const ProcessSection = (props) => {
    return (
        <section className={"" + props.hclass} dir='ltr'>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-9 col-12">
                        <SectionTitle title={'عملية عملنا'} subtitle={'كيف نعمل'}/>
                    </div>
                </div>
                <div className="work_wrapper">
                    <div className="row flex-row-reverse">
                        <div className="col-xl-3 col-lg-6 col-md-6 col-12">
                            <div className="work_card">
                                <div className="image">
                                    <img src={"https://medically-react.wpolive.com/static/media/1.33db3b316579275982d9.jpg"} alt="" />
                                        <span className="number">01</span>
                                </div>
                                <div className="text">
                                    <h3>حجز موعد</h3>
                                    <p>نقدم خدمة حجز المواعيد بسهولة ويسر لضمان راحتكم وتلبية احتياجاتكم في الوقت المناسب.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 col-12">
                            <div className="work_card">
                                <div className="image">
                                    <img src={"https://medically-react.wpolive.com/static/media/2.69cfcc022c975f631617.jpg"} alt="" />
                                        <span className="number">02</span>
                                </div>
                                <div className="text">
                                    <h3>استشارة الخبير</h3>
                                    <p>تحصلون على استشارة من خبرائنا المتخصصين الذين يقدمون الحلول المناسبة لاحتياجاتكم.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 col-12">
                            <div className="work_card">
                                <div className="image">
                                    <img src={"https://medically-react.wpolive.com/static/media/3.0c358dde127930278c09.jpg"} alt="" />
                                        <span className="number">03</span>
                                </div>
                                <div className="text">
                                    <h3>تلقي العلاج</h3>
                                    <p>نقدم لكم أفضل العلاجات والرعاية بأعلى معايير الجودة والكفاءة.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 col-12">
                            <div className="work_card">
                                <div className="image">
                                    <img src={"https://medically-react.wpolive.com/static/media/4.896e31350be9a380e08b.jpg"} alt="" />
                                        <span className="number">04</span>
                                </div>
                                <div className="text">
                                    <h3>الحصول على الراحة</h3>
                                    <p>الوصول إلى مرحلة الشفاء والراحة بعد تلقي العلاج والرعاية المثالية.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="shape">
                        <img src={"https://medically-react.wpolive.com/static/media/shape.5edd8922c81953a3c45652d466928c51.svg"} alt="" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
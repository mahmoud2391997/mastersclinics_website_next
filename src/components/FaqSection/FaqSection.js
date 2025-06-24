import React, { useState } from 'react';

const FaqSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const faqs = [
        {
            id: 1,
            question: 'كيف يمكنني حجز موعد؟',
            answer: 'يمكنك حجز موعد من خلال موقعنا الإلكتروني أو الاتصال بنا على الرقم المجاني. كما يمكنك زيارة العيادة مباشرة لحجز موعد.'
        },
        {
            id: 2,
            question: 'ما هي ساعات العمل؟',

            answer: 'نعمل من السبت إلى الخميس من الساعة ٨:٠٠ صباحاً حتى ٢٠:٠٠ مساءً، ويوم الجمعة من الساعة ٢:٠٠ ظهراً حتى ١٠:٠٠ مساءً.'
        },
        {
            id: 3,


            question: 'هل تقبلون التأمين الطبي؟',
            answer: 'نعم، نتعامل مع جميع شركات التأمين الطبي المعتمدة في المملكة. يرجى إحضار بطاقة التأمين الخاصة بك عند الزيارة.'
        },
        {
            id: 4,


            question: 'هل يمكنني إلغاء أو تعديل موعدي؟',
            answer: 'نعم، يمكنك إلغاء أو تعديل موعدك قبل ٢٤ ساعة على الأقل من الموعد المحدد عن طريق الاتصال بنا أو من خلال الموقع الإلكتروني.'
        },
        {
            id: 5,
            question: 'ما هي الوثائق المطلوبة للزيارة الأولى؟',
            answer: 'يرجى إحضار بطاقة الهوية الوطنية، بطاقة التأمين الطبي (إن وجدت)، والتقارير الطبية السابقة ذات الصلة بحالتك.'
        },
        {
            id: 6,
            question: 'هل تقدمون خدمات الطوارئ؟',
            answer: 'نعم، نقدم خدمات الطوارئ على مدار ٢٤ ساعة. في حالات الطوارئ، يرجى الاتصال على الرقم ٩٩٧ أو زيارة قسم الطوارئ مباشرة.'
        },
        {
            id: 7,
            question: 'كم تستغرق مدة الانتظار؟',
            answer: 'نحرص على احترام مواعيد المرضى. متوسط وقت الانتظار هو ١٥-٢٠ دقيقة، وقد يزيد في حالات الطوارئ أو الحالات المعقدة.'
        },
        {
            id: 8,
            question: 'هل يمكنني الحصول على تقرير طبي؟',
            answer: 'نعم، يمكنك طلب تقرير طبي من الطبيب المعالج أو من قسم السجلات الطبية. قد تحتاج إلى دفع رسوم رمزية للحصول على نسخة مطبوعة.'
        }
    ];




    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? -1 : index);
    };

    return (

        <section className="faq-section section-padding" dir="rtl">
            <div className="container">




                <div className="row">
                    <div className="col-lg-6 col-12">
                        <div className="faq-content">
                            <div className="section-title">
                                <span className="subtitle">الأسئلة الشائعة</span>
                                <h2>الأسئلة الأكثر شيوعاً</h2>
                                <p>إليك إجابات على أكثر الأسئلة شيوعاً التي يطرحها مرضانا. إذا لم تجد إجابة لسؤالك، لا تتردد في التواصل معنا.</p>
                            </div>
                            <div className="faq-contact">
                                <div className="contact-item">
                                    <div className="icon">
                                        <i className="fas fa-phone"></i>
                                    </div>
                                    <div className="content">
                                        <h4>اتصل بنا</h4>
                                        <p>+٩٦٦ ١١ ١٢٣ ٤٥٦٧</p>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <div className="icon">
                                        <i className="fas fa-envelope"></i>
                                    </div>
                                    <div className="content">
                                        <h4>راسلنا</h4>
                                        <p>info@mastersclinics.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>






















                    <div className="col-lg-6 col-12">
                        <div className="faq-accordion">
                            {faqs.map((faq, index) => (
                                <div key={faq.id} className={`accordion-item ${activeIndex === index ? 'active' : ''}`}>
                                    <div 
                                        className="accordion-header"
                                        onClick={() => toggleAccordion(index)}
                                    >
                                        <h4>{faq.question}</h4>
                                        <span className="accordion-icon">
                                            <i className={`fas ${activeIndex === index ? 'fa-minus' : 'fa-plus'}`}></i>
                                        </span>
                                    </div>
                                    <div className={`accordion-content ${activeIndex === index ? 'show' : ''}`}>
                                        <p>{faq.answer}</p>
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FaqSection;

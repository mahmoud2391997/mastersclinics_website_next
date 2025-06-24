import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
    const services = [
        {
            id: 1,
            icon: 'fas fa-heartbeat',
            title: 'أمراض القلب',
            description: 'تشخيص وعلاج جميع أمراض القلب والأوعية الدموية مع أحدث التقنيات الطبية.',
            link: '/cardiology'
        },
        {
            id: 2,
            icon: 'fas fa-bone',
            title: 'جراحة العظام',
            description: 'علاج إصابات وأمراض العظام والمفاصل مع فريق من الجراحين المتخصصين.',
            link: '/orthopedics'
        },
        {
            id: 3,
            icon: 'fas fa-brain',
            title: 'طب الأعصاب',
            description: 'تشخيص وعلاج أمراض الجهاز العصبي والدماغ مع أحدث أجهزة التشخيص.',
            link: '/neurology'
        },
        {
            id: 4,
            icon: 'fas fa-baby',
            title: 'طب الأطفال',
            description: 'رعاية صحية شاملة للأطفال من الولادة حتى سن المراهقة مع أطباء متخصصين.',
            link: '/pediatrics'
        },
        {
            id: 5,
            icon: 'fas fa-female',
            title: 'النساء والولادة',
            description: 'خدمات طبية متكاملة للنساء مع رعاية خاصة أثناء الحمل والولادة.',
            link: '/gynecology'
        },
        {
            id: 6,
            icon: 'fas fa-eye',
            title: 'طب العيون',
            description: 'تشخيص وعلاج جميع أمراض العيون مع أحدث تقنيات جراحة العيون.',
            link: '/ophthalmology'
        }
    ];

    return (
        <section className="services-section section-padding" dir="rtl">
            <div className="container">
                <div className="section-title text-center">
                    <span className="subtitle">خدماتنا الطبية</span>
                    <h2>نقدم أفضل الخدمات الطبية المتخصصة</h2>
                    <p>فريق من الأطباء المتخصصين يقدم لك أفضل رعاية صحية بأحدث التقنيات الطبية</p>
                </div>
                <div className="row">
                    {services.map(service => (
                        <div key={service.id} className="col-lg-4 col-md-6 col-12">
                            <div className="service-item">
                                <div className="service-icon">
                                    <i className={service.icon}></i>
                                </div>
                                <div className="service-content">
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                    <Link to={service.link} className="read-more">
                                        اقرأ المزيد <i className="fas fa-arrow-left"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-5">
                    <Link to="/services" className="btn btn-primary">عرض جميع الخدمات</Link>
                </div>
            </div>
        </section>
    );
};

export default Services;
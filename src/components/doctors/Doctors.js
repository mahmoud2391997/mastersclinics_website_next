import React from 'react';
import { Link } from 'react-router-dom';

const Doctors = () => {
    const doctors = [
        {
            id: 1,
            name: 'د. أحمد محمد',
            specialty: 'استشاري أمراض القلب',
            image: '/images/doctors/doctor1.jpg',
            experience: '٢٠ سنة خبرة',
            education: 'دكتوراه في أمراض القلب - جامعة الملك سعود',
            languages: 'العربية، الإنجليزية',
            social: {
                facebook: '#',
                twitter: '#',
                linkedin: '#'
            }
        },
        {
            id: 2,
            name: 'د. فاطمة العلي',
            specialty: 'استشارية النساء والولادة',
            image: '/images/doctors/doctor2.jpg',
            experience: '١٢ سنة خبرة',
            education: 'دكتوراه في النساء والولادة - جامعة الملك عبدالعزيز',
            languages: 'العربية، الإنجليزية، الفرنسية',
            social: {
                facebook: '#',
                twitter: '#',
                linkedin: '#'
            }
        },
        {
            id: 3,
            name: 'د. محمد الأحمد',
            specialty: 'استشاري جراحة العظام',
            image: '/images/doctors/doctor3.jpg',
            experience: '٢٠ سنة خبرة',
            education: 'دكتوراه في جراحة العظام - جامعة الملك فيصل',
            languages: 'العربية، الإنجليزية',
            social: {
                facebook: '#',
                twitter: '#',
                linkedin: '#'
            }
        },
        {
            id: 4,
            name: 'د. سارة الزهراني',
            specialty: 'استشارية طب الأطفال',
            image: '/images/doctors/doctor4.jpg',
            experience: '١٠ سنوات خبرة',
            education: 'دكتوراه في طب الأطفال - جامعة أم القرى',
            languages: 'العربية، الإنجليزية',
            social: {
                facebook: '#',
                twitter: '#',
                linkedin: '#'
            }
        }
    ];

    return (
        <section className="doctors-section section-padding" dir="rtl">
            <div className="container">
                <div className="section-title text-center">
                    <span className="subtitle">فريقنا الطبي</span>
                    <h2>أطباء متخصصون ومؤهلون</h2>
                    <p>نفتخر بفريق من أفضل الأطباء المتخصصين الذين يقدمون أعلى مستويات الرعاية الصحية</p>
                </div>
                <div className="row">
                    {doctors.map(doctor => (
                        <div key={doctor.id} className="col-lg-3 col-md-6 col-12">
                            <div className="doctor-card">
                                <div className="doctor-image">
                                    <img src={doctor.image} alt={doctor.name} />
                                    <div className="doctor-social">
                                        <a href={doctor.social.facebook} aria-label="فيسبوك">
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                        <a href={doctor.social.twitter} aria-label="تويتر">
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                        <a href={doctor.social.linkedin} aria-label="لينكد إن">
                                            <i className="fab fa-linkedin-in"></i>
                                        </a>
                                    </div>
                                </div>
                                <div className="doctor-info">
                                    <h3>{doctor.name}</h3>
                                    <span className="specialty">{doctor.specialty}</span>
                                    <div className="doctor-details">
                                        <div className="detail-item">
                                            <i className="fas fa-graduation-cap"></i>
                                            <span>{doctor.experience}</span>
                                        </div>
                                        <div className="detail-item">
                                            <i className="fas fa-language"></i>
                                            <span>{doctor.languages}</span>
                                        </div>
                                    </div>
                                    <div className="doctor-actions">
                                        <Link to={`/doctor/${doctor.id}`} className="btn btn-outline">
                                            عرض الملف الشخصي
                                        </Link>
                                        <Link to="/appointment" className="btn btn-primary">
                                            احجز موعد
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-5">
                    <Link to="/doctors" className="btn btn-primary">عرض جميع الأطباء</Link>
                </div>
            </div>
        </section>
    );
};

export default Doctors;
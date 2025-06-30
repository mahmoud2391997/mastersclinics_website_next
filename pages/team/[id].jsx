"use client";

import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { fetchTeamById } from '../../store/slices/doctor';
import Navbar from '../../src/components/Navbar/Navbar';
import PageTitle from '../../src/components/pagetitle/PageTitle';
import Footer from '../../src/components/footer/Footer';
import Scrollbar from '../../src/components/scrollbar/scrollbar';
import ContactForm from '../../src/main-component/ServiceSinglePage/ServiceFrom';
import logo from '../../src/images/logo-2.svg';
import Arrow from '../../src/images/team-single/arrow.svg';

const TeamSinglePage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    const teamsState = useSelector((state) => state.teams || {});
    const { 
        selectedTeam: currentMember = null, 
        loading = false, 
        error = null 
    } = teamsState;

    useEffect(() => {
        if (id) {
            dispatch(fetchTeamById(id));
        }
    }, [dispatch, id]);

    if (loading) return <div className="text-center py-5">جاري تحميل الملف الشخصي للطبيب...</div>;
    if (error) return <div className="text-center py-5 text-danger">خطأ: {error}</div>;
    if (!currentMember) {
        return <div className="text-center py-5">بيانات الطبيب غير متوفرة</div>;
    }

    return (
        <Fragment>
            <Navbar Logo={logo} hclass={'wpo-site-header wpo-site-header-s2'} />
            <PageTitle pageTitle={currentMember.name} pagesub={'صفحة الطبيب'} />
            
            <section className="team_single_page section-padding" dir="rtl">
                <div className="container">
                    <div className="row align-items-end">
                        <div className="col-lg-6 col-12 order-lg-2">
                            <div className="doctor_profile text-right">
                                <img 
                                    src={currentMember.image} 
                                    alt={currentMember.title} 
                                    loading="lazy"
                                    className="rounded-lg"
                                />
                                <div className="content">
                                    <h3 className="text-2xl font-bold">{currentMember.name}</h3>
                                    <span className="text-[#dec06a]">
                                        {currentMember.specialty || 'جراح محترف وطبيب خبير'}
                                    </span>
                                    <ul className="social-links flex justify-end space-x-4 space-x-reverse mt-3">
                                        {currentMember.socialLinks?.map((link, index) => (
                                            <li key={index}>
                                                <a href={link.url} target="_blank" rel="noopener noreferrer">
                                                    <i className={link.iconClass}></i>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-6 col-12 order-lg-1">
                            <div className="doctor_info mb-8">
                                <h2 className="text-xl font-bold mb-4 border-b-2 border-[#dec06a] pb-2">
                                    المعلومات الشخصية
                                </h2>
                                <p className="text-gray-700 leading-relaxed">
                                    {currentMember.bio}
                                </p>
                            </div>
                            
                            <div className="doctor_info s2">
                                <h2 className="text-xl font-bold mb-4 border-b-2 border-[#dec06a] pb-2">
                                    المؤهلات العلمية
                                </h2>
                                <ul className="education-list space-y-3">
                                    {currentMember.education?.map((item, index) => (
                                        <li key={index} className="flex items-start">
                                            <img src={Arrow} alt="" aria-hidden="true" className="ml-2 mt-1" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div className="experience_wrap mt-12">
                        <div className="top_content mb-8">
                            <h2 className="text-xl font-bold mb-4 border-b-2 border-[#dec06a] pb-2">
                                الخبرات العملية
                            </h2>
                            {currentMember.experience?.map((paragraph, index) => (
                                <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                        
                        <div className="achievements">
                            <h2 className="text-xl font-bold mb-4 border-b-2 border-[#dec06a] pb-2">
                                الإنجازات
                            </h2>
                            <ul className="space-y-3">
                                {currentMember.achievements?.map((achievement, index) => (
                                    <li key={index} className="flex">
                                        <span className="font-bold min-w-[80px]">{achievement.year}: </span>
                                        <span>{achievement.description}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div className="AppointmentFrom mt-16 bg-gray-50 py-12">
                    <div className="container">
                        <div className="cta_form_s2">
                            <div className="title s2 text-center mb-8">
                                <h3 className="text-2xl font-bold mb-2">حجز موعد</h3>
                                <p className="text-gray-600">تواصل معنا لمعرفة كيف يمكننا مساعدتك في حل مشاكلك الصحية</p>
                            </div>
                            <ContactForm doctorId={currentMember.id} />
                        </div>
                    </div>
                </div>
            </section>
            
            <Footer hclass={'wpo-site-footer_s2'} />
            <Scrollbar />
        </Fragment>
    );
};

export default TeamSinglePage;
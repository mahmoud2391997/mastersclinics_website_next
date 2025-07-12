"use client";

import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { fetchTeamById } from '../../store/slices/doctor';
import Navbar from '../../helpers/components/Navbar/Navbar';
import PageTitle from '../../helpers/components/pagetitle/PageTitle';
import Footer from '../../helpers/components/footer/Footer';
import Scrollbar from '../../helpers/components/scrollbar/scrollbar';
import ContactForm from '../../helpers/main-component/ServiceSinglePage/ServiceFrom';
import logo from '../../helpers/images/logo-2.svg';
import Arrow from '../../helpers/images/team-single/arrow.svg';

const TeamSinglePage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    const { 
        selectedTeam: currentMember = null, 
        loading = false, 
        error = null 
    } = useSelector((state) => state.teams || {});

    useEffect(() => {
        if (id) {
            dispatch(fetchTeamById(id));
        }
    }, [dispatch, id]);
console.log(currentMember);

    if (loading) return <div className="text-center py-5">جاري تحميل الملف الشخصي للطبيب...</div>;
    if (error) return <div className="text-center py-5 text-danger">خطأ: {error}</div>;
    if (!currentMember) {
        return <div className="text-center py-5">بيانات الطبيب غير متوفرة</div>;
    }

    // Default content for fields not in the Teams data
    const doctorInfo = {
        bio: "طبيب متخصص مع سنوات من الخبرة في تقديم رعاية طبية متميزة للمرضى.",
        education: [
            "دكتوراه في الطب من جامعة القاهرة",
            "بورد التخصص في الجراحة العامة",
            "زمالة في جراحة القلب من جامعة هارفارد"
        ],
        experience: [
            "أكثر من 15 سنة من الخبرة في مجال التخصص",
            "عمل في مستشفيات ومراكز طبية مرموقة",
            "أجرى أكثر من 1000 عملية ناجحة"
        ],
        achievements: [
            { year: "2020", description: "جائزة أفضل طبيب في التخصص" },
            { year: "2018", description: "نشر بحث علمي في مجلة طبية عالمية" },
            { year: "2015", description: "قيادة فريق جراحي ناجح لعمليات معقدة" }
        ],
        socialLinks: [
            { url: "#", iconClass: "fa fa-facebook" },
            { url: "#", iconClass: "fa fa-twitter" },
            { url: "#", iconClass: "fa fa-linkedin" }
        ]
    };

    return (
        <Fragment>
            <Navbar Logo={logo} hclass={'wpo-site-header wpo-site-header-s2'} />
            <PageTitle pageTitle={currentMember.title} pagesub={currentMember.subtitle} />
            
            <section className="team_single_page section-padding" dir="rtl">
                <div className="container">
                    <div className="row align-items-end">
                        <div className="col-lg-6 col-12 order-lg-2">
                            <div className="doctor_profile text-right">
                                <img 
                                    src={currentMember.Sime} 
                                    alt={currentMember.title} 
                                    loading="lazy"
                                    className="rounded-lg w-full max-w-md shadow-lg"
                                />
                                <div className="content mt-6">
                                    <h3 className="text-3xl font-bold text-gray-800">{currentMember.title}</h3>
                                    <span className="text-[#dec06a] text-xl block mt-2">
                                        {currentMember.subtitle}
                                    </span>
                                    <div className="social-links flex justify-end space-x-4 space-x-reverse mt-4">
                                        {doctorInfo.socialLinks.map((link, index) => (
                                            <a 
                                                key={index}
                                                href={link.url}
                                                className="text-gray-600 hover:text-[#dec06a] text-xl"
                                            >
                                                <i className={link.iconClass}></i>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-6 col-12 order-lg-1">
                            <div className="doctor_info mb-8">
                                <h2 className="text-2xl font-bold mb-4 border-b-2 border-[#dec06a] pb-2">
                                    السيرة الذاتية
                                </h2>
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    {doctorInfo.bio}
                                </p>
                            </div>
                            
                            <div className="doctor_info s2">
                                <h2 className="text-2xl font-bold mb-4 border-b-2 border-[#dec06a] pb-2">
                                    المؤهلات العلمية
                                </h2>
                                <ul className="education-list space-y-3">
                                    {doctorInfo.education.map((item, index) => (
                                        <li key={index} className="flex items-start text-lg">
                                            <img src={Arrow} alt="" className="ml-2 mt-1 w-5 h-5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div className="experience_wrap mt-12">
                        <div className="top_content mb-8">
                            <h2 className="text-2xl font-bold mb-4 border-b-2 border-[#dec06a] pb-2">
                                الخبرة العملية
                            </h2>
                            {doctorInfo.experience.map((item, index) => (
                                <p key={index} className="text-gray-700 mb-4 leading-relaxed text-lg">
                                    {item}
                                </p>
                            ))}
                        </div>
                        
                        <div className="achievements">
                            <h2 className="text-2xl font-bold mb-4 border-b-2 border-[#dec06a] pb-2">
                                الإنجازات والجوائز
                            </h2>
                            <ul className="space-y-3">
                                {doctorInfo.achievements.map((achievement, index) => (
                                    <li key={index} className="flex text-lg">
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
                                <h3 className="text-3xl font-bold mb-2">حجز موعد</h3>
                                <p className="text-gray-600 text-xl">
                                    تواصل معنا لحجز موعد مع الدكتور {currentMember.title}
                                </p>
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
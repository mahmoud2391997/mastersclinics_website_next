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
import { getImageUrl } from '../../helpers/hooks/imageUrl';

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

    if (loading) return <div className="text-center py-5">جاري تحميل الملف الشخصي للطبيب...</div>;
    if (error) return <div className="text-center py-5 text-danger">خطأ: {error}</div>;
    if (!currentMember) {
        return <div className="text-center py-5">بيانات الطبيب غير متوفرة</div>;
    }
console.log(currentMember);

    // Parse JSON fields safely
 let education = [];
let skills = [];
let achievements = [];
let workingHours = [];

try {
    education = Array.isArray(currentMember.education)
        ? currentMember.education
        : JSON.parse(currentMember.education || "[]");

    skills = Array.isArray(currentMember.skills)
        ? currentMember.skills
        : JSON.parse(currentMember.skills || "[]");

    achievements = Array.isArray(currentMember.achievements)
        ? currentMember.achievements
        : JSON.parse(currentMember.achievements || "[]");

    workingHours = Array.isArray(currentMember.working_hours)
        ? currentMember.working_hours
        : JSON.parse(currentMember.working_hours || "[]");
} catch (e) {
    console.error("Error parsing JSON fields", e);
}
console.log(currentMember);


    return (
        <Fragment>
            <Navbar Logo={logo} hclass={'wpo-site-header wpo-site-header-s2'} />
            <PageTitle pageTitle={currentMember.title} pagesub={currentMember.position} />
            
            <section className="team_single_page section-padding" dir="rtl">
                <div className="container">
                    <div className="row align-items-end">
                        <div className="col-lg-6 col-12 order-lg-2">
                            <div className="doctor_profile text-right">
                                <img 
                                    src={getImageUrl(currentMember.image)}
                                    alt={currentMember.title}
                                    loading="lazy"
                                    className="rounded-lg w-full max-w-md shadow-lg"
                                />
                                <div className="content mt-6">
                                    <h3 className="text-3xl font-bold text-gray-800">{currentMember.title}</h3>
                                    <span className="text-[#dec06a] text-xl block mt-2">
                                        {currentMember.position}
                                    </span>
                                
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-6 col-12 order-lg-1">
                            <div className="doctor_info mb-8">
                                <h2 className="text-2xl font-bold mb-4 border-b-2 border-[#dec06a] pb-2">
                                    السيرة الذاتية
                                </h2>
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    {currentMember.description}
                                </p>
                            </div>
                            
                            <div className="doctor_info s2">
                                <h2 className="text-2xl font-bold mb-4 border-b-2 border-[#dec06a] pb-2">
                                    المؤهلات العلمية
                                </h2>
                                <ul className="education-list space-y-3">
                                    {education.map((item, index) => (
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
                            <p className="text-gray-700 mb-4 leading-relaxed text-lg">
                                {currentMember.experience}
                            </p>
                        </div>
                        
                        <div className="achievements">
                            <h2 className="text-2xl font-bold mb-4 border-b-2 border-[#dec06a] pb-2">
                                الإنجازات والجوائز
                            </h2>
                            <ul className="space-y-3">
                                {achievements.map((item, index) => (
                                    <li key={index} className="flex text-lg">
                                        <span>{item}</span>
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

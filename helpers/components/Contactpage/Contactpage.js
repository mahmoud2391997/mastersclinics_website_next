"use client";
import React, { useEffect, useState } from 'react';
import ContactForm from '../ContactFrom/ContactForm';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranches } from '../../../store/slices/branches';

const ContactpageArabic = () => {
    const dispatch = useDispatch();
    const { items: branches, loading, error } = useSelector((state) => state.branches);
    const [activeRegion, setActiveRegion] = useState(null);

    useEffect(() => {
        dispatch(fetchBranches());
    }, [dispatch]);

    // Group branches by region
    const branchesByRegion = branches.reduce((acc, branch) => {
        if (!acc[branch.region_name]) acc[branch.region_name] = [];
        acc[branch.region_name].push(branch);
        return acc;
    }, {});

    // Set the first region as active by default when data is loaded
    useEffect(() => {
        if (!loading && !error && Object.keys(branchesByRegion).length > 0 && !activeRegion) {
            setActiveRegion(Object.keys(branchesByRegion)[0]);
        }
    }, [loading, error, branchesByRegion, activeRegion]);

    return (
        <section className="wpo-contact-pg-section section-padding bg-gray-50" dir="rtl">
            <div className="container">
                <div className="row">
                    <div className="col col-lg-10 offset-lg-1 m-auto">
                        {/* Contact Info Cards */}
                        <div className="office-info mb-16">
                            <div className="row g-4">
                                {/* Contact Numbers */}
                                <div className="col col-xl-6 col-lg-6 col-md-6 col-12">
                                    <div className="office-info-item bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col items-center text-center">
                                        <div className="office-info-icon mb-6 w-full flex justify-center items-center">
                                            <div className="icon bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 text-[#d9b755]">
                                                    <path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24c1.12.37 2.33.57 3.57.57c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1c-9.39 0-17-7.61-17-17c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="office-info-text">
                                            <h2 className="text-xl font-bold mb-3 text-gray-800">اتصل بنا</h2>
                                            <p className="text-gray-600 mb-1">الخط الساخن: 8002440181</p>
                                            <p className="text-gray-600 mb-1">الطب الاتصالي: 966551996424</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="col col-xl-6 col-lg-6 col-md-6 col-12">
                                    <div className="office-info-item bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col items-center text-center">
                                        <div className="office-info-icon mb-6 w-full flex justify-center items-center">
                                            <div className="icon bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 text-[#d9b755]">
                                                    <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5l-8-5V6l8 5l8-5v2z"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="office-info-text">
                                            <h2 className="text-xl font-bold mb-3 text-gray-800">البريد الإلكتروني</h2>
                                            <p className="text-gray-600 mb-1">العامة: info@masters.clinic</p>
                                            <p className="text-gray-600 mb-1">للتوظيف: info.hr@masters.clinic</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Branches Section */}
                        <div className="wpo-contact-title text-center mb-6">
                            <h2 className="text-3xl font-bold text-gray-800 mb-3">فروعنا</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">نحن موجودون في عدة مواقع لخدمتكم بشكل أفضل</p>
                        </div>

                        {loading && <p className="text-center text-lg">جاري التحميل...</p>}
                        {error && <p className="text-center text-red-500">حدث خطأ: {error}</p>}
                        
                        {!loading && !error && (
                            <>
                                {/* Region Tabs */}
                                <div className="w-full mb-8">
                                    <div className="flex w-full">
                                        {Object.keys(branchesByRegion).map((region) => (
                                            <button
                                                key={region}
                                                onClick={() => setActiveRegion(region)}
                                                className={`flex-1 py-3 px-2 text-center font-medium text-sm whitespace-nowrap transition-colors ${
                                                    activeRegion === region
                                                        ? 'bg-[#dec06a] text-white'
                                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                                } first:rounded-l-lg last:rounded-r-lg`}
                                            >
                                                {region}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Active Region Content */}
                                {activeRegion && (
                                    <div className="mb-12">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {branchesByRegion[activeRegion].map((branch) => (
                                                <div key={branch.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex">
                                                    <div className="text-[#d9b755] text-2xl mt-1 ml-3">
                                                        <FaMapMarkerAlt />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-bold text-gray-800 mb-2">{branch.name}</h3>
                                                        <p className="text-gray-600 mb-2">{branch.address}</p>
                                                        
                                                        <div className="flex items-start mt-3">
                                                            <FaClock className="text-[#d9b755] mt-1 ml-2 flex-shrink-0" />
                                                            <div>
                                                                <h4 className="font-medium text-gray-700 text-sm">مواعيد العمل:</h4>
                                                                {branch.working_hours ? (
                                                                    <ul className="mt-1 space-y-1">
                                                                        {branch.working_hours.map((hours, idx) => (
                                                                            <li key={idx} className="text-gray-600 text-xs">
                                                                                <span className="font-medium">{hours.days}:</span> {hours.time}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                ) : (
                                                                    <p className="text-gray-500 text-xs">مواعيد العمل غير متاحة</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {/* Contact Form Section */}
                        <div className="wpo-contact-title text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-800 mb-3">هل لديك أي استفسار؟</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">نحن هنا لمساعدتك والإجابة على جميع استفساراتك بخصوص خدماتنا الطبية والعناية الصحية</p>
                        </div>

                        <div className="wpo-contact-form-area bg-white rounded-xl shadow-md p-8 md:p-12">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <section className="wpo-contact-map-section mt-16">
                <div className="wpo-contact-map rounded-xl overflow-hidden shadow-xl">
                    <iframe 
                        title='خريطة الموقع'
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.511722002788!2d46.67558231500018!3d24.8174779840713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2ee3a9ae98a8a1%3A0x842054c1f81f8f0!2sKing%20Fahd%20Rd%2C%20As%20Sulimaniyah%2C%20Riyadh%2012631%2C%20Saudi%20Arabia!5e0!3m2!1sen!2seg!4v1658765432103!5m2!1sen!2seg"
                        allowFullScreen
                        loading="lazy"
                        className="w-full h-96 md:h-[500px]"
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </section>
        </section>
    )
}

export default ContactpageArabic;
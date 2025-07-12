import React from 'react';
import ContactForm from '../ContactFrom/ContactForm';
import { FaMapMarkerAlt } from 'react-icons/fa';

const ContactpageArabic = () => {
    const branches = [
        {
            name: "فرع العوالي",
            address: "حي العوالي، شارع ابراهيم الجفالي قبل بنك الراجحي",
            english: "Al Awali District, Ibrahim Al Jifali Street"
        },
        {
            name: "فرع الخالدية",
            address: "طريق الدائري الثالث، حي الخالدية، برج المشارق، الدور الرابع",
            english: "Al Khalidiyah District, Mashareq Tower, 4th Floor"
        },
        {
            name: "فرع الشاطئ",
            address: "حي الشاطئ، طريق الكورنيش، برج النخبة خلف برج الشاشة، الدور الثالث",
            english: "Al Shate'a District, Corniche Road, Al Nokhba Tower, 3rd Floor"
        },
        {
            name: "فرع البساتين",
            address: "حي البساتين، شارع اسماعيل بن كثير",
            english: "Al Basateen District, Ismail Bin Katheer Street"
        },
        {
            name: "فرع ابحر الشمالية",
            address: "ابحر الشمالية، شارع عبر القارات، برج الجوهرة (آخر الخدمات قبل بيت هنيه)",
            english: "North Abhur, Across Continents Street, Al Jawhara Tower"
        },
        {
            name: "فرع قريش",
            address: "الدور الأرضي، شارع قريش (أسفل جو فالي Joi Valley)",
            english: "Ground Floor, Qureish Street (below Joi Valley)"
        }
    ];

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
                                            <p className="text-gray-600">مواعيد العمل: من السبت إلى الأربعاء، 9:00 صباحًا - 10:00 مساءً</p>
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
                                            <p className="text-gray-600">الشعار: ماسترز خبراء لجمالك و صحتك</p>
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

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            {branches.map((branch, index) => (
                                <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex">
                                    <div className="text-[#d9b755] text-2xl mt-1 ml-3">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800 mb-2">{branch.name}</h3>
                                        <p className="text-gray-600 mb-2">{branch.address}</p>
                                        <p className="text-gray-500 text-sm">{branch.english}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

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
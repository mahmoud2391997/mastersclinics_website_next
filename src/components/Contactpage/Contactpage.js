import React from 'react';
import ContactForm from '../ContactFrom/ContactForm';

const ContactpageArabic = () => {
    return (
        <section className="wpo-contact-pg-section section-padding" >
            <div className="container">
                <div className="row">
                    <div className="col col-lg-10 offset-lg-1">
                        <div className="office-info">
                            <div className="row">
                                <div className="col col-xl-4 col-lg-6 col-md-6 col-12">
                                    <div className="office-info-item">
                                        <div className="office-info-icon">
                                            <div className="icon">
                                                <i className="fi flaticon-location-1"></i>
                                            </div>
                                        </div>
                                        <div className="office-info-text">
                                            <h2>العنوان</h2>
                                            <p>الرياض، حي السليمانية، شارع الملك فهد</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col col-xl-4 col-lg-6 col-md-6 col-12">
                                    <div className="office-info-item">
                                        <div className="office-info-icon">
                                            <div className="icon">
                                                <i className="fi flaticon-email"></i>
                                            </div>
                                        </div>
                                        <div className="office-info-text">
                                            <h2>البريد الإلكتروني</h2>
                                            <p>info@medically.com</p>
                                            <p>support@medically.com</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col col-xl-4 col-lg-6 col-md-6 col-12">
                                    <div className="office-info-item">
                                        <div className="office-info-icon">
                                            <div className="icon">
                                                <i className="fi flaticon-phone-call"></i>
                                            </div>
                                        </div>
                                        <div className="office-info-text">
                                            <h2>اتصل بنا</h2>
                                            <p>+966 11 123 4567</p>
                                            <p>+966 50 123 4567</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="wpo-contact-title">
                            <h2>هل لديك أي استفسار؟</h2>
                            <p>نحن هنا لمساعدتك والإجابة على جميع استفساراتك بخصوص خدماتنا الطبية والعناية الصحية</p>
                        </div>
                        <div className="wpo-contact-form-area">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </div>
            <section className="wpo-contact-map-section">
                <div className="wpo-contact-map">
                    <iframe 
                        title='خريطة الموقع'
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.511722002788!2d46.67558231500018!3d24.8174779840713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2ee3a9ae98a8a1%3A0x842054c1f81f8f0!2sKing%20Fahd%20Rd%2C%20As%20Sulimaniyah%2C%20Riyadh%2012631%2C%20Saudi%20Arabia!5e0!3m2!1sen!2seg!4v1658765432103!5m2!1sen!2seg"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </section>
        </section>
    )
}

export default ContactpageArabic;
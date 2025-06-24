import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

const ClickHandler = () => {
  window.scrollTo(10, 0);
};

const Footer = ({ hclass = '' }) => {
  return (
    <footer className={` bg-cover bg-center relative overflow-hidden text-base ${hclass}`} dir="rtl">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-[#f6eecd] -z-10"></div>
      
      <div className="container mx-auto px-4">
        {/* Upper Footer */}
        <div className="py-24 pt-64 md:pt-24 lg:pt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About Widget */}
            <div className="mb-12 md:mb-0">
              <div className="mb-6">
                <img src={logo} alt="شعار العيادات المتخصصة" className="max-w-[147px]" />
              </div>
              <p className="text-[#767676] text-lg leading-relaxed mb-6">
                نحن نقدم أفضل الخدمات الطبية المتخصصة مع فريق من الأطباء المؤهلين وأحدث المعدات الطبية لضمان حصولك على أفضل رعاية صحية.
              </p>
              <div className="social-links">
                <h4 className="text-xl font-medium text-[#000B47] mb-4">تابعنا على:</h4>
                <ul className="flex space-x-3 space-x-reverse">
                  {['facebook-f', 'twitter', 'instagram', 'linkedin-in'].map((icon) => (
                    <li key={icon}>
                      <a 
                        href="#" 
                        aria-label={icon}
                        className="w-10 h-10 flex items-center justify-center bg-[rgba(134,188,226,0.15)] rounded-full text-[#000B47] hover:text-[#0080D2] transition-colors"
                      >
                        <i className={`fab fa-${icon} text-lg`}></i>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quick Links */}
            <div className="mb-12 md:mb-0 md:pl-6 lg:pl-12">
              <h3 className="text-3xl text-[#000B47] font-normal mb-6 font-['Hacen_Eltaroute']">روابط سريعة</h3>
              <ul className="space-y-4">
                {[
                  { path: "/", label: "الرئيسية" },
                  { path: "/about", label: "من نحن" },
                  { path: "/services", label: "خدماتنا" },
                  { path: "/doctors", label: "أطباؤنا" },
                  { path: "/contact", label: "اتصل بنا" }
                ].map((link) => (
                  <li key={link.path}>
                    <Link 
                      onClick={ClickHandler} 
                      to={link.path}
                      className="text-[#767676] text-lg hover:text-[#0080D2] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div className="mb-12 md:mb-0">
              <h3 className="text-3xl text-[#000B47] font-normal mb-6 font-['Hacen_Eltaroute']">خدماتنا الطبية</h3>
              <ul className="space-y-4">
                {[
                  { path: "/cardiology", label: "أمراض القلب والأوعية الدموية" },
                  { path: "/orthopedics", label: "جراحة العظام" },
                  { path: "/neurology", label: "طب الأعصاب" },
                  { path: "/pediatrics", label: "طب الأطفال" },
                  { path: "/gynecology", label: "النساء والولادة" }
                ].map((service) => (
                  <li key={service.path}>
                    <Link 
                      onClick={ClickHandler} 
                      to={service.path}
                      className="text-[#767676] text-lg hover:text-[#0080D2] transition-colors"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-3xl text-[#000B47] font-normal mb-6 font-['Hacen_Eltaroute']">معلومات التواصل</h3>
              <div className="space-y-5">
                <div className="flex items-start">
                  <i className="fas fa-map-marker-alt text-[#0080D2] text-lg mt-1 ml-3"></i>
                  <div>
                    <h4 className="text-lg font-medium text-[#000B47]">العنوان:</h4>
                    <p className="text-[#767676]">شارع الملك فهد، الرياض<br />المملكة العربية السعودية</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-phone text-[#0080D2] text-lg mt-1 ml-3"></i>
                  <div>
                    <h4 className="text-lg font-medium text-[#000B47]">الهاتف:</h4>
                    <p className="text-[#767676]">+٩٦٦ ١١ ٢٣ ٤٥٦٧</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-envelope text-[#0080D2] text-lg mt-1 ml-3"></i>
                  <div>
                    <h4 className="text-lg font-medium text-[#000B47]">البريد الإلكتروني:</h4>
                    <p className="text-[#767676]">info@mastersclinics.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-clock text-[#0080D2] text-lg mt-1 ml-3"></i>
                  <div>
                    <h4 className="text-lg font-medium text-[#000B47]">ساعات العمل:</h4>
                    <p className="text-[#767676]">السبت - الخميس: ٨:٠٠ص - ١٠:٠٠م<br />الجمعة: ٢:٠٠م - ١٠:٠٠م</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Footer */}
        <div className="border-t border-[#D5DCE1] py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-[#69A1C9] text-lg">
                &copy; ٢٠٢٤ العيادات المتخصصة. جميع الحقوق محفوظة.
              </p>
            </div>
            <div>
              <ul className="flex flex-wrap justify-center space-x-4 space-x-reverse">
                {[
                  { path: "/privacy", label: "سياسة الخصوصية" },
                  { path: "/terms", label: "الشروط والأحكام" },
                  { path: "/sitemap", label: "خريطة الموقع" }
                ].map((link) => (
                  <li key={link.path}>
                    <Link 
                      onClick={ClickHandler} 
                      to={link.path}
                      className="text-[#69A1C9] text-lg hover:text-[#000B47] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
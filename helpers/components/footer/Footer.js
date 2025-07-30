import React from "react";
import Link from "next/link";
import { FaFacebook, FaYoutube, FaInstagram, FaEnvelope, FaPhone, FaSnapchat, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
export const branches = [
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

export const contactInfo = {
  emailGeneral: "info@masters.clinic",
  emailHR: "info.hr@masters.clinic",
  hotline: "8002440181",
  telemedicine: "966551996424",
};

export const socialLinks = [
  { icon: "FaFacebook", href: "https://www.facebook.com/masters.clinicn/" },
  { icon: "FaYoutube", href: "https://www.youtube.com/channel/UCAy80cOsDrVqfQLM0HNP_sw" },
  { icon: "FaXTwitter", href: "https://x.com/i/flow/login?redirect_after_login=%2Fmasters_clinic" },
  { icon: "FaInstagram", href: "https://www.instagram.com/masters.clinics/" },
  { icon: "FaSnapchat", href: "https://www.snapchat.com/add/masters.clinic" },
  { icon: "FaTiktok", href: "https://www.tiktok.com/@mastersclinics" }
];

export const quickLinks = [
  { name: "الرئيسية", href: "/" },
  { name: "من نحن", href: "/about" },
  { name: "الخدمات", href: "/services" },
  { name: "الاقسام", href: "/departments" },
  { name: "الفروع", href: "/branches" },
  { name: "الاجهزة", href: "/devices" },
  { name: "الأطباء", href: "/teams" },
  { name: "العروض", href: "/offers" },
  { name: "المقالات", href: "/blog" },
  { name: "اتصل بنا", href: "/contact" },
];

const iconMap = {
  FaFacebook: FaFacebook,
  FaYoutube: FaYoutube,
  FaInstagram: FaInstagram,
  FaEnvelope: FaEnvelope,
  FaPhone: FaPhone,
  FaSnapchat: FaSnapchat,
  FaTiktok: FaTiktok,
  FaXTwitter: FaXTwitter
};


const ClickHandler = () => {
  window.scrollTo(10, 0);
};

const Footer = (props) => {
  return (
    <footer className={"rtl  " + props.hclass} dir="rtl">
      <div className="wpo-upper-footer">
        <div className="container">
          <div className="row">
            {/* عمود التعريف */}
            <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
              <div className="widget about-widget">
                <div className="logo widget-title">
                  <img src={"https://cdn.salla.sa/cdn-cgi/image/fit=scale-down,width=400,height=400,onerror=redirect,format=auto/dEYvd/lBmMUm3zZyt94KtrsYYdL6UrUEOoncu4UJnK9VhR.png"} alt="logo" />
                </div>
                <p>ماسترز خبراء لجمالك وصحتك، نقدم أفضل الخدمات الطبية بمعايير عالمية.</p>
   <div className="flex flex-wrap justify-center gap-3">
      {[
  { icon: <FaFacebook />, href: "https://www.facebook.com/masters.clinicn/" },
  { icon: <FaYoutube />, href: "https://www.youtube.com/channel/UCAy80cOsDrVqfQLM0HNP_sw" },
  { icon: <FaXTwitter />, href: "https://x.com/i/flow/login?redirect_after_login=%2Fmasters_clinic" },
  { icon: <FaInstagram />, href: "https://www.instagram.com/masters.clinics/" },
  { icon: <FaSnapchat />, href: "https://www.snapchat.com/add/masters.clinic" },
  { icon: <FaTiktok />, href: "https://www.tiktok.com/@mastersclinics" },
].map(({ icon, href }, idx) => (
  <a
    key={idx}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-white text-[#dec06a] border border-[#dec06a] p-2 rounded-full hover:text-black hover:scale-110 transition-transform duration-200"
  >
    {React.cloneElement(icon, { size: 20, color: "#dec06a" })}
  </a>
))}

      </div>



              </div>
            </div>

            {/* روابط سريعة */}
            <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
              <div className="widget link-widget">
                <div className="widget-title">
                  <h3>روابط سريعة</h3>
                </div>
                <ul>
                  {quickLinks.map((link, idx) => (
                    <li key={idx}>
                      <Link href={link.href} onClick={ClickHandler}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* فروعنا */}
            <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
              <div className="widget link-widget s2">
                <div className="widget-title">
                  <h3>فروعنا</h3>
                </div>
                <ul>
                  {branches.map((branch, idx) => (
                    <li key={idx}><span>{branch.name}</span></li>
                  ))}
                  <li>
                    <Link href="/branches" onClick={ClickHandler}>عرض جميع الفروع</Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* تواصل معنا */}
            <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
              <div className="widget contact-widget">
                <div className="widget-title">
                  <h3>تواصل معنا</h3>
                </div>
                <ul>
                  <li><i className="flaticon-email"></i><span>{contactInfo.emailGeneral}</span></li>
                  <li><i className="flaticon-telephone"></i><span>{contactInfo.hotline}<br />{contactInfo.telemedicine}</span></li>
                  <li><i className="flaticon-clock"></i><span>{contactInfo.workingHours}</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lower footer */}
      <div className="wpo-lower-footer">
        <div className="container">
          <div className="row g-0">
            <div className="col col-lg-6 col-12">
              <p className="copyright">جميع الحقوق محفوظة &copy; {new Date().getFullYear()} عيادات ماسترز</p>
            </div>
            <div className="col col-lg-6 col-12">
              <ul>
                <li><Link href="/privacy" onClick={ClickHandler}>سياسة الخصوصية</Link></li>
                <li><Link href="/terms" onClick={ClickHandler}>الشروط والأحكام</Link></li>
                <li><Link href="/about" onClick={ClickHandler}>من نحن</Link></li>
                <li><Link href="/faq" onClick={ClickHandler}>الأسئلة الشائعة</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


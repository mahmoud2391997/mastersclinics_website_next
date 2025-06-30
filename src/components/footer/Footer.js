import React from 'react'
import Link from 'next/link'
import logo from '../../images/logo.svg'

const ClickHandler = () => {
    window.scrollTo(10, 0);
}

const Footer = (props) => {
    return (
        <footer className={"rtl " + props.hclass} dir="rtl">
            <div className="wpo-upper-footer">
                <div className="container">
                    <div className="row">
                        <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                            <div className="widget about-widget">
                                <div className="logo widget-title">
                                    <img src={logo} alt="logo" />
                                </div>
                                <p>نقدم لكم أفضل الخدمات الطبية والعناية الصحية بأعلى معايير الجودة والكفاءة المهنية.</p>
                                <div className="social-widget">
                                    <ul>
                                        <li>
                                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" onClick={ClickHandler}>
                                                <i className="flaticon-facebook-app-symbol"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" onClick={ClickHandler}>
                                                <i className="flaticon-twitter"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" onClick={ClickHandler}>
                                                <i className="flaticon-linkedin"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" onClick={ClickHandler}>
                                                <i className="flaticon-instagram"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                            <div className="widget link-widget">
                                <div className="widget-title">
                                    <h3>روابط سريعة</h3>
                                </div>
                                <ul>
                                    <li><Link href="/home" onClick={ClickHandler}>الرئيسية</Link></li>
                                    <li><Link href="/about" onClick={ClickHandler}>من نحن</Link></li>
                                    <li><Link href="/services" onClick={ClickHandler}>الخدمات</Link></li>
                                    <li><Link href="/blog" onClick={ClickHandler}>أحدث الأخبار</Link></li>
                                    <li><Link href="/doctor" onClick={ClickHandler}>فريق العمل</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                            <div className="widget link-widget s2">
                                <div className="widget-title">
                                    <h3>روابط مفيدة</h3>
                                </div>
                                <ul>
                                    <li><Link href="/project" onClick={ClickHandler}>المشاريع</Link></li>
                                    <li><Link href="/shop" onClick={ClickHandler}>المتجر</Link></li>
                                    <li><Link href="/cart" onClick={ClickHandler}>سلة التسوق</Link></li>
                                    <li><Link href="/contact" onClick={ClickHandler}>اتصل بنا</Link></li>
                                    <li><Link href="/faq" onClick={ClickHandler}>الأسئلة الشائعة</Link></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                            <div className="widget contact-widget">
                                <div className="widget-title">
                                    <h3>تواصل معنا</h3>
                                </div>
                                <ul>
                                    <li><i className="flaticon-email"></i><span>info@example.com</span></li>
                                    <li><i className="flaticon-telephone"></i><span>+966 12 345 6789<br />+966 98 765 4321</span></li>
                                    <li><i className="flaticon-location-1"></i><span>الرياض، المملكة العربية السعودية<br />شارع الملك فهد</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="wpo-lower-footer">
                <div className="container">
                    <div className="row g-0">
                        <div className="col col-lg-6 col-12">
                            <p className="copyright">جميع الحقوق محفوظة &copy; {new Date().getFullYear()} عيادتي</p>
                        </div>
                        <div className="col col-lg-6 col-12">
                            <ul>
                                <li><Link href="/privace" onClick={ClickHandler}>سياسة الخصوصية</Link></li>
                                <li><Link href="/terms" onClick={ClickHandler}>الشروط والأحكام</Link></li>
                                <li><Link href="/about" onClick={ClickHandler}>من نحن</Link></li>
                                <li><Link href="/faq" onClick={ClickHandler}>الأسئلة الشائعة</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
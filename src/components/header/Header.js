import React, { useState } from 'react'
import Link from 'next/link'
import MobileMenu from '../MobileMenu/MobileMenu'

const Header = (props) => {
    const [menuActive, setMenuState] = useState(false);
    const [cartActive, setcartState] = useState(false);

    const SubmitHandler = (e) => {
        e.preventDefault()
    }

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    const { carts } = props;

    // Helper for non-navigating menu items
    const MenuButton = ({ children }) => (
        <button type="button" className="menu-link" onClick={ClickHandler} style={{ background: 'none', border: 'none', padding: 0 }}>
            {children}
        </button>
    );

    return (
        <header id="header" dir="rtl" className="relative">
            <div className={props.hclass}>
                <nav className="navigation navbar navbar-expand-lg navbar-light  w-[99%] md:mr-[45px] lg:mr-[95px]">
                    <div className="container-fluid">
                        <div className="row flex :flex-row items-center justify-between m-auto">
                            {/* Moved mobile menu to the right side */}
                            
                            {/* Logo - centered in RTL */}
                            <div className="col-lg-2 col-md-6 col-6 text-center">
                                <div className="navbar-header ">
                                    <Link href="/home" className="navbar-brand flex justify-center items-center">
                                        <img 
                                            src="https://cdn.salla.sa/cdn-cgi/image/fit=scale-down,width=400,height=400,onerror=redirect,format=auto/dEYvd/lBmMUm3zZyt94KtrsYYdL6UrUEOoncu4UJnK9VhR.png" 
                                            alt="logo" 
                                            onClick={ClickHandler} 
                                            className="max-w-[147px] md:max-w-[200px]"
                                        />
                                    </Link>
                                </div>
                            </div>
                            
                            <div className="col-lg-3 col-md-3 col-6 flex justify-center items-center d-lg-none dl-block text-end">
                                <MobileMenu />
                            </div>
                            {/* Navigation menu - aligned right */}
                            <div className="col-lg-10 col-md-1 col-1">
                                <div id="navbar" className="navbar-collapse navigation-holder mr-[10px]">
                                    <button className="menu-close absolute right-0 top-0 z-50 p-2 text-white"><i className="ti-close"></i></button>
                                    <ul className="nav navbar-nav mb-2 mb-lg-0 float-right flex-nowrap">
                                        <li className="menu-item-has-children relative group">
                                            <Link href="/home" className="block px-4 lg:px-5 text-[#000B47] text-xl font-medium hover:text-[#CBA853] transition-colors duration-300 relative">
                                                الرئيسية
                                                <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A58532] to-[#f0db83] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                            </Link>
                                            <ul className="sub-menu absolute left-0 top-full w-[225px] bg-white shadow-lg py-5 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 z-10 text-right">
                                                <li><Link href="/home" className="block py-2 px-4 hover:text-[#CBA853] transition-colors duration-300 no-underline" onClick={ClickHandler}>الرئيسية النمط 1</Link></li>
                                                <li><Link href="/home-2" className="block py-2 px-4 hover:text-[#CBA853] transition-colors duration-300 no-underline" onClick={ClickHandler}>الرئيسية النمط 2</Link></li>
                                                <li><Link href="/home-3" className="block py-2 px-4 hover:text-[#CBA853] transition-colors duration-300 no-underline" onClick={ClickHandler}>الرئيسية النمط 3</Link></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <Link href="/about" className="block  px-4 lg:px-5 text-[#000B47] text-xl font-medium hover:text-[#CBA853] transition-colors duration-300 relative no-underline">
                                                من نحن
                                                <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A58532] to-[#f0db83] opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                                            </Link>
                                        </li>
                                        <li className="menu-item-has-children relative group">
                                            <Link href="/pages" className="block px-4 lg:px-5 text-[#000B47] text-xl font-medium hover:text-[#CBA853] transition-colors duration-300 relative no-underline">
                                                صفحات
                                                <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A58532] to-[#f0db83] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                            </Link>
                                            <ul className="sub-menu absolute left-0 top-full w-[225px] bg-white shadow-lg py-5 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 z-10 text-right">
                                                <li><Link href="/team" className="block py-2 px-4 hover:text-[#CBA853] transition-colors duration-300 no-underline" onClick={ClickHandler}>الأطباء</Link></li>
                                                <li><Link href="/team-single/Marlene-Henry" className="block py-2 px-4 hover:text-[#CBA853] transition-colors duration-300 no-underline" onClick={ClickHandler}>صفحة الطبيب</Link></li>
                                                <li><Link href="/shop" className="block py-2 px-4 hover:text-[#CBA853] transition-colors duration-300 no-underline" onClick={ClickHandler}>المتجر</Link></li>
                                                <li><Link href="/shop-single/prayer-mat" className="block py-2 px-4 hover:text-[#CBA853] transition-colors duration-300 no-underline" onClick={ClickHandler}>صفحة المنتج</Link></li>
                                                <li><Link href="/cart" className="block py-2 px-4 hover:text-[#CBA853] transition-colors duration-300 no-underline" onClick={ClickHandler}>السلة</Link></li>
                                                <li><Link href="/checkout" className="block py-2 px-4 hover:text-[#CBA853] transition-colors duration-300 no-underline" onClick={ClickHandler}>الدفع</Link></li>
                                                <li><Link href="/404" className="block py-2 px-4 hover:text-[#CBA853] transition-colors duration-300 no-underline" onClick={ClickHandler}>خطأ 404</Link></li>
                                                <li><Link href="/faq" className="block py-2 px-4 hover:text-[#CBA853] transition-colors duration-300 no-underline" onClick={ClickHandler}>الأسئلة الشائعة</Link></li>
                                            </ul>
                                        </li>
                                        <li className="menu-item-has-children relative group">
                                            <Link href="/services" className="block  px-4 lg:px-5 text-[#000B47] text-xl font-medium hover:text-[#CBA853] transition-colors duration-300 relative no-underline">
                                                الخدمات
                                                <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A58532] to-[#f0db83] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                            </Link>
                                            <ul className="sub-menu absolute left-0 top-full w-[225px] bg-white shadow-lg py-5 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 z-10 text-right">
                                                <li><Link href="/services" className="block py-2 px-4 hover:text-[#CBA853] transition-colors duration-300 no-underline" onClick={ClickHandler}>الخدمات</Link></li>
                                                <li><Link href="/service-single/Dental-Care" className="block py-2 px-4 hover:text-[#CBA853] transition-colors duration-300 no-underline" onClick={ClickHandler}>صفحة الخدمة</Link></li>
                                            </ul>
                                        </li>
                                        <li className="menu-item-has-children relative group">
                                            <Link href="/project" className="block  px-4 lg:px-5 text-[#000B47] text-xl font-medium hover:text-[#CBA853] transition-colors duration-300 relative no-underline">
                                                معرض الأعمال
                                                <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A58532] to-[#f0db83] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                            </Link>
                                            <ul className="sub-menu absolute left-0 top-full w-[225px] bg-white shadow-lg py-5 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 z-10 text-right">
                                                <li><Link href="/project" className="block py-2 px-4 hover:text-[#CBA853] transition-colors duration-300 no-underline" onClick={ClickHandler}>المعرض</Link></li>
                                                <li><Link href="/project-single/Heart-Institure" className="block py-2 px-4 hover:text-[#CBA853] transition-colors duration-300 no-underline" onClick={ClickHandler}>صفحة المشروع</Link></li>
                                            </ul>
                                        </li>
                                        <li className="menu-item-has-children relative group">
                                            <Link href="/blog" className="block  px-4 lg:px-5 text-[#000B47] text-xl font-medium hover:text-[#CBA853] transition-colors duration-300 relative no-underline">
                                                المدونة
                                                <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A58532] to-[#f0db83] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                            </Link>
                                            <ul className="sub-menu absolute left-0 top-full w-[225px] bg-white shadow-lg py-5 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 z-10 text-right">
                                                <li><Link href="/blog" className="block py-2 px-4 hover:text-[#CBA853] transition-colors duration-300 no-underline" onClick={ClickHandler}>المدونة (الشريط الأيمن)</Link></li>
                                                <li><Link href="/blog-left-sidebar" className="block py-2 px-4 hover:text-[#CBA853] transition-colors duration-300 no-underline" onClick={ClickHandler}>المدونة (الشريط الأيسر)</Link></li>
                                                <li><Link href="/blog-fullwidth" className="block py-2 px-4 hover:text-[#CBA853] transition-colors duration-300 no-underline" onClick={ClickHandler}>المدونة (عرض كامل)</Link></li>
                                                <li className="menu-item-has-children relative group">
                                                    <MenuButton className="block py-2 px-4 hover:text-[#CBA853] transition-colors duration-300 no-underline">تفاصيل المدونة</MenuButton>
                                                    <ul className="sub-menu absolute left-full top-0 w-[225px] bg-white shadow-lg py-5 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 z-10 text-right">
                                                        <li><Link href="/blog-single/Why-Industry-Are-A-Juicy-Target-For" className="block py-2 px-4 hover:text-[#CBA853] transition-colors duration-300 no-underline" onClick={ClickHandler}>تفاصيل (الشريط الأيمن)</Link></li>
                                                        <li><Link href="/blog-single-left-sidebar/Why-Industry-Are-A-Juicy-Target-For" className="block py-2 px-4 hover:text-[#CBA853] transition-colors duration-300 no-underline" onClick={ClickHandler}>تفاصيل (الشريط الأيسر)</Link></li>
                                                        <li><Link href="/blog-single-fullwidth/Why-Industry-Are-A-Juicy-Target-For" className="block py-2 px-4 hover:text-[#CBA853] transition-colors duration-300 no-underline" onClick={ClickHandler}>تفاصيل (عرض كامل)</Link></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <Link href="/contact" className="block px-4 lg:px-5 text-[#000B47] text-xl font-medium hover:text-[#CBA853] transition-colors duration-300 relative no-underline">
                                                اتصل بنا
                                                <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A58532] to-[#f0db83] opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                            {/* Empty column - kept for layout balance */}
                            <div className="col-lg-3 col-md-2 col-2">
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header;
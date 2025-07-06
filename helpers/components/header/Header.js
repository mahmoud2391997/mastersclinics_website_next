import React from 'react'
import Link from 'next/link'
import MobileMenu from '../MobileMenu/MobileMenu'

const Header = (props) => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }




    return (
        <header id="header" dir="rtl" className="relative">
            <div className={props.hclass}>
                <nav className="navigation navbar navbar-expand-lg navbar-light w-[99%] md:mr-[45px] lg:mr-[95px]">
                    <div className="container-fluid">
                        <div className="row flex :flex-row items-center lg:items-start justify-between m-auto">
                            {/* Logo */}
                            <div className="col-lg-2 col-md-6 col-6 text-center">
                                <div className="navbar-header">
                                    <Link href="/" className="navbar-brand flex justify-center items-center">
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
                            
                            {/* Navigation menu */}
                            <div className="col-lg-10 col-md-1 col-1">
                                <div id="navbar" className="navbar-collapse navigation-holder mr-[10px]">
                                    <button className="menu-close absolute right-0 top-0 z-50 p-2 text-white"><i className="ti-close"></i></button>
                                    <ul className="nav navbar-nav">
                                        <li className="menu-item-has-children">
                                            <Link href="/" className="block px-4 lg:px-5 text-[#000B47] text-xl font-medium hover:text-[#CBA853] transition-colors duration-300 relative">
                                                الرئيسية
                                                <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A58532] to-[#f0db83] opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                                            </Link>
                                          
                                        </li>
                                        <li>
                                            <Link href="/about" className="block px-4 lg:px-5 text-[#000B47] text-xl font-medium hover:text-[#CBA853] transition-colors duration-300 relative">
                                                من نحن
                                                <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A58532] to-[#f0db83] opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                                            </Link>
                                        </li>
                                        <li className="menu-item-has-children">
                                            <Link href="/branches" className="block px-4 lg:px-5 text-[#000B47] text-xl font-medium hover:text-[#CBA853] transition-colors duration-300 relative">
                                                الفروع  
                                                <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A58532] to-[#f0db83] opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                                            </Link>
                                        
                                        </li>
                                        <li className="menu-item-has-children">
                                            <Link href="/services" className="block px-4 lg:px-5 text-[#000B47] text-xl font-medium hover:text-[#CBA853] transition-colors duration-300 relative">
                                                الخدمات
                                                <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A58532] to-[#f0db83] opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                                            </Link>
                              
                                        </li>
                                        <li className="menu-item-has-children">
                                            <Link href="/project" className="block px-4 lg:px-5 text-[#000B47] text-xl font-medium hover:text-[#CBA853] transition-colors duration-300 relative">
                                                الاجهزة
                                                <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A58532] to-[#f0db83] opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                                            </Link>
                                          
                                        </li>
                                        <li className="menu-item-has-children">
                                            <Link href="/team" className="block px-4 lg:px-5 text-[#000B47] text-xl font-medium hover:text-[#CBA853] transition-colors duration-300 relative">
                                                الاطباء
                                                <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A58532] to-[#f0db83] opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                                            </Link>
                                          
                                        </li>
                                        <li className="menu-item-has-children">
                                            <Link href="/offers" className="block px-4 lg:px-5 text-[#000B47] text-xl font-medium hover:text-[#CBA853] transition-colors duration-300 relative">
                                                العروض
                                                <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A58532] to-[#f0db83] opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                                            </Link>
                                          
                                        </li>
                                        <li className="menu-item-has-children">
                                            <Link href="/blog" className="block px-4 lg:px-5 text-[#000B47] text-xl font-medium hover:text-[#CBA853] transition-colors duration-300 relative">
                                                المدونة
                                                <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A58532] to-[#f0db83] opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                                            </Link>
                                          
                                        </li>
                                        <li>
                                            <Link href="/contact" className="block px-4 lg:px-5 text-[#000B47] text-xl font-medium hover:text-[#CBA853] transition-colors duration-300 relative">
                                                اتصل بنا
                                                <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A58532] to-[#f0db83] opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                            {/* Empty column */}
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
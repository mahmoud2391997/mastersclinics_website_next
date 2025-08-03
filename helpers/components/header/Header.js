"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import MobileMenu from "../MobileMenu/MobileMenu";
import ContactBar from "./socialMedia";
import { FaChevronDown, FaSearch } from "react-icons/fa";

const Header = (props) => {
  const [menuData, setMenuData] = useState({
    branches: [],
    departments: [],
    devices: [],
    doctors: [],
    offers: [],
    blogs: [],
    services: [],
  });
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const res = await fetch("https://www.ss.mastersclinics.com/navbar-data");
        const data = await res.json();
        setMenuData(data);
      } catch (error) {
        console.error("Failed to fetch navbar data", error);
      }
    };

    fetchMenuData();
  }, []);

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  const renderDropdown = (items, basePath) => (
    <ul 
      className={`absolute top-full right-0 bg-white shadow-lg rounded-md py-2 hidden group-hover:block z-50 border-t-2 border-[#CBA853] min-w-[200px] ${
        items.length > 8 ? 'max-h-80 overflow-y-auto' : ''
      }`}
    >
      {items.map((item) => (
        <li key={item.id}>
          <Link
            href={`/${basePath}/${item.id}`}
            className="block px-4 py-2 text-black hover:text-[#CBA853] hover:bg-gray-50 transition-colors duration-300 whitespace-nowrap text-right"
            onClick={ClickHandler}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative">
      <ContactBar />

      <header id="header" dir="rtl" className="relative z-[1111] w-full h-[150px] md:h-auto">
        <div className={`${props.hclass} m-auto w-full bg-[#f6eecd] md:bg-transparent`}>
          <nav className="navigation w-full">
            <div className={`container-fluid flex flex-wrap flex-row md:!flex-row-reverse items-center justify-center px-4 gap-2 lg:px-8 py-2 w-full max-w-[1150px] mx-auto ${props.nav ? "justify-between md:justify-end" : "justify-center"}`}>
              {/* Mobile Menu Toggle - Right */}
              <div className="flex md:hidden order-3 ml-auto">
                <MobileMenu menuData={menuData} />
              </div>

              {/* Logo - Center */}
              <div className="flex-shrink-0 order-2 mx-auto">
                <Link href="/" className="navbar-brand">
                  <img
                    src="https://cdn.salla.sa/cdn-cgi/image/fit=scale-down,width=400,height=400,onerror=redirect,format=auto/dEYvd/lBmMUm3zZyt94KtrsYYdL6UrUEOoncu4UJnK9VhR.png"
                    alt="logo"
                    onClick={ClickHandler}
                    className={`w-[150px] md:w-[250px]`}
                  />
                </Link>
              </div>

              {/* Mobile Search Icon - Left */}
              <div className="flex md:hidden order-1 mr-auto">
                <FaSearch
                  onClick={() => setShowMobileSearch(!showMobileSearch)}
                  className="text-[#dec06a] cursor-pointer"
                  size={20}
                  fill="#dec06a"
                />
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:block w-full max-w-[800px] mx-4">
                <div className="relative overflow-x-visible">
                  <ul className="flex justify-center space-x-reverse space-x-1 text-base lg:text-lg font-medium items-center whitespace-nowrap">
                    {[
                      { label: "من نحن", href: "/about" },
                      { label: "اتصل بنا", href: "/contact" },
                    ].map((item) => (
                      <li key={item.href} className="px-1 lg:px-2">
                        <Link
                          href={item.href}
                          className="text-black hover:text-[#CBA853] transition-colors duration-300 relative block py-2 px-2 lg:px-3"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}

                    {[
                      { label: "الفروع", path: "branches", items: menuData.branches },
                      { label: "الاقسام", path: "departments", items: menuData.departments },
                      { label: "الخدمات", path: "services", items: menuData.services },
                      { label: "الاجهزة", path:"devices",items:menuData.devices},
                      { label: "الاطباء", path: "teams", items: menuData.doctors },
                      { label: "العروض", path: "offers", items: menuData.offers },
                      { label: "المقالات", path: "blog", items: menuData.blogs },
                    ].map((menu) => (
                      <li key={menu.path} className="relative group px-1 lg:px-2">
                        <Link
                          href={`/${menu.path}`}
                          className="flex items-center text-black hover:text-[#CBA853] transition-colors duration-300 relative py-2 px-2 lg:px-3"
                        >
                          {menu.label} <FaChevronDown className="mr-1 text-xs" />
                        </Link>
                        {menu.items.length > 0 && renderDropdown(menu.items, menu.path)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Mobile Search Bar */}
            {showMobileSearch && (
              <div className="md:hidden px-4 pb-2 relative">
                <input
                  type="text"
                  placeholder="ابحث هنا..."
                  className="w-full px-4 py-2 border border-[#dec06a] rounded-full focus:outline-none focus:ring-2 focus:ring-[#dec06a] transition"
                />
                <FaSearch
                  className="absolute top-1/2 transform -translate-y-1/2 left-4 text-[#dec06a] cursor-pointer"
                  size={18}
                  fill="#dec06a"
                />
              </div>
            )}
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
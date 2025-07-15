"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import MobileMenu from "../MobileMenu/MobileMenu";
import { getImageUrl } from "@/helpers/hooks/imageUrl";
import ContactBar from "./socialMedia";
import { FaChevronDown } from "react-icons/fa";

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
    <ul className="absolute top-full right-0 bg-white shadow-lg rounded-md py-2 w-48 hidden group-hover:block z-50 border-t-2 border-[#CBA853]">
      {items.map((item) => (
        <li key={item.id}>
          <Link
            href={`/${basePath}/${item.id}`}
            className="block px-4 py-2 text-black hover:text-[#CBA853] hover:bg-gray-50 transition-colors duration-300"
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

      <header id="header" dir="rtl" className="relative mr-10 z-[1111] m-auto">
        <div className={props.hclass}>
          <nav className="navigation navbar navbar-expand-lg navbar-light">
            <div className="container-fluid flex flex-col-reverse gap-4 md:flex-row justify-between mr-10">
              {/* Logo */}
              <div className="col-lg-2">
                <Link href="/" className="navbar-brand flex justify-center items-center">
                  <img
                    src={
                      props.nav
                        ? "https://cdn.salla.sa/cdn-cgi/image/fit=scale-down,width=400,height=400,onerror=redirect,format=auto/dEYvd/lBmMUm3zZyt94KtrsYYdL6UrUEOoncu4UJnK9VhR.png"
                        : getImageUrl("/uploads/Artboard ٨ copy.png")
                    }
                    alt="logo"
                    className="max-w-[147px] mt-2"
                    onClick={ClickHandler}
                  />
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="col-lg-10 hidden lg:block">
                <ul className="nav navbar-nav flex gap-3 text-xl font-medium w-full">
                  {[
                    { label: "الرئيسية", href: "/" },
                    { label: "من نحن", href: "/about" },
                    { label: "اتصل بنا", href: "/contact" },
                  ].map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="px-4 lg:px-5 text-black hover:text-[#CBA853] transition-colors duration-300 relative block py-4"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}

                  {[
                    { label: "الفروع", path: "branches", items: menuData.branches },
                    { label: "الاقسام", path: "departments", items: menuData.departments },
                    { label: "الخدمات", path: "services", items: menuData.services },
                    { label: "الاطباء", path: "team", items: menuData.doctors },
                    { label: "العروض", path: "offers", items: menuData.offers },
                    { label: "المقالات", path: "blog", items: menuData.blogs },
                  ].map((menu) => (
                    <li key={menu.path} className="relative group">
                      <Link
                        href={`/${menu.path}`}
                        className="flex items-center px-4 lg:px-5 text-black hover:text-[#CBA853] transition-colors duration-300 relative py-4"
                      >
                        {menu.label} <FaChevronDown className="mr-1" />
                      </Link>
                      {renderDropdown(menu.items, menu.path)}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mobile Menu Toggle */}
              <div className="col-lg-3 col-md-3 col-6 flex lg:hidden justify-center items-center">
                <MobileMenu menuData={menuData} />
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;

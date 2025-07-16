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
 <ul 
    className={`absolute top-full right-0 bg-white shadow-lg rounded-md py-2  hidden group-hover:block z-50 border-t-2 border-[#CBA853] ${
      items.length > 8 ? ' overflow-y-auto' : ''
    }`}
  >      {items.map((item) => (
        <li key={item.id}>
          <Link
            href={`/${basePath}/${item.id}`}
            className="block px-4 py-2 text-black hover:text-[#CBA853] hover:bg-gray-50 transition-colors duration-300 whitespace-nowrap"
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

      <header id="header" dir="rtl" className="relative mr-5 z-[1111]  my-auto h-auto  w-full">
        <div className={props.hclass + " m-auto w-full  bg-[#f6eecd] md:bg-transparent"}>
          <nav className="navigation navbar navbar-expand-lg navbar-light w-full lg:mr-7">
            <div className="container-fluid m-auto flex flex-col-reverse gap-4 md:flex-row justify-between  pl-0  md:m-0 md:mr-10 w-full" style={{paddingLeft: "0px !important"}}>
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link href="/" className="navbar-brand flex justify-center items-center " style={{marginRight: "0px !important"}}>
                  <img
                    src={
                      props.nav
                        ? "https://cdn.salla.sa/cdn-cgi/image/fit=scale-down,width=400,height=400,onerror=redirect,format=auto/dEYvd/lBmMUm3zZyt94KtrsYYdL6UrUEOoncu4UJnK9VhR.png"
                        : getImageUrl("/uploads/Artboard ٨ copy.png")
                    }
                    alt="logo"
                    className="max-w-[147px] md:mt-2"
                    style={{
maxWidth:"200px"                    }}
                    onClick={ClickHandler}
                  />
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:block flex-1 min-w-0">
                <ul className="flex gap-1 text-lg font-medium items-center whitespace-nowrap no-scrollbar">
                  {[
                    { label: "الرئيسية", href: "/" },
                    { label: "من نحن", href: "/about" },
                    { label: "اتصل بنا", href: "/contact" },
                  ].map((item) => (
                    <li key={item.href} className="flex-shrink-0">
                      <Link
                        href={item.href}
                        className="px-3 lg:px-4 text-black hover:text-[#CBA853] transition-colors duration-300 relative block py-4"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}

                  {[
                    { label: "الفروع", path: "branches", items: menuData.branches },
                    { label: "الاقسام", path: "departments", items: menuData.departments },
                    { label: "الخدمات", path: "services", items: menuData.services },
                    { label: "الاطباء", path: "teams", items: menuData.doctors },
                    { label: "العروض", path: "offers", items: menuData.offers },
                    { label: "المقالات", path: "blog", items: menuData.blogs },
                  ].map((menu) => (
                    <li key={menu.path} className="relative group flex-shrink-0">
                      <Link
                        href={`/${menu.path}`}
                        className="flex items-center px-2 lg:px-4 text-black hover:text-[#CBA853] transition-colors duration-300 relative py-4"
                      >
                        {menu.label} <FaChevronDown className="mr-1 text-sm" />
                      </Link>
                      {menu.items.length > 0 && renderDropdown(menu.items, menu.path)}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mobile Menu Toggle */}
              <div className="flex lg:hidden justify-center items-center">
                <MobileMenu menuData={menuData} />
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Scrollbar styling */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Header;
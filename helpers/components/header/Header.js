"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import MobileMenu from "../MobileMenu/MobileMenu";
import ContactBar from "./socialMedia";
import { FaChevronDown, FaSearch, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";

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
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef();
  const router = useRouter();
  const debounceRef = useRef();

  // Mapping entity keys to Arabic titles
  const entityNames = {
    branches: "الفروع",
    departments: "الأقسام",
    devices: "الأجهزة",
    doctors: "الأطباء",
    offers: "العروض",
    blogs: "المقالات",
  };

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

  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults(null);
      return;
    }
    try {
      const res = await fetch(`https://www.ss.mastersclinics.com/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  const debouncedSearch = useCallback((value) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      handleSearch(value);
    }, 500);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      handleSearch(query);
    }
  };

  const handleItemClick = (entity, id) => {
    const route = entity === "doctors" ? `/teams/${id}` : `/${entity}/${id}`;
    router.push(route);
    setShowSearch(false);
    setQuery("");
    setResults(null);
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
        setResults(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setQuery("");
      setResults(null);
    }
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
            <div className={`container-fluid flex flex-row items-center justify-between px-4 lg:px-8 py-2 w-full max-w-[1100px] mx-auto`}>
              {/* Logo - Right on desktop */}
              <div className="flex-shrink-0 order-2 md:order-1">
                <Link href="/" className="navbar-brand">
                  <img
                    src="https://cdn.salla.sa/cdn-cgi/image/fit=scale-down,width=400,height=400,onerror=redirect,format=auto/dEYvd/lBmMUm3zZyt94KtrsYYdL6UrUEOoncu4UJnK9VhR.png"
                    alt="logo"
                    onClick={ClickHandler}
                    className="w-[200px] md:!w-[120px] lg:w-[200px]"
                  />
                </Link>
              </div>

              {/* Desktop Navigation - Center */}
              <div className="hidden md:flex w-full max-w-[800px] lg:mx-4 order-2">
                <div className="relative overflow-x-visible w-full">
                  <ul className="flex justify-center space-x-reverse space-x-1 text-sm lg:text-lg font-medium items-center whitespace-nowrap">
                    {[
                      { label: "من نحن", href: "/about" },
                      { label: "اتصل بنا", href: "/contact" },
                    ].map((item) => (
                      <li key={item.href} className="lg:px-2">
                        <Link
                          href={item.href}
                          className="text-black hover:text-[#CBA853] transition-colors duration-300 relative block py-2 px-0 lg:!px-3"
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
                          className="flex items-center text-black hover:text-[#CBA853] transition-colors duration-300 relative py-2 px-0 lg:!px-3"
                        >
                          {menu.label} <FaChevronDown className="mr-1 text-xs" />
                        </Link>
                        {menu.items.length > 0 && renderDropdown(menu.items, menu.path)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Search Icon - Right in mobile view */}
              <div className="flex items-center order-1 md:!order-3">
                <div className="bg-white rounded-full p-2">
                  {showSearch ? (
                    <FaTimes
                      onClick={toggleSearch}
                      className="text-[#dec06a] cursor-pointer"
                      size={24}
                      fill="#dec06a"
                    />
                  ) : (
                    <FaSearch
                      onClick={toggleSearch}
                      className="text-[#dec06a] cursor-pointer"
                      size={24}
                      fill="#dec06a"
                    />
                  )}
                </div>
              </div>

              {/* Mobile Menu - Hidden on desktop */}
              <div className="flex md:hidden order-3 md:order-none">
                <MobileMenu menuData={menuData} />
              </div>
            </div>

            {/* Search Bar - Appears below header when activated */}
            {showSearch && (
              <div ref={searchRef} className="w-full flex justify-center px-4 pb-4 bg-[#f6eecd]">
                <div className="relative w-full max-w-[600px]">
                  <input
                    type="text"
                    placeholder="ابحث هنا..."
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    className="w-full px-4 py-3 pr-12 border border-[#dec06a] bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#dec06a] transition text-lg"
                  />
                  <FaSearch
                    className="absolute top-1/2 transform -translate-y-1/2 left-4 text-[#dec06a]"
                    size={20}
                  />

                  {/* Dropdown results */}
                  {results && (
                    <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-80 overflow-y-auto z-[9999] text-right">
                      {Object.entries(results).some(([, items]) => items.length > 0) ? (
                        Object.entries(results).map(([entity, items]) =>
                          items.length > 0 && (
                            <div key={entity} className="border-b last:border-b-0">
                              <div className="font-semibold text-[#dec06a] px-4 py-2">
                                {entityNames[entity] || entity}
                              </div>
                              {items.map((item) => (
                                <div
                                  key={item.id}
                                  onClick={() => handleItemClick(entity, item.id)}
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                >
                                  {item.title || item.name || item.position || item.author || item.content}
                                </div>
                              ))}
                            </div>
                          )
                        )
                      ) : query ? (
                        <div className="px-4 py-2 text-sm">لا توجد نتائج</div>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            )}
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
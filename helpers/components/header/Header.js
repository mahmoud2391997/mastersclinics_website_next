"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import MobileMenu from "../MobileMenu/MobileMenu";
import ContactBar from "./socialMedia";
import { FaChevronDown, FaChevronLeft, FaSearch, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Header = (props) => {
  const [menuData, setMenuData] = useState({
    branches: [],
    departments: [],
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
        console.log(data);
        setMenuData(data);
      } catch (error) {
        console.error("Failed to fetch navbar data", error);
      }
    };

    fetchMenuData();
  }, []);

  // Define main departments
  const mainDepartments = [
    "قسم الجلدية",
    "قسم الاسنان",
    "قسم النساء والولادة",
    "قسم التغذية"
  ];

  // Group departments into main and general
  const groupedDepartments = {
    main: menuData.departments.filter(dept => mainDepartments.includes(dept.name)),
    general: menuData.departments.filter(dept => !mainDepartments.includes(dept.name))
  };

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

  // Group branches by region
  const groupedBranches = menuData.branches.reduce((acc, branch) => {
    if (!acc[branch.region_name]) {
      acc[branch.region_name] = [];
    }
    acc[branch.region_name].push(branch);
    return acc;
  }, {});

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

  const renderBranchesDropdown = () => (
    <div className="absolute top-full right-0 bg-white shadow-lg rounded-md py-2 hidden group-hover:block z-50 border-t-2 border-[#CBA853] min-w-[200px]">
      {/* Regions section */}
      <div className="px-4 py-2 font-semibold text-[#CBA853] border-b">
        المناطق
      </div>
      {Object.keys(groupedBranches).map((region) => (
        <div key={region} className="relative group/region">
          <div className="block flex justify-between items-center px-4 py-2 text-black hover:text-[#CBA853] hover:bg-gray-50 transition-colors duration-300 whitespace-nowrap text-right cursor-default">
            {region} <FaChevronLeft className="mr-1 text-xs" />
          </div>
          {/* Branches for this region */}
          <ul className="absolute top-0 right-full bg-white shadow-lg rounded-md py-2 hidden group-hover/region:block min-w-[200px] border-t-2 border-[#CBA853]">
            {groupedBranches[region].map((branch) => (
              <li key={branch.id}>
                <Link
                  href={`/branches/${branch.id}`}
                  className="block px-4 py-2 text-black hover:text-[#CBA853] hover:bg-gray-50 transition-colors duration-300 whitespace-nowrap text-right"
                  onClick={ClickHandler}
                >
                  {branch.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  const renderDepartmentsDropdown = () => (
    <div className="absolute top-full right-0 bg-white shadow-lg rounded-md  py-2 hidden group-hover:block z-50 border-t-2 border-[#CBA853] min-w-[200px]">
      {/* Main departments section */}
      <div className="px-4 py-2 font-semibold text-[#CBA853] border-b">
        الأقسام الرئيسية
      </div>
      {groupedDepartments.main.map((dept) => (
        <li key={dept.id}>
          <Link
            href={`/departments/${dept.id}`}
            className="block px-4 py-2 text-black hover:text-[#CBA853] hover:bg-gray-50 transition-colors duration-300 whitespace-nowrap text-right"
            onClick={ClickHandler}
          >
            {dept.name}
          </Link>
        </li>
      ))}
      
      {/* General departments section */}
      <div className="relative group/general">
        <div className="px-4 py-2 flex justify-between items-center font-semibold text-black cursor-default">
          الأقسام العامة
          <FaChevronLeft className="mr-1 text-xs" />
        </div>
        {/* General departments dropdown */}
        <ul className="absolute top-0 right-full bg-white shadow-lg rounded-md py-2 hidden group-hover/general:block min-w-[200px] border-t-2 border-[#CBA853]">
          {groupedDepartments.general.map((dept) => (
            <li key={dept.id}>
              <Link
                href={`/departments/${dept.id}`}
                className="block px-4 py-2 text-black hover:text-[#CBA853] hover:bg-gray-50 transition-colors duration-300 whitespace-nowrap text-right"
                onClick={ClickHandler}
              >
                {dept.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="relative bg-transparent pt-2  w-[100vw]  ">

      <header id="header" dir="rtl" className="relative z-[1111] w-full">
  <div className={`${props.hclass} m-auto w-full ${props.nav ? "bg-[#f6eecd]" : "bg-transparent"}`}>      <ContactBar />
          <nav className="navigation w-full mx-auto px-2">
            <div className={`container-fluid flex flex-row items-center justify-around w-full px-2 md:!px-0 lg:px-8 py-2 w-full  mx-auto`}>
              {/* Logo - Right on desktop */}
              <div className="flex-shrink-0 order-2 md:order-1">
                <Link href="/" className="navbar-brand">
                  <img
                    src="https://cdn.salla.sa/cdn-cgi/image/fit=scale-down,width=400,height=400,onerror=redirect,format=auto/dEYvd/lBmMUm3zZyt94KtrsYYdL6UrUEOoncu4UJnK9VhR.png"
                    alt="logo"
                    onClick={ClickHandler}
                    className="w-[200px] md:!w-[150px] xl:!w-[250px]"
                  />
                </Link>
              </div>

              {/* Desktop Navigation - Center */}
              <div className="hidden md:flex w-full max-w-[800px] lg:mx-4 order-2">
                <div className="relative overflow-x-visible w-full">
                  <ul className="flex justify-around space-x-reverse space-x-1 text-sm lg:text-lg xl:text-xl font-medium items-center whitespace-nowrap">
   <li className="px-1 lg:px-2">
                      <Link
                        href="/"
                        className="flex items-center text-black hover:text-[#CBA853] transition-colors duration-300 relative py-2 px-0 lg:!px-3"
                        >
                        الرئيسية
                      </Link>
                    </li>
                    {/* Branches with special dropdown */}
                    <li className="relative group px-1 lg:px-2">
                      <Link
                        href="/branches"
                        className="flex items-center text-black hover:text-[#CBA853] transition-colors duration-300 relative py-2 px-0 lg:!px-3"
                      >
                        الفروع <FaChevronDown className="mr-1 text-xs" />
                      </Link>
                      {menuData.branches.length > 0 && renderBranchesDropdown()}
                    </li>

                    {/* Departments with special dropdown */}
                    <li className="relative group px-1 lg:px-2">
                      <Link
                        href="/departments"
                        className="flex items-center text-black hover:text-[#CBA853] transition-colors duration-300 relative py-2 px-0 lg:!px-3"
                        >
                        الاقسام <FaChevronDown className="mr-1 text-xs" />
                      </Link>
                      {menuData.departments.length > 0 && renderDepartmentsDropdown()}
                    </li>

                    {/* Services with dropdown */}
                    <li className="relative group px-1 lg:px-2">
                      <Link
                        href="/services"
                        className="flex items-center text-black hover:text-[#CBA853] transition-colors duration-300 relative py-2 px-0 lg:!px-3"
                        >
                        الخدمات <FaChevronDown className="mr-1 text-xs" />
                      </Link>
                      {menuData.services.length > 0 && renderDropdown(menuData.services, "services")}
                    </li>

                    {/* Devices without dropdown */}
                    {/* <li className="px-1 lg:px-2">
                      <Link
                        href="/devices"
                        className="flex items-center text-black hover:text-[#CBA853] transition-colors duration-300 relative py-2 px-0 lg:!px-3"
                        >
                        الاجهزة
                      </Link>
                    </li> */}

                    {/* Doctors with dropdown */}
                    <li className="relative group px-1 lg:px-2">
                      <Link
                        href="/teams"
                        className="flex items-center text-black hover:text-[#CBA853] transition-colors duration-300 relative py-2 px-0 lg:!px-3"
                        >
                        الاطباء <FaChevronDown className="mr-1 text-xs" />
                      </Link>
                      {menuData.doctors.length > 0 && renderDropdown(menuData.doctors, "teams")}
                    </li>

                    {/* Offers with dropdown */}
                    <li className="relative group px-1 lg:px-2">
                      <Link
                        href="/offers"
                        className="flex items-center text-black hover:text-[#CBA853] transition-colors duration-300 relative py-2 px-0 lg:!px-3"
                        >
                        العروض <FaChevronDown className="mr-1 text-xs" />
                      </Link>
                      {menuData.offers.length > 0 && renderDropdown(menuData.offers, "offers")}
                    </li>

                    {/* Blogs with dropdown */}
                   
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
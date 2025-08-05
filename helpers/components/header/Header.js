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

  const entityNames = {
    branches: "الفروع",
    departments: "الأقسام",
    devices: "الأجهزة",
    doctors: "الأطباء",
    offers: "العروض",
    blogs: "المقالات",
  };

  const normalizeDepartmentName = (name, type) => {
    const prefixMap = {
      doctors: "أطباء",
      services: "خدمات",
      offers: "عروض",
    };
    const prefix = prefixMap[type];
    if (!prefix) return name;
    const cleanedName = name.replace(/^قسم\s+/, "").trim();
    return `${prefix} ${cleanedName}`;
  };

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const res = await fetch("https://www.ss.mastersclinics.com/navbar-data");
        const data = await res.json();
        setMenuData({
          branches: data.branches || [],
          departments: data.departments || [],
          doctors: data.doctors || [],
          offers: data.offers || [],
          blogs: data.blogs || [],
          services: data.services || []
        });
      } catch (error) {
        console.error("Failed to fetch navbar data", error);
      }
    };

    fetchMenuData();
  }, []);

  const mainDepartments = [
    "قسم الجلدية",
    "قسم الاسنان",
    "قسم النساء والولادة",
    "قسم التغذية"
  ];

  const groupedDepartments = {
    main: (menuData.departments || []).filter(dept => mainDepartments.includes(dept.name)),
    general: (menuData.departments || []).filter(dept => !mainDepartments.includes(dept.name))
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
    const route = entity === "doctors" ? `/doctors?departmentId=${id}` : `/${entity}?departmentId=${id}`;
    router.push(route);
    setShowSearch(false);
    setQuery("");
    setResults(null);
  };

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

  const groupedBranches = (menuData.branches || []).reduce((acc, branch) => {
    if (!acc[branch.region_name]) {
      acc[branch.region_name] = [];
    }
    acc[branch.region_name].push(branch);
    return acc;
  }, {});

  const renderEntityDropdown = (items, entityType) => (
    <ul 
      className={`absolute top-full right-0 bg-white shadow-lg rounded-md py-2 hidden group-hover:block z-50 border-t-2 border-[#CBA853] min-w-[200px] ${
        items.length > 8 ? 'max-h-80 overflow-y-auto' : ''
      }`}
    >
      {items.map((item) => (
        <li key={item.department_id}>
          <Link
            href={`/${entityType}?departmentId=${item.department_id}`}
            className="block px-4 py-2 text-black hover:text-[#CBA853] hover:bg-gray-50 transition-colors duration-300 whitespace-nowrap text-right"
            onClick={ClickHandler}
          >
            {normalizeDepartmentName(item.department_name, entityType)}
          </Link>
        </li>
      ))}
    </ul>
  );

  const renderBranchesDropdown = () => (
    <div className="absolute top-full right-0 bg-white shadow-lg rounded-md py-2 hidden group-hover:block z-50 border-t-2 border-[#CBA853] min-w-[200px]">
      {Object.keys(groupedBranches).map((region) => (
        <div key={region} className="relative group/region">
          <div className="block flex justify-between items-center px-4 py-2 text-black hover:text-[#CBA853] hover:bg-gray-50 transition-colors duration-300 whitespace-nowrap text-right cursor-default">
            {region} <FaChevronLeft className="mr-1 text-xs" />
          </div>
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
    <div className="absolute top-full right-0 bg-white shadow-lg rounded-md py-2 hidden group-hover:block z-50 border-t-2 border-[#CBA853] min-w-[200px]">
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
      <div className="relative group/general">
        <div className="px-4 py-2 flex justify-between items-center font-semibold text-black cursor-default">
          الأقسام العامة
          <FaChevronLeft className="mr-1 text-xs" />
        </div>
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
    <div className="relative bg-transparent w-[100vw]">
      <header id="header" dir="rtl" className="relative z-[1111] w-full">
        <div className={`${props.hclass} m-auto w-full ${props.nav ? "bg-[#f6eecd]" : "bg-transparent"}`}>
          <ContactBar />
          <nav className="navigation w-full mx-auto px-2 relative">
            <div className="container-fluid flex flex-row items-center justify-between w-full px-2 md:!px-0 lg:px-8 py-2 mx-auto">
              {/* logo */}
              <div className="flex-shrink-0 order-2 md:order-1">
                <Link href="/" className="navbar-brand">
                  <img
                    src="https://cdn.salla.sa/cdn-cgi/image/fit=scale-down,width=400,height=400,onerror=redirect,format=auto/dEYvd/lBmMUm3zZyt94KtrsYYdL6UrUEOoncu4UJnK9VhR.png"
                    alt="logo"
                    onClick={ClickHandler}
                    className="w-[200px] md:!w-[150px] xl:!w-[250px] xl:mr-10"
                  />
                </Link>
              </div>

              {/* main nav */}
              <div className="hidden md:flex w-full max-w-[800px] lg:mx-4 order-2">
                <ul className="flex justify-around text-sm lg:text-lg xl:text-xl font-medium items-center whitespace-nowrap w-full">
                  <li>
                    <Link href="/" className="py-2 px-2 lg:px3 text-black hover:text-[#CBA853]">الرئيسية</Link>
                  </li>
                                    <li><Link href="/about" className="py-2 px-2 lg:px3 text-black hover:text-[#CBA853]">من نحن</Link></li>

                  <li className="relative group">
                    <Link href="/branches" className="py-2 px-2 lg:px3 text-black hover:text-[#CBA853] flex items-center">
                      الفروع <FaChevronDown className="mr-1 text-xs" />
                    </Link>
                    {menuData.branches.length > 0 && renderBranchesDropdown()}
                  </li>
                  <li className="relative group">
                    <Link href="/departments" className="py-2 px-2 lg:px3 text-black hover:text-[#CBA853] flex items-center">
                      الاقسام <FaChevronDown className="mr-1 text-xs" />
                    </Link>
                    {menuData.departments.length > 0 && renderDepartmentsDropdown()}
                  </li>
                  <li className="relative group">
                    <Link href="/services" className="py-2 px-2 lg:px3 text-black hover:text-[#CBA853] flex items-center">
                      الخدمات <FaChevronDown className="mr-1 text-xs" />
                    </Link>
                    {menuData.services.length > 0 && renderEntityDropdown(menuData.services, "services")}
                  </li>
                  <li className="relative group">
                    <Link href="/doctors" className="py-2 px-2 lg:px3 text-black hover:text-[#CBA853] flex items-center">
                      الاطباء <FaChevronDown className="mr-1 text-xs" />
                    </Link>
                    {menuData.doctors.length > 0 && renderEntityDropdown(menuData.doctors, "doctors")}
                  </li>
                  <li className="relative group">
                    <Link href="/offers" className="py-2 px-2 lg:px3 text-black hover:text-[#CBA853] flex items-center">
                      العروض <FaChevronDown className="mr-1 text-xs" />
                    </Link>
                    {menuData.offers.length > 0 && renderEntityDropdown(menuData.offers, "offers")}
                  </li>
                  <li><Link href="/contact" className="py-2 px-2 lg:px3 text-black hover:text-[#CBA853]">اتصل بنا</Link></li>
                </ul>
              </div>

              {/* search icon */}
              <div className="flex items-center order-1 md:!order-3">
                <div className="bg-white rounded-full p-2">
                  {showSearch ? (
                    <FaTimes onClick={toggleSearch} className="text-[#dec06a] cursor-pointer" size={24} />
                  ) : (
                    <FaSearch onClick={toggleSearch} className="text-[#dec06a] cursor-pointer" size={24} />
                  )}
                </div>
              </div>

              {/* mobile nav */}
              <div className="flex md:hidden order-3 md:order-none">
                <MobileMenu menuData={menuData} />
              </div>
            </div>

            {/* search bar */}
            {showSearch && (
              <div ref={searchRef} className="w-full absolute  px-4 pb-4 bg-transparent">
                <div className="relative w-full max-w-[600px] m-auto">
                  <input
                    type="text"
                    placeholder="ابحث هنا..."
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    className="w-full px-4 py-3 pr-12 border border-[#dec06a] bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#dec06a] transition text-lg"
                  />
                  <FaSearch className="absolute top-1/2 transform -translate-y-1/2 left-4 text-[#dec06a]" size={20} />

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

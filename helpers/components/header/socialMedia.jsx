"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaSnapchat,
  FaTiktok,
  FaSearch,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const ContactBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
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

  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults(null);
      setShowDropdown(false);
      return;
    }
    try {
      const res = await fetch(`https://www.ss.mastersclinics.com/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setResults(data);
      setShowDropdown(true);
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  // Debounced version
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
    setShowDropdown(false);
    setQuery("");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 p-2 md:flex-row md:justify-between bg-white shadow relative" dir="rtl">
      {/* Social Icons */}
      <div className="flex flex-wrap justify-center gap-3">
        {[
          { icon: <FaFacebook size={20} fill="#dec06a" />, href: "https://www.facebook.com/masters.clinicn/" },
          { icon: <FaYoutube size={20} fill="#dec06a" />, href: "https://www.youtube.com/channel/UCAy80cOsDrVqfQLM0HNP_sw" },
          { icon: <FaXTwitter size={20} fill="#dec06a" />, href: "https://x.com/i/flow/login?redirect_after_login=%2Fmasters_clinic" },
          { icon: <FaInstagram size={20} fill="#dec06a" />, href: "https://www.instagram.com/masters.clinics/" },
          { icon: <FaSnapchat size={20} fill="#dec06a" />, href: "https://www.snapchat.com/add/masters.clinic" },
          { icon: <FaTiktok size={20} fill="#dec06a" />, href: "https://www.tiktok.com/@mastersclinics" },
        ].map(({ icon, href }, idx) => (
          <a
            key={idx}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#dec06a] border border-[#dec06a] p-2 rounded-full hover:text-black hover:scale-110 transition-transform duration-200"
          >
            {icon}
          </a>
        ))}
      </div>

      {/* Search Bar with min-width of 300px */}
      <div className="w-full min-w-[300px] md:w-1/3 relative" ref={dropdownRef}>
        <input
          type="text"
          placeholder="ابحث هنا..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          className="w-full px-4 py-2 border border-[#dec06a] rounded-full focus:outline-none focus:ring-2 focus:ring-[#dec06a] transition"
        />
        <FaSearch
          onClick={() => handleSearch(query)}
          className="absolute top-1/2 transform -translate-y-1/2 left-4 text-[#dec06a] cursor-pointer"
          size={18}
          fill="#dec06a"
        />

        {/* Dropdown results */}
        {showDropdown && results && (
          <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-80 overflow-y-auto z-[9999] text-right min-w-[300px]">
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
            ) : (
              <div className="px-4 py-2 text-sm">لا توجد نتائج</div>
            )}
          </div>
        )}
      </div>

      {/* Contact Info - Stacked on mobile, horizontal on md+ */}
      <div className="flex flex-col items-center gap-2 md:flex-row md:items-center">
        <div className="flex flex-col items-center gap-2 sm:gap-4 md:flex-row">
          <div className="flex items-center gap-2 text-gray-800">
            <FaEnvelope size={20} fill="#dec06a" />
            <a href="mailto:info@masters.clinic" className="text-base text-black">info@masters.clinic</a>
          </div>
          <div className="flex items-center gap-2 text-gray-800 md:ml-4">
            <FaPhone size={20} fill="#dec06a" />
            <a href="tel:8002440181" className="text-base text-black">8002440181</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactBar;
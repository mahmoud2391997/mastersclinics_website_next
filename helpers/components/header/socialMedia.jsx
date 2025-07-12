import React from "react";
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

const ContactBar = () => {
  return (
    <div className="flex flex-col items-center gap-4 p-4 md:flex-row md:justify-between bg-white shadow" dir="rtl">
      
      {/* Social Icons */}
      <div className="flex flex-wrap justify-center gap-3">
        {[
          { icon: <FaFacebook size={20} />, href: "https://www.facebook.com/masters.clinicn/" },
          { icon: <FaYoutube size={20} />, href: "https://www.youtube.com/channel/UCAy80cOsDrVqfQLM0HNP_sw" },
          { icon: <FaXTwitter size={20} />, href: "https://x.com/i/flow/login?redirect_after_login=%2Fmasters_clinic" },
          { icon: <FaInstagram size={20} />, href: "https://www.instagram.com/masters.clinics/" },
          { icon: <FaSnapchat size={20} />, href: "https://www.snapchat.com/add/masters.clinic" },
          { icon: <FaTiktok size={20} />, href: "https://www.tiktok.com/@mastersclinics" },
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

      {/* Search Bar */}
      <div className="w-full md:w-1/3 relative">
        <input
          type="text"
          placeholder="ابحث هنا..."
          className="w-full px-4 py-2 border border-[#dec06a] rounded-full focus:outline-none focus:ring-2 focus:ring-[#dec06a] transition"
        />
        <FaSearch
          className="absolute top-1/2 transform -translate-y-1/2 left-4 text-[#dec06a]"
          size={18}
        />
      </div>

      {/* Contact Info */}
      <div className="flex flex-col items-center gap-2 text-center md:flex-row md:items-center md:text-right">
        <div className="flex items-center gap-2 text-gray-800 md:ml-5">
          <FaEnvelope size={20} />
          <a href="mailto:info@masters.clinic" className="text-base text-black">info@masters.clinic</a>
        </div>
        <div className="flex items-center gap-2 text-gray-800 md:ml-5">
          <FaPhone size={20} />
          <a href="tel:8002440181" className="text-base text-black">8002440181</a>
        </div>
      </div>
    </div>
  );
};

export default ContactBar;

"use client";
import React from "react";
import {
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaSnapchat,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const SocialMediaIcons = ({nav}) => {
  return (
<div className={`flex flex-wrap justify-center gap-3  ${nav ? "bg-[#f6eecd]" : "bg-transparent mt-2"}`}>      {[
        { icon: <FaFacebook size={24} />, href: "https://www.facebook.com/masters.clinicn/" },
        { icon: <FaYoutube size={24} />, href: "https://www.youtube.com/channel/UCAy80cOsDrVqfQLM0HNP_sw" },
        { icon: <FaXTwitter size={24} />, href: "https://x.com/i/flow/login?redirect_after_login=%2Fmasters_clinic" },
        { icon: <FaInstagram size={24} />, href: "https://www.instagram.com/masters.clinics/" },
        { icon: <FaSnapchat size={24} />, href: "https://www.snapchat.com/add/masters.clinic" },
        { icon: <FaTiktok size={24} />, href: "https://www.tiktok.com/@mastersclinics" },
      ].map(({ icon, href }, idx) => (
        <a
          key={idx}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-[#dec06a] p-2 rounded-full hover:text-black hover:scale-110 transition-transform duration-200"
          style={{color:"#dec06a"}}
        >
          {icon}
        </a>
      ))}
    </div>
  );
};

export default SocialMediaIcons;
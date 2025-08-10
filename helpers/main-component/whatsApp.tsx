import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
//changing number
const SocialMedia = () => {
  return (
    <div className="fixed bottom-[70px] left-5 z-[999] transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]">
      <a
        href="https://wa.me/9668002440181"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-3 bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white py-3 sm:px-5 rounded-[50px] no-underline font-semibold shadow-[0_6px_20px_rgba(37,211,102,0.3)] animate-[fadeSlideIn_0.6s_ease-out] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] w-auto min-w-12 h-12 overflow-hidden hover:bg-gradient-to-br hover:from-[#1ebe57] hover:to-[#0d7c6e] hover:scale-105 hover:shadow-[0_8px_25px_rgba(37,211,102,0.4)]"
        aria-label="الدردشة على واتساب"
      >
        <FaWhatsapp className="text-2xl flex-shrink-0 animate-[pulse_2s_infinite]" />
     <span className="hidden sm:inline text-sm whitespace-nowrap transition-all duration-300 ease-in-out opacity-100 translate-x-0 group-hover:translate-x-[2px] md:text-[15px]">
  تواصل معنا على واتساب
</span>
      </a>
    </div>
  );
};

export default SocialMedia;

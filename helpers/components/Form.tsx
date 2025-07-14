"use client";

import React from "react";
import SimpleCtaForm from "./FormDetails"; // 👈 import the simple form we just built

const CtafromSection = () => {
  return (
    <section className="relative z-10 my-10 py-5 rounded-xl" id="booking-form">
      <div className="container mx-auto rounded-xl">
<div className="bg-[url('/image.png')] bg-center bg-cover bg-no-repeat rounded-xl overflow-hidden relative py-20 px-[70px] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:content-[''] before:bg-gradient-to-b before:from-[#A58532] before:via-[#CBA853] before:to-[#f0db83] before:z-[-1] md:py-12 md:px-10 sm:py-12 sm:px-4">
          {/* Text Block */}
          <div className="flex items-center justify-center w-full mb-10 -mt-5 md:mt-0 md:mb-10 text-center">
            <div className="max-w-3xl">
              <h2 className="text-white text-[36px] sm:text-[44px] md:text-[50px] lg:text-[60px] xl:text-[70px] font-normal leading-tight mb-4">
                احصلي على موعد فورا
              </h2>
              <p className="text-white text-[16px] sm:text-[18px] md:text-[20px] font-normal leading-relaxed">
                تواصلي معنا الآن! فريقنا متواجد على مدار الساعة للرد على جميع استفساراتك وحجز موعدك بكل سهولة.
              </p>
            </div>
          </div>

          {/* Our simplified form */}
          <SimpleCtaForm />
        </div>
      </div>
    </section>
  );
};

export default CtafromSection;

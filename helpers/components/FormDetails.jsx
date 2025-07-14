"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export const makeAppointment = async (data) => {
  const response = await axios.post(`https://www.ss.mastersclinics.com/appointments`, data);
  return response.data;
};

const SimpleCtaForm = () => {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle"); // "idle" | "success" | "error"
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const submissionData = {
        name: formData.name,
        phone: formData.phone,
        createdAt: new Date().toISOString(),
      };

      console.log("Submitting simple form:", submissionData);

      await makeAppointment(submissionData);

      setSubmitStatus("success");

      setTimeout(() => {
        router.push("/thankyou");
      }, 1500);

      setFormData({ name: "", phone: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setErrorMessage(error?.response?.data?.message || "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full" id="simple-cta-form">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 w-full justify-center"
      >
        {/* Form Fields Row */}
        <div className="w-full flex flex-col md:flex-row-reverse gap-4">
          {/* Name */}
          <div className="w-full md:w-1/2 relative group">
            <label
              htmlFor="name"
              className="block text-white text-sm font-medium mb-1 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200"
            >
              الاسم الكامل*
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              dir="rtl"
              placeholder="الاسم الكامل*"
              required
              disabled={isSubmitting}
              className="w-full text-white text-lg font-normal rounded-xl bg-white/20 py-4 px-5 border border-transparent focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/20 placeholder:text-white/70 transition-all duration-200 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Phone */}
          <div className="w-full md:w-1/2 relative group">
            <label
              htmlFor="phone"
              className="block text-white text-sm font-medium mb-1 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200"
            >
              رقم الهاتف*
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              dir="rtl"
              placeholder="رقم الهاتف*"
              required
              disabled={isSubmitting}
              className="w-full text-white text-lg font-normal rounded-xl bg-white/20 py-4 px-5 border border-transparent focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/20 placeholder:text-white/70 transition-all duration-200 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Submit Button - now below the fields */}
        <div className="w-full md:w-full">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-8 h-[56px] rounded-full text-lg font-semibold text-center leading-normal border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 transition-all duration-200 transform shadow-lg ${
              isSubmitting
                ? "bg-white/50 text-gray-500 cursor-not-allowed"
                : submitStatus === "success"
                ? "bg-green-500 text-white border-green-400"
                : submitStatus === "error"
                ? "bg-red-500 text-white border-red-400"
                : "bg-white text-[#D4AF37] hover:text-[#B7950B] hover:border-white/20 hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl"
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></div>
                جاري الإرسال...
              </div>
            ) : submitStatus === "success" ? (
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                تم الإرسال بنجاح!
              </div>
            ) : submitStatus === "error" ? (
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                حدث خطأ، حاول مرة أخرى
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <span className="ml-2">←</span>
                احجزي الآن
              </div>
            )}
          </button>
        </div>
      </form>

      {submitStatus === "success" && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
          تم إرسال طلبك بنجاح! سنتواصل معك قريباً.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default SimpleCtaForm;
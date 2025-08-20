"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify"; // ✅ make sure you installed & configured react-toastify

export const makeAppointment = async (data) => {
  const response = await axios.post(`https://www.ss.mastersclinics.com/appointments`, data);
  return response.data;
};

export const createStripePayment = async (id) => {
  const numericId = Number(id);
  if (isNaN(numericId)) throw new Error("ID must be a valid number");

  const response = await axios.post("https://www.ss.mastersclinics.com/payment", {
    id: numericId,
  });

  return response.data;
};

const SimpleCtaForm = ({ id, setShowAuthPopup }) => {
  console.log("Appointment ID:", id.id);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    payNow: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  if (name === "payNow" && checked) {
    // ✅ check authentication first
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const clientInfo = localStorage.getItem("clientInfo");

    if (!isAuthenticated || !clientInfo) {
      e.preventDefault(); // Prevent checkbox from being checked
      e.target.checked = false; // Force uncheck the checkbox
      
      toast.error("يجب تسجيل الدخول أولاً");

      // scroll to element with id='scrool'
      const scrollTarget = document.getElementById("scrool");
      if (scrollTarget) {
        scrollTarget.scrollIntoView({ behavior: "smooth" });
      }

      // open auth popup using a more reliable method
      if (typeof setShowAuthPopup === "function") {
        setShowAuthPopup(true);
      } else {
        // Fallback: dispatch a custom event that the header can listen to
        window.dispatchEvent(new CustomEvent('showAuthPopup'));
      }

      return; // 🚫 stop updating checkbox state
    }
  }

  setFormData((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const submissionData = {
        id: id.id,
        name: formData.name,
        phone: formData.phone,
        utmSource: "الموقع الرئيسي",
        createdAt: new Date().toISOString(),
      };

      await makeAppointment(submissionData);

      if (formData.payNow) {
        const paymentData = await createStripePayment(id.id);
        if (paymentData.url) {
          window.location.href = paymentData.url;
          return;
        }
      }

      setSubmitStatus("success");

      setTimeout(() => {
        router.push("/thankyou");
      }, 1500);

      setFormData({ name: "", phone: "", payNow: false });
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error?.response?.data?.message || "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[90vw] mx-auto" id="simple-cta-form">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-6 w-full justify-center"
      >
        {/* Form Fields - Horizontal layout */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="w-full relative group">
            <label
              htmlFor="name"
              className="block text-white text-right text-lg font-medium mb-2 opacity-80 group-focus-within:opacity-100 transition-opacity duration-200"
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
              className="w-full text-white text-lg md:text-xl font-normal rounded-xl bg-white/20 py-4 px-6 border border-transparent focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/20 placeholder:text-white/70 transition-all duration-200 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Phone */}
          <div className="w-full relative group">
            <label
              htmlFor="phone"
              className="block text-white text-right text-lg font-medium mb-2 opacity-80 group-focus-within:opacity-100 transition-opacity duration-200"
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
              className="w-full text-white text-lg md:text-xl font-normal rounded-xl bg-white/20 py-4 px-6 border border-transparent focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/20 placeholder:text-white/70 transition-all duration-200 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Payment Checkbox */}
       <div className="w-full flex flex-row-reverse items-center justify-end gap-3 mt-2">
          <label
            htmlFor="payNow"
            className="text-white text-lg font-medium cursor-pointer flex items-center pt-3"
          >
            الدفع الآن ببطاقة الائتمان
          </label>
          <input
            id="payNow"
            type="checkbox"
            name="payNow"
            checked={formData.payNow}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-5 h-5 rounded focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-gray-800 cursor-pointer"
          />
        </div>
        {/* Submit Button - Full width */}
        <div className="w-full mt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-8 h-[56px] md:h-[60px] rounded-full text-lg md:text-xl font-semibold text-center leading-normal border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 transition-all duration-200 transform shadow-lg ${
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
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-current mr-2"></div>
                {formData.payNow ? "جاري الدفع..." : "جاري الإرسال..."}
              </div>
            ) : submitStatus === "success" ? (
              <div className="flex items-center justify-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                تم الإرسال بنجاح!
              </div>
            ) : submitStatus === "error" ? (
              <div className="flex items-center justify-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                حدث خطأ، حاول مرة أخرى
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <span className="ml-2">←</span>
                {formData.payNow ? "ادفع الآن" : "احجزي الآن"}
              </div>
            )}
          </button>
        </div>
      </form>

      {submitStatus === "success" && !formData.payNow && (
        <div className="mt-6 p-4 md:p-5 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center text-lg md:text-xl">
          تم إرسال طلبك بنجاح! سنتواصل معك قريباً.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mt-6 p-4 md:p-5 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center text-lg md:text-xl">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default SimpleCtaForm;
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

// ✅ API: Create Appointment
export const makeAppointment = async (data) => {
  const response = await axios.post(`https://www.ss.mastersclinics.com/appointments`, data);
  return response.data;
};

// ✅ API: Create Stripe Payment
export const createStripePayment = async (id) => {
  const numericId = Number(id);
  if (isNaN(numericId)) throw new Error("ID must be a valid number");

  const response = await axios.post("https://www.ss.mastersclinics.com/payment", {
    id: numericId,
  });

  return response.data;
};

// ✅ Utility: Get client authentication info consistently
const getAuthInfo = () => {
  // Check both localStorage and sessionStorage for compatibility
  const isAuthenticatedLocal = localStorage.getItem("isAuthenticated") === "true";
  const isAuthenticatedSession = sessionStorage.getItem("isAuthenticated") === "true";
  
  const clientInfoLocal = localStorage.getItem("clientInfo");
  const clientInfoSession = sessionStorage.getItem("clientInfo");
  
  const isAuthenticated = isAuthenticatedLocal || isAuthenticatedSession;
  const clientInfo = clientInfoLocal || clientInfoSession;
  
  return { isAuthenticated, clientInfo };
};

// ✅ Utility: Detect device type
const getDeviceType = () => {
  if (typeof window === 'undefined') return 'unknown';
  
  const userAgent = navigator.userAgent.toLowerCase();
  if (/mobile|android|iphone|ipad|phone/i.test(userAgent)) return 'mobile';
  if (/tablet|ipad/i.test(userAgent)) return 'tablet';
  return 'desktop';
};

// ✅ Utility: Get UTM parameters from URL
const getUtmSource = () => {
  if (typeof window === 'undefined') return 'الموقع الرئيسي';
  
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get('utm_source');
  const utmMedium = urlParams.get('utm_medium');
  const utmCampaign = urlParams.get('utm_campaign');
  
  if (utmSource) {
    return `${utmSource}${utmMedium ? ` - ${utmMedium}` : ''}${utmCampaign ? ` (${utmCampaign})` : ''}`;
  }
  
  return 'الموقع الرئيسي';
};

const SimpleCtaForm = ({ 
  type ,
  id, // This is the componentId from the backend's perspective
  setShowAuthPopup, 
  branch = null,
  doctor = null,
  offer = null,
  device = null,
  landingPageId = null 
}) => {
  console.log("Component ID:", id?.id);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    payNow: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  // ✅ Auto-fill form from storage if authenticated
  useEffect(() => {
    const { isAuthenticated, clientInfo } = getAuthInfo();

    if (isAuthenticated && clientInfo) {
      try {
        const parsed = JSON.parse(clientInfo);
        setFormData((prev) => ({
          ...prev,
          name: `${parsed.first_name || ''} ${parsed.last_name || ''}`.trim(),
          phone: parsed.phone_number || "",
        }));
      } catch (err) {
        console.error("❌ Failed to parse clientInfo", err);
      }
    }
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Check authentication when PayNow is selected
    if (name === "payNow" && checked) {
      const { isAuthenticated } = getAuthInfo();

      if (!isAuthenticated) {
        e.preventDefault();
        e.target.checked = false;

        toast.error("يجب تسجيل الدخول أولاً");

        const scrollTarget = document.getElementById("scrool");
        if (scrollTarget) {
          scrollTarget.scrollIntoView({ behavior: "smooth" });
        }

        if (typeof setShowAuthPopup === "function") {
          setShowAuthPopup(true);
        } else {
          window.dispatchEvent(new CustomEvent("showAuthPopup"));
        }

        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      // Get authenticated client info
      const { isAuthenticated, clientInfo } = getAuthInfo();
      let clientId = null;
      
      if (isAuthenticated && clientInfo) {
        try {
          const parsed = JSON.parse(clientInfo);
          clientId = parsed.id || parsed.client_id || null;
        } catch (err) {
          console.error("Failed to parse clientInfo for clientId", err);
        }
      }

      // Prepare comprehensive submission data
      // Key change: Rename id to componentId to match backend expectation
      const submissionData = {
        entityId: id?.id, // 👈 Changed from 'id' to 'componentId'
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        branch,
        landingPageId,
        utmSource: getUtmSource(),
        doctor,
        offer,
        device: device || getDeviceType(),
        clientId,
        createdAt: new Date().toISOString(),
        type
      };

      console.log("Submitting appointment:", submissionData);

      const result = await makeAppointment(submissionData);
      console.log("Appointment created:", result);

      // Handle payment if requested
      if (formData.payNow) {
        console.log("Processing payment for appointment:", result.appointmentId);
        const paymentData = await createStripePayment(result.appointmentId);
        
        if (paymentData?.url) {
          window.location.href = paymentData.url;
          return;
        } else {
          throw new Error("Payment URL not received");
        }
      }

      setSubmitStatus("success");
      
      // Show success message briefly before redirect
      setTimeout(() => {
        router.push("/thankyou");
      }, 1500);

      // Reset form
      setFormData({ name: "", phone: "", payNow: false });

    } catch (error) {
      console.error("Appointment submission error:", error);
      
      setSubmitStatus("error");
      
      // More specific error messages
      let errorMsg = "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.";
      
      if (error.response?.status === 400) {
        errorMsg = error.response.data?.error || "بيانات غير صحيحة. يرجى التحقق من المعلومات.";
      } else if (error.response?.status === 409) {
        errorMsg = "هذا الموعد محجوز مسبقاً. يرجى المحاولة مرة أخرى.";
      } else if (error.code === 'NETWORK_ERROR' || !error.response) {
        errorMsg = "مشكلة في الاتصال. يرجى التحقق من اتصال الإنترنت.";
      } else if (error.message.includes("Payment")) {
        errorMsg = "حدث خطأ في عملية الدفع. يرجى المحاولة مرة أخرى.";
      }
      
      setErrorMessage(errorMsg);
      
      // Show error toast
      toast.error(errorMsg);
      
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

        {/* Submit Button */}
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

      {/* Success Message */}
      {submitStatus === "success" && !formData.payNow && (
        <div className="mt-6 p-4 md:p-5 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center text-lg md:text-xl">
          تم إرسال طلبك بنجاح! سنتواصل معك قريباً.
        </div>
      )}

      {/* Error Message */}
      {submitStatus === "error" && (
        <div className="mt-6 p-4 md:p-5 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center text-lg md:text-xl">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default SimpleCtaForm;
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

/* =========================
   🔹 LocalStorage Utilities
   ========================= */
export const saveAuth = (user) => {
  if (!user) return;
  localStorage.setItem("isAuthenticated", "true");
  localStorage.setItem("clientInfo", JSON.stringify(user));
};

export const clearAuth = () => {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("clientInfo");
};

export const getAuthInfo = () => {
  const isAuthenticatedLocal = localStorage.getItem("isAuthenticated") === "true";
  const isAuthenticatedSession = sessionStorage.getItem("isAuthenticated") === "true";

  const clientInfoLocal = localStorage.getItem("clientInfo");
  const clientInfoSession = sessionStorage.getItem("clientInfo");

  const isAuthenticated = isAuthenticatedLocal || isAuthenticatedSession;
  const clientInfo = clientInfoLocal || clientInfoSession;

  return { isAuthenticated, clientInfo };
};

/* =========================
   🔹 API Helpers
   ========================= */
export const makeAppointment = async (data) => {
  const cleanData = {
    name: data.name,
    phone: data.phone,
    utmSource: data.utmSource,
    clientId: data.clientId ? Number(data.clientId) : null,
    entityId: data.entityId ? Number(data.entityId) : null,
    type: data.type,
    scheduledAt: data.scheduledAt || null,
    is_authed: data.is_authed || false,
  };

  console.log("🚀 Sending clean appointment data:", cleanData);

  const response = await axios.post(
    "https://www.ss.mastersclinics.com/appointments",
    cleanData
  );
  return response.data;
};

export const createStripePayment = async (id, entityId) => {
  if (!id || !entityId) throw new Error("ID is required");

  const response = await axios.post("https://www.ss.mastersclinics.com/payment", {
    appointmentId: id, entityId
  });

  return response.data;
};

export const checkPaymentStatus = async (sessionId) => {
  const response = await axios.get(`https://www.ss.mastersclinics.com/payment/status/${sessionId}`);
  return response.data;
};

/* =========================
   🔹 UTM Tracking
   ========================= */
const getUtmSource = () => {
  if (typeof window === "undefined") return "الموقع الرئيسي";

  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get("utm_source");
  const utmMedium = urlParams.get("utm_medium");
  const utmCampaign = urlParams.get("utm_campaign");

  if (utmSource) {
    return `${utmSource}${utmMedium ? ` - ${utmMedium}` : ""}${
      utmCampaign ? ` (${utmCampaign})` : ""
    }`;
  }

  return "الموقع الرئيسي";
};

/* =========================
   🔹 Phone Number Validation
   ========================= */
const validatePhoneNumber = (phone) => {
  const cleanedPhone = phone.replace(/\D/g, '');
  return cleanedPhone.length >= 9 && cleanedPhone.length <= 12;
};

/* =========================
   🔹 Payment Status Checker Hook
   ========================= */
const usePaymentStatus = (sessionId) => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sessionId) return;

    const checkStatus = async () => {
      setLoading(true);
      try {
        const result = await checkPaymentStatus(sessionId);
        setStatus(result.paymentStatus);
      } catch (err) {
        setError(err.message);
        console.error("Error checking payment status:", err);
      } finally {
        setLoading(false);
      }
    };

    checkStatus();

    // Check status every 5 seconds if not paid
    const interval = setInterval(() => {
      if (status !== 'paid') {
        checkStatus();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [sessionId, status]);

  return { status, loading, error };
};

/* =========================
   🔹 SimpleCtaForm Component
   ========================= */
const SimpleCtaForm = ({
  type,
  entityId,
  setShowAuthPopup,
  branch = null,
  doctor = null,
  offer = null,
  device = null,
  landingPageId = null,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    payNow: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [paymentSessionId, setPaymentSessionId] = useState(null);
  const router = useRouter();
  
  const { status: paymentStatus } = usePaymentStatus(paymentSessionId);

  // Get service name based on type
  const getServiceName = (doctor, device, offer) => {
    if (doctor) return doctor;
    if (device) return device;
    if (offer) return offer;
    return "خدمات التجميل"; // Default fallback
  };

  // Redirect to thank you page if payment is successful
  useEffect(() => {
    if (paymentStatus === 'paid') {
      toast.success("تم الدفع بنجاح!");
      setTimeout(() => {
        const queryParams = new URLSearchParams({
          session_id: paymentSessionId,
          name: encodeURIComponent(formData.name),
          type: type || "",
          service: encodeURIComponent(getServiceName())
        }).toString();
        
        router.push(`/thankyou?${queryParams}`);
      }, 2000);
    }
  }, [paymentStatus, router]);

  /* ✅ Autofill if logged in */
  useEffect(() => {
    const { isAuthenticated, clientInfo } = getAuthInfo();

    if (isAuthenticated && clientInfo) {
      try {
        const parsed = JSON.parse(clientInfo);
        setFormData((prev) => ({
          ...prev,
          name: `${parsed.first_name || ""} ${parsed.last_name || ""}`.trim(),
          phone: parsed.phone_number || "",
        }));
      } catch (err) {
        console.error("❌ Failed to parse clientInfo", err);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;

    // Clear phone error when user starts typing
    if (name === "phone" && phoneError) {
      setPhoneError("");
    }

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
      [name]: inputType === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");
    setPhoneError("");

    // Validate phone number
    if (!validatePhoneNumber(formData.phone)) {
      setPhoneError("يرجى إدخال رقم هاتف صحيح");
      setIsSubmitting(false);
      return;
    }

    try {
      const { isAuthenticated, clientInfo } = getAuthInfo();
      let clientId = null;

      if (isAuthenticated && clientInfo) {
        try {
          const parsed = JSON.parse(clientInfo);
          clientId = Number(parsed.id) || Number(parsed.client_id) || null;
        } catch (err) {
          console.error("Failed to parse clientInfo for clientId", err);
        }
      }

      const submissionData = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        utmSource: getUtmSource(),
        clientId: clientId,
        entityId: entityId ? Number(entityId) : null,
        type: type,
        scheduledAt: null,
        is_authed: isAuthenticated,
      };

      console.log("📤 Final request payload:", submissionData);

      const result = await makeAppointment(submissionData);
      console.log("✅ Appointment created:", result);

      if (formData.payNow && result?.appointmentId) {
        try {
          const paymentData = await createStripePayment(result.appointmentId, entityId);

          if (paymentData?.url) {
            if (paymentData.sessionId) {
              setPaymentSessionId(paymentData.sessionId);
            }
            window.location.href = paymentData.url;
            return;
          } else {
            throw new Error("Payment URL not received");
          }
        } catch (paymentError) {
          console.error("❌ Payment creation failed:", paymentError);
          setSubmitStatus("partial_success");
          setErrorMessage("تم إنشاء الموعد ولكن فشل إنشاء جلسة الدفع. سنتواصل معك قريباً.");
          toast.error("تم إنشاء الموعد ولكن فشل إنشاء جلسة الدفع.");
          return;
        }
      }

      setSubmitStatus("success");

      /* ✅ هنا ناخد كل الـ attributes من الـ appointment */
      if (result?.appointment) {
        const appointment = result.appointment;

        const queryParams = new URLSearchParams({
          appointment_id: appointment.id,
          name: encodeURIComponent(appointment.name || ""),
          phone: encodeURIComponent(appointment.phone || ""),
          branch: encodeURIComponent(appointment.branch || ""),
          doctor: encodeURIComponent(appointment.doctor || ""),
          offer: encodeURIComponent(appointment.offer || ""),
          device: encodeURIComponent(appointment.device || ""),
          service: encodeURIComponent(getServiceName(appointment.doctor, appointment.device, appointment.offer)),
          type: appointment.type || "",
          utmSource: encodeURIComponent(appointment.utmSource || ""),
          createdAt: appointment.createdAt || "",
          scheduledAt: appointment.scheduledAt || "",
          payment_status: appointment.payment_status || "unpaid",
        }).toString();

        setTimeout(() => {
          router.push(`/thankyou?${queryParams}`);
        }, 1500);
      }

      setFormData({ name: "", phone: "", payNow: false });
    } catch (error) {
      console.error("❌ Appointment submission error:", error);
      setSubmitStatus("error");

      let errorMsg = "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.";
      if (error.response?.status === 400) {
        errorMsg = error.response.data?.error || "بيانات غير صحيحة.";
      } else if (error.response?.status === 409) {
        errorMsg = "هذا الموعد محجوز مسبقاً.";
      } else if (error.code === "NETWORK_ERROR" || !error.response) {
        errorMsg = "مشكلة في الاتصال بالإنترنت.";
      } else if (error.message.includes("Payment")) {
        errorMsg = "فشل في عملية الدفع.";
      }

      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };
  // Show payment processing status if we have a session ID
  if (paymentSessionId) {
    return (
      <div className="w-full max-w-[90vw] mx-auto p-6 bg-white/10 rounded-xl border border-white/20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <h3 className="text-white text-xl font-semibold mb-2">جاري معالجة الدفع</h3>
          <p className="text-white/80">
            {paymentStatus === 'paid' 
              ? "تم الدفع بنجاح! جاري التوجيه إلى صفحة الشكر..." 
              : "يتم الآن معالجة طلب الدفع الخاص بك. قد تستغرق العملية بضع لحظات."}
          </p>
          
          {paymentStatus && (
            <div className="mt-4 p-3 bg-white/20 rounded-lg">
              <span className="text-white font-medium">حالة الدفع: </span>
              <span className={
                paymentStatus === 'paid' ? 'text-green-300' :
                paymentStatus === 'failed' ? 'text-red-300' :
                'text-yellow-300'
              }>
                {paymentStatus === 'paid' ? 'تم الدفع' :
                 paymentStatus === 'pending' ? 'قيد المعالجة' :
                 paymentStatus === 'failed' ? 'فشل الدفع' : 'غير مدفوع'}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[90vw] mx-auto" id="simple-cta-form">
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 w-full justify-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="w-full relative group">
            <label htmlFor="name" className="block text-white text-right text-lg font-medium mb-2 opacity-80">
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
              className="w-full text-white text-lg md:text-xl font-normal rounded-xl bg-white/20 py-4 px-6 border border-transparent focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/20 placeholder:text-white/70 transition-all duration-200 hover:bg-white/30 disabled:opacity-50"
            />
          </div>

          {/* Phone */}
          <div className="w-full relative group">
            <label htmlFor="phone" className="block text-white text-right text-lg font-medium mb-2 opacity-80">
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
              className="w-full text-white text-lg md:text-xl font-normal rounded-xl bg-white/20 py-4 px-6 border border-transparent focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/20 placeholder:text-white/70 transition-all duration-200 hover:bg-white/30 disabled:opacity-50"
            />
            {phoneError && (
              <p className="text-red-300 text-sm mt-1">{phoneError}</p>
            )}
          </div>
        </div>

        {/* Pay Now Checkbox */}
        <div className="w-full flex flex-row-reverse items-center justify-end gap-3 mt-2">
          <label htmlFor="payNow" className="text-white text-lg font-medium cursor-pointer pt-3">
            الدفع الآن ببطاقة الائتمان
          </label>
          <input
            id="payNow"
            type="checkbox"
            name="payNow"
            checked={formData.payNow}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-5 h-5 rounded focus:ring-2 focus:ring-white/30 focus:ring-offset-2 cursor-pointer"
          />
        </div>

        {/* Submit Button */}
        <div className="w-full mt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-8 h-[56px] md:h-[60px] rounded-full text-lg md:text-xl font-semibold border-2 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 transition-all duration-200 shadow-lg ${
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
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-current ml-2"></div>
                {formData.payNow ? "جاري الدفع..." : "جاري الإرسال..."}
              </div>
            ) : submitStatus === "success" ? (
              <div className="flex items-center justify-center">
                <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                تم الإرسال بنجاح!
              </div>
            ) : submitStatus === "error" ? (
              <div className="flex items-center justify-center">
                <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                حدث خطأ، حاول مرة أخرى
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <span className="mr-2">←</span>
                {formData.payNow ? "ادفع الآن" : "احجزي الآن"}
              </div>
            )}
          </button>
        </div>
      </form>

      {/* Success Message */}
      {submitStatus === "success" && !formData.payNow && (
        <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center text-lg">
          تم إرسال طلبك بنجاح! سنتواصل معك قريباً.
        </div>
      )}

      {/* Partial Success Message */}
      {submitStatus === "partial_success" && (
        <div className="mt-6 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg text-center text-lg">
          {errorMessage}
        </div>
      )}

      {/* Error Message */}
      {submitStatus === "error" && (
        <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center text-lg">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default SimpleCtaForm;
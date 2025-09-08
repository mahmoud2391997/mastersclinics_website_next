"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

/* =========================
   🔹 Types
   ========================= */
interface User {
  id?: number;
  client_id?: number;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
}

interface AppointmentData {
  name: string;
  phone: string;
  utmSource: string;
  clientId: number | null;
  entityId: number | null;
  type: string;
  scheduledAt: string | null;
  is_authed: boolean;
  branch?: string;
}

interface BranchOption {
  value: string | number;
  label: string;
}

interface SimpleCtaFormProps {
  type: string;
  entityId: number;
  setShowAuthPopup: (show: boolean) => void;
  availableBranches?: BranchOption[];
  branch?: any;
  doctor?: any;
  offer?: any;
  device?: any;
  landingPageId?: any;
}

interface FormData {
  name: string;
  phone: string;
  payNow: boolean;
  branch: string;
}

interface AuthInfo {
  isAuthenticated: boolean;
  clientInfo: string | null;
}

/* =========================
   🔹 LocalStorage Utilities
   ========================= */
export const saveAuth = (user: User): void => {
  if (!user) return;
  localStorage.setItem("isAuthenticated", "true");
  localStorage.setItem("clientInfo", JSON.stringify(user));
};

export const clearAuth = (): void => {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("clientInfo");
};

export const getAuthInfo = (): AuthInfo => {
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
export const makeAppointment = async (data: AppointmentData): Promise<any> => {
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

export const createStripePayment = async (
  id: number, 
  entityId: number, 
  name: string, 
  type: string, 
  serviceName: string
): Promise<any> => {
  if (!id || !entityId) throw new Error("ID is required");

  const response = await axios.post("https://www.ss.mastersclinics.com/payment", {
    appointmentId: id, 
    entityId,
    customerName: name,
    serviceType: type,
    serviceName: serviceName
  });

  return response.data;
};

export const checkPaymentStatus = async (sessionId: string): Promise<any> => {
  const response = await axios.get(`https://www.ss.mastersclinics.com/payment/status/${sessionId}`);
  return response.data;
};

/* =========================
   🔹 UTM Tracking
   ========================= */
const getUtmSource = (): string => {
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
const validatePhoneNumber = (phone: string): boolean => {
  const cleanedPhone = phone.replace(/\D/g, '');
  return cleanedPhone.length >= 9 && cleanedPhone.length <= 12;
};

/* =========================
   🔹 Payment Status Checker Hook
   ========================= */
const usePaymentStatus = (sessionId: string | null) => {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    const checkStatus = async () => {
      setLoading(true);
      try {
        const result = await checkPaymentStatus(sessionId);
        setStatus(result.paymentStatus);
      } catch (err: any) {
        setError(err.message);
        console.error("Error checking payment status:", err);
      } finally {
        setLoading(false);
      }
    };

    checkStatus();

    const interval = setInterval(() => {
      if (status !== 'paid') {
        checkStatus();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [sessionId, status]);

  return { status, loading, error };
};

// Get service name - FIXED VERSION
const getServiceName = (doctor: any, device: any, offer: any): string => {
  if (doctor && typeof doctor === 'object' && doctor.name) return doctor.name;
  if (doctor && typeof doctor === 'string') return doctor;
  
  if (device && typeof device === 'object' && device.name) return device.name;
  if (device && typeof device === 'string') return device;
  
  if (offer && typeof offer === 'object' && offer.title) return offer.title;
  if (offer && typeof offer === 'string') return offer;
  
  return "خدمات التجميل";
};

/* =========================
   🔹 SimpleCtaForm Component
   ========================= */
const SimpleCtaForm: React.FC<SimpleCtaFormProps> = ({
  type,
  entityId,
  setShowAuthPopup,
  availableBranches = [],
  branch = null,
  doctor = null,
  offer = null,
  device = null,
  landingPageId = null,
}) => {
  console.log("Form type:", type);
  console.log("Entity ID:", entityId);
  console.log("Offer data:", offer);
  console.log("Doctor data:", doctor);
  console.log("Device data:", device);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    payNow: false,
    branch: "",
  });
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<string>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
  const [paymentSessionId, setPaymentSessionId] = useState<string | null>(null);
  const router = useRouter();
  
  const { status: paymentStatus } = usePaymentStatus(paymentSessionId);

  /* ✅ Auto-select branch if only one available */
  useEffect(() => {
    if (type === "device" && availableBranches.length === 1) {
      const onlyBranch = availableBranches[0];
      setSelectedBranch(String(onlyBranch.value));
      setFormData((prev) => ({
        ...prev,
        branch: String(onlyBranch.value),
      }));
    }
  }, [type, availableBranches]);

  // Handle branch change
  const handleBranchChange = (branchId: string) => {
    setSelectedBranch(branchId);
    setFormData(prev => ({
      ...prev,
      branch: branchId
    }));
  };

  // ✅ redirect after payment
  useEffect(() => {
    if (paymentStatus === 'paid') {
      toast.success("تم الدفع بنجاح!");
      setTimeout(() => {
        const queryParams = new URLSearchParams({
          session_id: paymentSessionId || "",
          name: encodeURIComponent(formData.name),
          type: type || "",
          service: encodeURIComponent(getServiceName(doctor, device, offer))
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
        const parsed: User = JSON.parse(clientInfo);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type: inputType } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (name === "phone" && phoneError) {
      setPhoneError("");
    }

    if (name === "payNow" && checked) {
      const { isAuthenticated } = getAuthInfo();

      if (!isAuthenticated) {
        e.preventDefault();
        (e.target as HTMLInputElement).checked = false;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");
    setPhoneError("");

    if (!validatePhoneNumber(formData.phone)) {
      setPhoneError("يرجى إدخال رقم هاتف صحيح");
      setIsSubmitting(false);
      return;
    }

    if (type === "device" && !formData.branch) {
      setErrorMessage("يرجى اختيار الفرع");
      setIsSubmitting(false);
      return;
    }

    try {
      const { isAuthenticated, clientInfo } = getAuthInfo();
      let clientId: number | null = null;

      if (isAuthenticated && clientInfo) {
        try {
          const parsed: User = JSON.parse(clientInfo);
          clientId = Number(parsed.id) || Number(parsed.client_id) || null;
        } catch (err) {
          console.error("Failed to parse clientInfo for clientId", err);
        }
      }

      // FIX: Use the correct entityId based on type
      let finalEntityId: number | null = null;
      
      if (type === "device") {
        // For devices, use the branch ID as entityId
        finalEntityId = Number(formData.branch);
      } else {
        // For offers, doctors, etc., use the original entityId
        finalEntityId = entityId ? Number(entityId) : null;
      }

      const submissionData: AppointmentData = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        utmSource: getUtmSource(),
        clientId: clientId,
        entityId: finalEntityId,
        type: type,
        scheduledAt: null,
        is_authed: isAuthenticated,
        branch: formData.branch
      };

      console.log("📤 Final request payload:", submissionData);
      console.log("Entity type:", type);
      console.log("Entity ID:", finalEntityId);

      const result = await makeAppointment(submissionData);
      console.log("✅ Appointment created:", result);

      // DEBUG: Check what type is returned from backend
      console.log("Backend returned appointment type:", result.appointment?.type);
      console.log("Expected type:", type);

      // If backend is returning wrong type, we can override it temporarily
      if (result.appointment && result.appointment.type !== type) {
        console.warn(`Backend returned type "${result.appointment.type}" but expected "${type}"`);
        // Override the type for frontend display
        result.appointment.type = type;
      }

      if (formData.payNow && result?.appointmentId) {
        try {
          const serviceName = getServiceName(doctor, device, offer);
          
          // FIX: Use the correct ID for payment
          const paymentEntityId = type === "device" ? Number(formData.branch) : entityId;
          
          const paymentData = await createStripePayment(
            result.appointmentId, 
            paymentEntityId, 
            formData.name, 
            type, 
            serviceName
          );

          if (paymentData?.url) {
            if (paymentData.sessionId) {
              setPaymentSessionId(paymentData.sessionId);
            }
            window.location.href = paymentData.url;
            return;
          } else {
            throw new Error("Payment URL not received");
          }
        } catch (paymentError: any) {
          console.error("❌ Payment creation failed:", paymentError);
          setSubmitStatus("partial_success");
          setErrorMessage("تم إنشاء طلب حجز الموعد ولكن فشل إنشاء جلسة الدفع. سنتواصل معك قريباً.");
          toast.error("تم إنشاء طلب حجز الموعد ولكن فشل إنشاء جلسة الدفع. سنتواصل معك قريباً.");
          return;
        }
      }

      setSubmitStatus("success");

      if (result?.appointment) {
        const appointment = result.appointment;

        const queryParams = new URLSearchParams({
          appointment_id: appointment.id,
          name: encodeURIComponent(appointment.name || formData.name),
          phone: encodeURIComponent(appointment.phone || formData.phone),
          branch: encodeURIComponent(appointment.branch || formData.branch || ""),
          doctor: encodeURIComponent(
            type === "doctor" ? getServiceName(doctor, null, null) : ""
          ),
          offer: encodeURIComponent(
            type === "offer" ? getServiceName(null, null, offer) : ""
          ),
          device: encodeURIComponent(
            type === "device" ? getServiceName(null, device, null) : ""
          ),
          service: encodeURIComponent(getServiceName(doctor, device, offer)),
          type: appointment.type || type,
          utmSource: encodeURIComponent(appointment.utmSource || getUtmSource()),
          createdAt: appointment.createdAt || new Date().toISOString(),
          scheduledAt: appointment.scheduledAt || "",
          payment_status: appointment.payment_status || "unpaid",
        }).toString();

        setTimeout(() => {
          router.push(`/thankyou?${queryParams}`);
        }, 1500);
      }

      setFormData({ name: "", phone: "", payNow: false, branch: "" });
      setSelectedBranch("");
    } catch (error: any) {
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

  /* ✅ Show payment processing if in progress */
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

        {/* Branch Selection */}
        {type === "device" && (
          availableBranches.length > 1 ? (
            <div className="w-full md:w-full relative group branch-field">
              <label htmlFor="branch" className="block text-white text-right text-lg font-medium mb-2 opacity-80">
                اختر الفرع*
              </label>
              <div className="relative">
                <select
                  id="branch"
                  name="branch"
                  value={selectedBranch}
                  required
                  onChange={(e) => {
                    const newBranch = e.target.value;
                    console.log("Branch selection changed:", newBranch);
                    handleBranchChange(newBranch);
                  }}
                  dir="rtl"
                  disabled={isSubmitting}
                  className="w-full appearance-none text-white text-lg font-normal rounded-xl bg-white/20 py-4 px-5 border border-transparent focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/20 pr-10 transition-all duration-200 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">{"اختر الفرع*"}</option>
                  {availableBranches.map((branch) => (
                    <option key={branch.value} value={branch.value} className="text-gray-900">
                      {branch.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          ) : availableBranches.length === 1 ? (
            <div className="w-full text-right">
              <p className="text-white text-lg">
                الفرع: <span className="font-semibold">{availableBranches[0].label}</span>
              </p>
            </div>
          ) : null
        )}

        {/* Pay Now Checkbox */}
        {type !== "branch" && (
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
        )}

        {/* Error message */}
        {errorMessage && (
          <p className="text-red-300 text-sm">{errorMessage}</p>
        )}

        {/* Submit */}
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
                {formData.payNow ? "ادفع الآن" : "احجزي الآن"}
                <span className="mr-2">←</span>
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SimpleCtaForm;
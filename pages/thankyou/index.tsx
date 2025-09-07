"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle, Phone, MessageCircle, Home, XCircle, Clock, Calendar, MapPin } from "lucide-react"
import axios from "axios"

declare global {
  interface Window {
    snaptr: (
      action: string,
      event: string,
      params?: Record<string, string | number | boolean>
    ) => void
  }
}

interface PaymentStatusResponse {
  paymentStatus: "paid" | "pending" | "failed"
  customerName?: string
  referenceNumber?: string
}

const safeDecode = (val: string | null): string => {
  if (!val) return ""
  try {
    return decodeURIComponent(decodeURIComponent(val))
  } catch {
    try {
      return decodeURIComponent(val)
    } catch {
      return val
    }
  }
}

const ThankYouPage: React.FC = () => {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [customerData, setCustomerData] = useState<{ name: string; referenceNumber?: string }>({
    name: "عميلنا الكريم",
  })

  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const searchQuery = safeDecode(searchParams.get("query")) || safeDecode(searchParams.get("search")) || "خدمات التجميل"
  const requesterName = safeDecode(searchParams.get("name"))
  const branchName = safeDecode(searchParams.get("branch"))
  const serviceType = searchParams.get("type") || "" // doctor | device | offer | branch
  const serviceName = safeDecode(searchParams.get("service")) || searchQuery

  // map type to arabic label
  const serviceLabel =
    serviceType === "doctor"
      ? "موعد"
      : serviceType === "device"
      ? "جلسة"
      : serviceType === "offer"
      ? "عرض"
      : serviceType === "branch"
      ? "زيارة فرع"
      : "خدمة"

  const [status, setStatus] = useState<"loading" | "paid" | "pending" | "failed" | "no_payment">(
    sessionId ? "loading" : "no_payment"
  )

  useEffect(() => {
    if (requesterName) {
      setCustomerData((prev) => ({
        ...prev,
        name: decodeURIComponent(requesterName),
      }))
    }

    if (!sessionId) {
      setStatus("no_payment")
      return
    }

    const checkStatus = async () => {
      try {
        const res = await axios.get<PaymentStatusResponse>(
          `https://www.ss.mastersclinics.com/payment/status/${sessionId}`
        )
        console.log(res.data)

        setStatus(res.data.paymentStatus as "paid" | "pending" | "failed")

        if (res.data.customerName) {
          setCustomerData((prev) => ({
            ...prev,
            name: res.data.customerName!,
          }))
        }

        if (res.data.referenceNumber) {
          setCustomerData((prev) => ({
            ...prev,
            referenceNumber: res.data.referenceNumber!,
          }))
        }
      } catch {
        setStatus("failed")
      }
    }
    checkStatus()
  }, [sessionId, requesterName])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `مرحباً، أنا ${customerData.name}، لدي استفسار بخصوص ${serviceLabel} (${serviceName}).`
    )
    window.open(`https://wa.me/966555202417?text=${message}`, "_blank")
  }

  const handleCallNow = () => {
    window.open("tel:+8002440181", "_self")
  }

  const renderStatusIcon = () => {
    switch (status) {
      case "loading":
        return (
          <div className="relative inline-block animate-spin text-yellow-500">
            <Clock className="w-12 h-12" />
          </div>
        )
      case "paid":
        return (
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
            <div className="relative bg-gradient-to-r from-green-400 to-green-600 rounded-full p-4">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </div>
        )
      case "pending":
        return (
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-yellow-400/20 rounded-full animate-ping"></div>
            <div className="relative bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full p-4">
              <Clock className="w-12 h-12 text-white" />
            </div>
          </div>
        )
      case "failed":
        return (
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping"></div>
            <div className="relative bg-gradient-to-r from-red-400 to-red-600 rounded-full p-4">
              <XCircle className="w-12 h-12 text-white" />
            </div>
          </div>
        )
      case "no_payment":
        return (
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping"></div>
            <div className="relative bg-gradient-to-r from-blue-400 to-blue-600 rounded-full p-4">
              {serviceType === "branch" ? <MapPin className="w-12 h-12 text-white" /> : <Calendar className="w-12 h-12 text-white" />}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const renderMessage = () => {
    switch (status) {
      case "loading":
        return "جاري التحقق من حالة الدفع..."
      case "paid":
        return `عزيزي/عزيزتي ${customerData.name}، تمت عملية الدفع بنجاح! تم تسجيل ${serviceLabel} (${serviceName}) بنجاح!`
      case "pending":
        return `عزيزي/عزيزتي ${customerData.name}، عملية الدفع قيد المعالجة، يرجى الانتظار...`
      case "failed":
        return `عزيزي/عزيزتي ${customerData.name}، فشلت عملية الدفع. يرجى المحاولة مرة أخرى.`
      case "no_payment":
        if (serviceType === "branch") {
          return `عزيزي/عزيزتي ${customerData.name}، تم تسجيل طلب ${serviceLabel} (${branchName || serviceName}) بنجاح!`
        }
        return `عزيزي/عزيزتي ${customerData.name}، تم تسجيل طلب حجز ${serviceLabel} (${serviceName}) بنجاح!`
      default:
        return ""
    }
  }

  const renderDescription = () => {
    switch (status) {
      case "paid":
        return (
          <p className="text-lg text-gray-600 mb-6 leading-relaxed" dir="rtl">
            شكراً لثقتكم بعيادات ماسترز
            <br />
            سوف يتم التواصل معكم خلال 24 ساعة لتأكيد {serviceLabel}
          </p>
        )
      case "no_payment":
        if (serviceType === "branch") {
          return (
            <p className="text-lg text-gray-600 mb-6 leading-relaxed" dir="rtl">
              سوف يتم التواصل معكم خلال 24 ساعة لتأكيد زيارة الفرع
            </p>
          )
        }
        return (
          <p className="text-lg text-gray-600 mb-6 leading-relaxed" dir="rtl">
            سوف يتم التواصل معكم خلال 24 ساعة لتأكيد الموعد
          </p>
        )
      case "failed":
        return (
          <p className="text-lg text-gray-600 mb-6 leading-relaxed" dir="rtl">
            لم تكتمل عملية الدفع بنجاح
            <br />
            يرجى المحاولة مرة أخرى أو التواصل معنا
          </p>
        )
      case "pending":
        return (
          <p className="text-lg text-gray-600 mb-6 leading-relaxed" dir="rtl">
            يتم حالياً معالجة عملية الدفع الخاصة بـ {serviceLabel} ({serviceName})
            <br />
            قد تستغرق العملية بضع دقائق
          </p>
        )
      default:
        return null
    }
  }

  const renderActionButtons = () => {
    if (["paid", "failed", "no_payment"].includes(status)) {
      return (
        <div className="space-y-4 mt-6">
          <button
            onClick={handleWhatsAppContact}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-3 group"
          >
            <MessageCircle className="w-5 h-5 group-hover:animate-bounce" />
            <span dir="rtl">تواصل عبر الواتساب</span>
          </button>

          <button
            onClick={handleCallNow}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-3 group"
          >
            <Phone className="w-5 h-5 group-hover:animate-pulse" />
            <span dir="rtl">اتصل بنا الآن</span>
          </button>

          <button
            onClick={() => router.push("/")}
            className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B7950B] hover:from-[#B7950B] hover:to-[#D4AF37] text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-3 group"
          >
            <Home className="w-5 h-5 group-hover:animate-bounce" />
            <span dir="rtl">العودة للرئيسية</span>
          </button>
        </div>
      )
    }

    if (status === "pending") {
      return (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
          <p className="text-yellow-700 text-center" dir="rtl">
            يرجى الانتظار حتى اكتمال عملية الدفع
            <br />
            لا تغلق هذه الصفحة
          </p>
        </div>
      )
    }

    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D4AF37]/10 via-white to-[#D4AF37]/5 flex items-center justify-center p-1">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#D4AF37]/5 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/3 rounded-full blur-3xl"></div>
      </div>

      <div
        className={`relative z-10 transition-all duration-1000 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl max-w-lg w-full text-center border border-white/20">
          {/* Success Animation */}
          <div className="mb-8 relative">
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible ? "scale-100 rotate-0" : "scale-0 rotate-180"
              }`}
            >
              {renderStatusIcon()}
            </div>
          </div>

          {/* Logo */}
          <div
            className={`mb-8 transition-all duration-1000 delay-500 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <img
              src="https://cdn.salla.sa/cdn-cgi/image/fit=scale-down,width=400,height=400,onerror=redirect,format=auto/dEYvd/lBmMUm3zZyt94KtrsYYdL6UrUEOoncu4UJnK9VhR.png"
              alt="عيادات ماسترز لوجو"
              className="!w-[323px] h-auto mx-auto drop-shadow-lg"
            />
          </div>

          {/* Main Content */}
          <div
            className={`transition-all duration-1000 delay-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
          >
            <h1
              className="!text-xl md:!text-2xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#B7950B] bg-clip-text text-transparent mb-4"
              dir="rtl"
            >
              {renderMessage()}
            </h1>
            {renderDescription()}
          </div>

          {/* Service Information */}
          {(serviceName || branchName) && (
            <div
              className={`mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200 transition-all duration-1000 delay-800 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <p className="text-sm text-blue-700" dir="rtl">
                {serviceLabel}: <span className="font-bold text-blue-800">{branchName || serviceName}</span>
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div
            className={`transition-all duration-1000 delay-900 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            {renderActionButtons()}
          </div>

          {/* Footer Info */}
          <div
            className={`mt-8 pt-6 border-t border-gray-200/50 transition-all duration-1000 delay-1100 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div className="text-center space-y-2">
              <p
                className="text-2xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#B7950B] bg-clip-text text-transparent"
                dir="rtl"
              >
                عيادات ماسترز
              </p>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#D4AF37]/20 rounded-full"></div>
          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-[#D4AF37]/20 rounded-full"></div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-[#D4AF37]/30 rounded-full animate-float`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default ThankYouPage
"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle, Phone, MessageCircle, Home, XCircle, Clock, Calendar } from "lucide-react"
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

const ThankYouPage: React.FC = () => {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [referenceNumber] = useState(() => `MC${Date.now().toString().slice(-6)}`)
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")

  const [status, setStatus] = useState<"loading" | "paid" | "pending" | "failed" | "no_payment">(
    sessionId ? "loading" : "no_payment"
  )

  useEffect(() => {
    if (!sessionId) {
      setStatus("no_payment")
      return
    }
    
    const checkStatus = async () => {
      try {
        const res = await axios.get(
          `https://www.ss.mastersclinics.com/payment/status/${sessionId}`
        )
        console.log(res.data);
        
        setStatus(res.data.paymentStatus as "paid" | "pending" | "failed")
      } catch {
        setStatus("failed")
      }
    }
    checkStatus()
  }, [sessionId])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(`مرحباً، لدي استفسار بخصوص الحجز رقم: ${referenceNumber}`)
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
              <Calendar className="w-12 h-12 text-white" />
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
        return "تمت عملية دفع المبلغ بنجاح! تم تسجيل طلبكم بنجاح!"
      case "pending":
        return "عملية الدفع قيد المعالجة، يرجى الانتظار..."
      case "failed":
        return "فشلت عملية الدفع. يرجى المحاولة مرة أخرى."
      case "no_payment":
        return "تم تسجيل طلبكم بنجاح!"
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
            سوف يتم التواصل معكم خلال 24 ساعة
          </p>
        )
      case "no_payment":
        return (
          <p className="text-lg text-gray-600 mb-6 leading-relaxed" dir="rtl">
            تم استلام طلب الحجز الخاص بك بنجاح
            <br />
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
            يتم حالياً معالجة طلب الدفع الخاص بك
            <br />
            قد تستغرق العملية بضع دقائق
          </p>
        )
      default:
        return null
    }
  }

  const renderActionButtons = () => {
    // Show action buttons for these statuses
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
    
    // For pending status, show only a waiting message
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
    <div className="min-h-screen bg-gradient-to-br from-[#D4AF37]/10 via-white to-[#D4AF37]/5 flex items-center justify-center p-4">
      <div
        className={`relative z-10 transition-all duration-1000 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl max-w-lg w-full text-center border border-white/20">
          <div className="mb-8">{renderStatusIcon()}</div>

          <div className="mb-8">
            <img
              src="https://cdn.salla.sa/cdn-cgi/image/fit=scale-down,width=400,height=400,onerror=redirect,format=auto/dEYvd/lBmMUm3zZyt94KtrsYYdL6UrUEOoncu4UJnK9VhR.png"
              alt="عيادات ماسترز لوجو"
              className="max-w-[120px] h-auto mx-auto drop-shadow-lg"
            />
          </div>

          <h1
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#B7950B] bg-clip-text text-transparent mb-4"
            dir="rtl"
          >
            {renderMessage()}
          </h1>

          {renderDescription()}
          {renderActionButtons()}

          {/* Reference number for all statuses except loading */}
          {status !== "loading" && (
            <div className="mt-6 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600" dir="rtl">
                رقم المرجع: <span className="font-mono font-bold text-[#D4AF37]">{referenceNumber}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ThankYouPage
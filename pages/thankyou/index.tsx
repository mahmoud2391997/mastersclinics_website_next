"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, Phone, MessageCircle, Home } from "lucide-react"

// Declare snaptr function for TypeScript
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

  // Snap Pixel
  const [pixelReady] = useState(false)

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D4AF37]/10 via-white to-[#D4AF37]/5 flex items-center justify-center p-4">
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
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
                <div className="relative bg-gradient-to-r from-green-400 to-green-600 rounded-full p-4">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
              </div>
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
              className="max-w-[120px] h-auto mx-auto drop-shadow-lg"
            />
          </div>

          {/* Main Content */}
          <div
            className={`transition-all duration-1000 delay-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <h1
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#B7950B] bg-clip-text text-transparent mb-4"
              dir="rtl"
            >
              تم تسجيل طلبكم بنجاح!
            </h1>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed" dir="rtl">
              شكراً لثقتكم بعيادات ماسترز
              <br />
              سوف يتم التواصل معكم خلال 24 ساعة
            </p>
          </div>

          {/* Action Buttons */}
          <div
            className={`space-y-4 transition-all duration-1000 delay-900 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
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

      {/* Debug Info */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 left-4 bg-black text-white p-2 rounded text-xs">
          Snap Pixel Ready: {pixelReady ? "✅" : "❌"}
        </div>
      )}
    </div>
  )
}

export default ThankYouPage

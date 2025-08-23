// components/BackgroundToggle.tsx
"use client"

import { motion } from "framer-motion"

interface BackgroundToggleProps {
  isBackgroundBlack: boolean
  onToggleBackground: () => void
}

export default function BackgroundToggle({ 
  isBackgroundBlack, 
  onToggleBackground 
}: BackgroundToggleProps) {
  return (
    <motion.button
      onClick={onToggleBackground}
      className={`mb-2 w-full px-3 py-2 rounded-full text-sm font-medium transition-colors ${
        isBackgroundBlack 
          ? "bg-black text-white hover:bg-gray-800" 
          : "bg-white text-gray-700 hover:bg-gray-100"
      } shadow-lg border`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {isBackgroundBlack ? "إزالة الخلفية السوداء" : "تفعيل الخلفية السوداء"}
    </motion.button>
  )
}
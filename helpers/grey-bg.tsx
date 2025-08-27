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
      className={`fixed top-20 right-4 z-50 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        isBackgroundBlack 
          ? "bg-black text-white hover:bg-gray-800" 
          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
      } shadow-lg`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isBackgroundBlack ? "إزالة الخلفية السوداء" : "تفعيل الخلفية السوداء"}
    </motion.button>
  )
}
// components/WishlistHeader.tsx
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Heart, Trash2, RefreshCw, User, Stethoscope, Gift } from "lucide-react"
import BackgroundToggle from "@/helpers/grey-bg"

interface WishlistItem {
  id: string
  type: "doctor" | "offer" | "device"
  name?: string
  title?: string
  specialty?: string
  description?: string
  services?: string
  image?: string
  image_url?: string
  priceBefore?: string
  priceAfter?: string
  discountPercentage?: string
  typee?: string
  available_times?: string
  created_at: string
}

interface WishlistHeaderProps {
  isAuthenticated?: boolean
  onAuthRequired?: () => void
  isBackgroundBlack?: boolean
  onToggleBackground?: () => void
}

export default function WishlistHeader({
  isAuthenticated = false,
  onAuthRequired,
  isBackgroundBlack = false,
  onToggleBackground,
}: WishlistHeaderProps) {
  const [wishlistCount, setWishlistCount] = useState(0)
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  // Remove the useEffect that modifies document.body
  // Background control should be handled in the parent component

  const getClientId = () => (typeof window !== "undefined" ? localStorage.getItem("client_id") : null)

  const transformWishlistItem = (item: any): WishlistItem | null => {
    try {
      const baseItem = {
        id: item.item_id?.toString() || item.id?.toString(),
        type: item.item_type || item.type,
        created_at: item.created_at || new Date().toISOString(),
      }
      switch (item.item_type || item.type) {
        case "doctor":
          return {
            ...baseItem,
            name: item.doctor?.name || item.name,
            specialty: item.doctor?.specialty || item.specialty,
            services: item.doctor?.services || item.services,
            image: item.doctor?.image || item.image,
          }
        case "offer":
          return {
            ...baseItem,
            title: item.offer?.title || item.title,
            description: item.offer?.description || item.description,
            priceBefore: item.offer?.price_before || item.priceBefore,
            priceAfter: item.offer?.price_after || item.priceAfter,
            discountPercentage: item.offer?.discount_percentage || item.discountPercentage,
            image: item.offer?.image || item.image,
          }
        case "device":
          return {
            ...baseItem,
            name: item.device?.name || item.name,
            typee: item.device?.type || item.typee,
            available_times: item.device?.available_times || item.available_times,
            image_url: item.device?.image_url || item.image_url,
          }
        default:
          return null
      }
    } catch (error) {
      console.error("Error transforming wishlist item:", error)
      return null
    }
  }

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "/placeholder.svg?height=160&width=300"
    if (imagePath.startsWith("http")) return imagePath
    return `https://www.ss.mastersclinics.com/storage/${imagePath}`
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "doctor":
        return <Stethoscope className="w-4 h-4 text-blue-600" />
      case "offer":
        return <Gift className="w-4 h-4 text-green-600" />
      case "device":
        return <User className="w-4 h-4 text-purple-600" />
      default:
        return <Heart className="w-4 h-4 text-gray-600" />
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("ar-EG")
    } catch {
      return "تاريخ غير صحيح"
    }
  }

  const fetchWishlist = async () => {
    const clientId = getClientId()

    if (!clientId) {
      const unauthWishlist = JSON.parse(localStorage.getItem("unauthWishlist") || "[]")
      const transformedItems = unauthWishlist.map(transformWishlistItem).filter(Boolean) as WishlistItem[]
      setWishlistItems(transformedItems)
      setWishlistCount(transformedItems.length)
      sessionStorage.setItem("wishlist", JSON.stringify(transformedItems))
      sessionStorage.setItem("wishlistCount", transformedItems.length.toString())
      return
    }

    try {
      const response = await fetch(`https://www.ss.mastersclinics.com/api/wishlist/${clientId}`)
      if (!response.ok) throw new Error("Failed to fetch wishlist")
      const data = await response.json()
      const transformedItems = (data.data || []).map(transformWishlistItem).filter(Boolean) as WishlistItem[]
      sessionStorage.setItem("wishlist", JSON.stringify(transformedItems))
      sessionStorage.setItem("wishlistCount", transformedItems.length.toString())
      setWishlistItems(transformedItems)
      setWishlistCount(transformedItems.length)
    } catch (err) {
      console.error("Error fetching wishlist:", err)
    }
  }

  const removeFromWishlist = async (item: WishlistItem) => {
    try {
      const clientId = getClientId()

      if (!clientId) {
        const unauthWishlist = JSON.parse(localStorage.getItem("unauthWishlist") || "[]")
        const updatedWishlist = unauthWishlist.filter((i: any) => !(i.item_id === item.id && i.item_type === item.type))
        localStorage.setItem("unauthWishlist", JSON.stringify(updatedWishlist))
        const transformedItems = updatedWishlist.map(transformWishlistItem).filter(Boolean) as WishlistItem[]
        setWishlistItems(transformedItems)
        setWishlistCount(transformedItems.length)
        window.dispatchEvent(new CustomEvent("wishlistUpdated", { detail: { action: "removed", item } }))
        return
      }

      const updatedWishlist = wishlistItems.filter((i) => i.id !== item.id)
      setWishlistItems(updatedWishlist)
      setWishlistCount(updatedWishlist.length)

      window.dispatchEvent(new CustomEvent("wishlistUpdated", { detail: { action: "removed", item } }))

      const response = await fetch("https://www.ss.mastersclinics.com/api/wishlist", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ client_id: clientId, item_type: item.type, item_id: item.id }),
      })
      if (!response.ok) throw new Error(`Failed with status ${response.status}`)
    } catch (err) {
      console.error("Error removing from wishlist:", err)
    }
  }

  useEffect(() => {
    fetchWishlist()
    const handleWishlistUpdate = (event: CustomEvent) => {
      if (event.detail?.items) {
        setWishlistItems(event.detail.items)
        setWishlistCount(event.detail.count || event.detail.items.length)
      }
    }
    window.addEventListener("wishlistUpdated", handleWishlistUpdate as EventListener)
    return () => {
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate as EventListener)
    }
  }, [])

  const handleWishlistClick = () => {
    if (isAuthenticated) router.push("/profile?tab=wishlist")
    else {
      if (wishlistCount > 0) setIsOpen(true)
      else onAuthRequired?.()
    }
  }

  return (
    <div className="relative">
      {onToggleBackground && (
        <BackgroundToggle 
          isBackgroundBlack={isBackgroundBlack}
          onToggleBackground={onToggleBackground}
        />
      )}

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <motion.div
            onClick={handleWishlistClick}
            className="flex items-center gap-2 bg-white shadow-lg rounded-full p-3 cursor-pointer hover:bg-gray-50 transition-colors relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart className="text-[#dec06a]" size={26} />
            <AnimatePresence>
              {wishlistCount > 0 && (
                <motion.div
                  key="badge"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1"
                >
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </SheetTrigger>

        {!isAuthenticated && (
          <SheetContent side="right" className="z-[1200] w-[400px] sm:w-[540px] overflow-y-auto" dir="rtl">
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SheetHeader>
                <SheetTitle className="flex items-center justify-between">
                  قائمة الأمنيات ({wishlistCount})
                  <Button onClick={fetchWishlist} variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 ml-2" />
                    مزامنة
                  </Button>
                </SheetTitle>
                <SheetDescription>عناصر قائمة الأمنيات الخاصة بك</SheetDescription>
              </SheetHeader>

              <div className="mt-6">
                {wishlistItems.length > 0 ? (
                  <div className="space-y-4">
                    {wishlistItems.map((item) => (
                      <motion.div
                        key={`${item.type}-${item.id}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border rounded-lg p-4 relative hover:shadow-md transition-shadow"
                      >
                        {/* ... rest of your wishlist item rendering code ... */}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">قائمة الأمنيات فارغة</p>
                    <p className="text-sm text-gray-400 mt-2">ابدأ بإضافة العناصر المفضلة لديك</p>
                  </div>
                )}
              </div>

              {!isAuthenticated && wishlistItems.length > 0 && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800 mb-2">سجل دخولك لحفظ قائمة الأمنيات بشكل دائم</p>
                  <Button
                    onClick={() => {
                      setIsOpen(false)
                      onAuthRequired?.()
                    }}
                    className="w-full bg-[#CBA853] hover:bg-[#A58532]"
                  >
                    تسجيل الدخول
                  </Button>
                </div>
              )}
            </motion.div>
          </SheetContent>
        )}
      </Sheet>
    </div>
  )
}
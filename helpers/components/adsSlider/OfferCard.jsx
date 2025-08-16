"use client"

import React, { memo, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getImageUrl } from "@/helpers/hooks/imageUrl"
import { toast } from "react-toastify"

const TourCard = memo(({ 
  image, 
  name, 
  setShowAuthPopup,
  priceBefore, 
  priceAfter, 
  id: item_id, 
  description, 
  branches = [], 
  doctors = [], 
  onSelect 
}) => {
  const router = useRouter()
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [wishlistItems, setWishlistItems] = useState([])
  const [optimisticWishlist, setOptimisticWishlist] = useState(null) // For optimistic UI

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem("isAuthenticated") === "true"
      const userData = JSON.parse(localStorage.getItem("clientInfo"))
      
      setIsAuthenticated(authStatus)
      setUser(userData)
      
      if (authStatus && userData) {
        fetchWishlistItems(userData.id)
      } else {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  useEffect(() => {
    if (wishlistItems.length > 0) {
      const isItemWishlisted = wishlistItems.some(
        item => item.item_id === item_id && item.item_type === "offer"
      )
      setIsWishlisted(isItemWishlisted)
      setOptimisticWishlist(null) // Reset optimistic state when we have actual data
    }
  }, [wishlistItems, item_id])

  const fetchWishlistItems = async (clientId) => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `https://www.ss.mastersclinics.com/api/wishlist/${clientId}`
      )
      
      if (!response.ok) {
        throw new Error("Failed to fetch wishlist items")
      }
      
      const data = await response.json()
      setWishlistItems(data.data || [])
    } catch (err) {
      console.error("Failed to fetch wishlist:", err)
      toast.error("Failed to load wishlist items")
      setWishlistItems([])
    } finally {
      setIsLoading(false)
    }
  }

  const getBranchName = (branchName) => {
    const branchMap = {
      "فرع العوالي": "فرع العوالي",
      "فرع الخالدية": "فرع الخالدية",
      "فرع الشاطئ": "فرع الشاطئ",
      "فرع البساتين": "فرع البساتين",
      "ابحر الشمالية": "ابحر الشمالية",
      "فرع الطائف": "فرع الطائف",
    }
    return branchMap[branchName] || branchName
  }

  const handleOfferSelect = () => {
    if (onSelect) {
      onSelect({
        offer: name,
        priceBefore,
        priceAfter,
        description,
        image,
        branches,
        doctors,
      })
    }
  }

  const handleCardClick = () => {
    router.push(`/offers/${item_id}`)
  }

const toggleWishlist = async (e) => {
  e.stopPropagation()

 if (!isAuthenticated || !user) {
    toast.error("يجب تسجيل الدخول أولاً لإضافة إلى المفضلة");
    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    // Show auth popup (you'll need to pass down the setShowAuthPopup function from Header)
    setShowAuthPopup(true);
    return;
  }
  const newWishlistStatus = !isWishlisted

  // Apply optimistic change immediately
  setIsWishlisted(newWishlistStatus)

  try {
    const endpoint = "https://www.ss.mastersclinics.com/api/wishlist"
    const method = newWishlistStatus ? "POST" : "DELETE"

    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: user.id,
        item_type: "offer",
        item_id
      })
    })

    if (!response.ok) {
      throw new Error(`فشل في ${newWishlistStatus ? "الإضافة" : "الإزالة"} من المفضلة`)
    }

    toast.success(
      newWishlistStatus 
        ? "تمت إضافة العنصر إلى المفضلة" 
        : "تمت إزالة العنصر من المفضلة"
    )
  } catch (err) {
    console.error("Wishlist error:", err)
    toast.error(err.message || "حدث خطأ أثناء تحديث المفضلة")
    // Rollback optimistic change
    setIsWishlisted(!newWishlistStatus)
  }
}


  // Determine the icon state with optimistic updates
  const getWishlistIconState = () => {
    if (isLoading) {
      return "loading"
    }
    if (optimisticWishlist !== null) {
      return optimisticWishlist ? "active" : "inactive"
    }
    return isWishlisted ? "active" : "inactive"
  }

  const wishlistState = getWishlistIconState()

  const imageUrl = typeof image === "string" ? image : "/placeholder.svg"

  return (
    <div 
      className="tour-card group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full relative cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Wishlist Button */}
<button
  onClick={toggleWishlist}
  className="absolute top-3 left-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-gray-100 transition-colors"
  aria-label={isWishlisted ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
>
  {isWishlisted ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#dec06a]" viewBox="0 0 20 20" fill="#dec06a">
      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hover:text-[#dec06a]" fill="none" viewBox="0 0 24 24" stroke="#dec06a">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  )}
</button>


      {/* Rest of the component remains the same */}
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <div className="aspect-w-4 aspect-h-3 w-full">
         <img
            src={getImageUrl(imageUrl) || "/download.png"}
            alt={name}
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.target.src = "/download.png"
            }}
          />
        </div>
        {branches.length > 0 && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
            {branches.length === 1
              ? getBranchName(branches[0].name)
              : `${branches.length} فروع`}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex flex-row-reverse items-start mb-2">
          {/* Price block on right */}
          <div className="flex flex-col items-center ml-3">
            <div className="gradient text-white w-16 h-16 rounded-full flex flex-col items-center justify-center shadow-md p-1">
              <span className="text-xs line-through opacity-80">{priceBefore}</span>
              <span className="font-bold text-white text-sm">{priceAfter}</span>
            </div>
            <div className="mt-1 text-xs text-gray-500">سعر للشخص</div>
          </div>

          {/* Name and description block */}
          <div className="flex-1 text-right">
            <h3 className="font-bold text-xl text-gray-900 mb-1 line-clamp-2">{name}</h3>
            <p className="text-gray-600 text-sm line-clamp-3 mb-2">{description || null}</p>
          </div>
        </div>

        {/* Doctor Information */}
        {doctors.length > 0 && (
          <div className="mb-3 bg-gray-50 rounded-lg p-3 border border-gray-100">
            <p className="text-xs text-gray-500 mb-1">الطبيب المختص:</p>
            <div className="flex items-center gap-2">
              <div className="bg-[#dec06a]/10 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#dec06a]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">{doctors[0].name}</h4>
                <p className="text-xs text-gray-500">{doctors[0].specialty}</p>
              </div>
            </div>
          </div>
        )}

        {/* Branches */}
        {branches.length > 0 && (
          <div className="mb-4 text-right">
            <p className="text-xs text-gray-500 mb-2">متوفر في:</p>
            <div className="flex flex-wrap gap-1 justify-start">
              {branches.map((branch, index) => (
                <span
                  key={index}
                  className="inline-block bg-gradient-to-r from-[#dec06a]/10 to-[#d4b45c]/10 text-[#dec06a] text-xs px-2 py-1 rounded-full border border-[#dec06a]/20"
                >
                  {getBranchName(branch.name)}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto pt-4 border-t border-gray-200">
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleCardClick()
            }}
            className="w-full py-2 gradient text-white font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#dec06a]/50"
            aria-label={`احجز العرض: ${name}`}
            style={{ borderRadius: "12px" }}
          >
            احجزي الآن
          </button>
        </div>
      </div>
    </div>
  )
})

TourCard.displayName = "TourCard"

export default TourCard
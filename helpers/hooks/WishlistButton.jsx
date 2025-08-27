"use client"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { FaHeart, FaRegHeart } from "react-icons/fa"

// ✅ Helper: fetch entity by ID
const fetchEntityData = async (id, type) => {
  try {
    const endpointMap = {
      doctor: `https://www.ss.mastersclinics.com/doctors/${id}`,
      device: `https://www.ss.mastersclinics.com/devices/${id}`,
      offer: `https://www.ss.mastersclinics.com/offers/${id}`,
    }

    const response = await fetch(endpointMap[type])
    if (!response.ok) throw new Error(`Failed to fetch ${type} ${id}`)

    const data = await response.json()
    console.log(data);
    
    return data
  } catch (err) {
    console.error(`[WishlistButton] Failed to fetch ${type} ${id}:`, err)
    return null
  }
}

const WishlistButton = ({
  itemId,
  itemType = "doctor",
  setShowAuthPopup,
  size = "md",
  className = "",
  onWishlistChange = null,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [localWishlistStatus, setLocalWishlistStatus] = useState(null)

  const displayStatus = localWishlistStatus !== null ? localWishlistStatus : isWishlisted

  useEffect(() => {
    const checkAuthAndWishlist = async () => {
      const authStatus = localStorage.getItem("isAuthenticated") === "true"
      const userData = JSON.parse(localStorage.getItem("clientInfo") || "null")
      setIsAuthenticated(authStatus)
      setUser(userData)

      if (authStatus && userData) {
        const cacheKey = `wishlist_${itemId}_${itemType}`
        const cachedResult = sessionStorage.getItem(cacheKey)

        if (cachedResult !== null) {
          setLocalWishlistStatus(cachedResult === "true")
          if (onWishlistChange) onWishlistChange(cachedResult === "true")
        }

        verifyWithServer(userData.id)
      } else {
        checkUnauthenticatedWishlist()
      }
    }

    const checkUnauthenticatedWishlist = () => {
      const unauthWishlist = JSON.parse(localStorage.getItem("unauthWishlist") || "[]")
      const isInWishlist = unauthWishlist.some(
        (item) => item.item_id === itemId && item.item_type === itemType
      )
      setLocalWishlistStatus(isInWishlist)
      if (onWishlistChange) onWishlistChange(isInWishlist)
    }

    const verifyWithServer = async (userId) => {
      const cacheKey = `wishlist_${itemId}_${itemType}`
      const cachedResult = sessionStorage.getItem(cacheKey)
      const cacheTime = sessionStorage.getItem(`${cacheKey}_time`)

      if (cachedResult && cacheTime && Date.now() - parseInt(cacheTime) < 300000) {
        setIsWishlisted(cachedResult === "true")
        return
      }

      try {
        const response = await fetch(
          `https://www.ss.mastersclinics.com/api/wishlist/check/status?client_id=${userId}&item_id=${itemId}&item_type=${itemType}`,
          { headers: { "Cache-Control": "no-cache" } }
        )

        if (response.ok) {
          const data = await response.json()
          const status = data.isWishlisted || false
          setIsWishlisted(status)
          setLocalWishlistStatus(status)

          sessionStorage.setItem(cacheKey, status.toString())
          sessionStorage.setItem(`${cacheKey}_time`, Date.now().toString())

          if (onWishlistChange) onWishlistChange(status)
        }
      } catch (err) {
        console.error(`[WishlistButton] Failed to verify status for ${itemId}:`, err)
      }
    }

    checkAuthAndWishlist()

    const handleAuthChange = () => {
      const authStatus = localStorage.getItem("isAuthenticated") === "true"
      const userData = JSON.parse(localStorage.getItem("clientInfo") || "null")

      if (authStatus !== isAuthenticated) setIsAuthenticated(authStatus)
      if (userData?.id !== user?.id) setUser(userData)

      if (authStatus && userData) {
        syncUnauthenticatedWishlist(userData.id)
      }
    }

    window.addEventListener("storage", handleAuthChange)
    const interval = setInterval(handleAuthChange, 1000)

    return () => {
      window.removeEventListener("storage", handleAuthChange)
      clearInterval(interval)
    }
  }, [itemId, itemType, onWishlistChange])

  const syncUnauthenticatedWishlist = async (userId) => {
    const unauthWishlist = JSON.parse(localStorage.getItem("unauthWishlist") || "[]")
    if (unauthWishlist.length === 0) return

    try {
      for (const item of unauthWishlist) {
        // ✅ Include full entity data when syncing
        await fetch("https://www.ss.mastersclinics.com/api/wishlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            client_id: userId,
            item_type: item.item_type,
            item_id: item.item_id,
            entity: item.entity, // ✅ Include full entity data
          }),
        })
      }

      localStorage.removeItem("unauthWishlist")
    } catch (err) {
      console.error("[WishlistButton] Failed to sync unauthenticated wishlist:", err)
    }
  }

  const toggleWishlist = async (e) => {
    e.stopPropagation()
    e.preventDefault()

    const newStatus = !displayStatus
    setLocalWishlistStatus(newStatus)

    // ✅ Fetch full entity data if adding
    let entityData = null
    if (newStatus) {
      entityData = await fetchEntityData(itemId, itemType)
    }

    if (!isAuthenticated || !user) {
      handleUnauthenticatedWishlist(newStatus, entityData)
      toast.success(
        newStatus
          ? `تمت إضافة ${itemType === "doctor" ? "الطبيب" : itemType === "device" ? "الجهاز" : "العرض"} إلى المفضلة`
          : `تمت الإزالة من المفضلة`,
        { autoClose: 2000 }
      )
      return
    }

    updateLocalWishlist(newStatus, entityData)
    toast.success(
      newStatus
        ? `تمت إضافة ${itemType === "doctor" ? "الطبيب" : itemType === "device" ? "الجهاز" : "العرض"} إلى المفضلة`
        : `تمت الإزالة من المفضلة`,
      { autoClose: 2000 }
    )

    await syncWithServer(newStatus, entityData)
  }

  const handleUnauthenticatedWishlist = (newStatus, entityData = null) => {
    const unauthWishlist = JSON.parse(localStorage.getItem("unauthWishlist") || "[]")
    let updatedWishlist

    if (newStatus) {
      updatedWishlist = [
        ...unauthWishlist,
        {
          item_id: itemId,
          item_type: itemType,
          added_at: new Date().toISOString(),
          entity: entityData, // ✅ Save entity
        },
      ]
    } else {
      updatedWishlist = unauthWishlist.filter(
        (item) => !(item.item_id === itemId && item.item_type === itemType)
      )
    }

    localStorage.setItem("unauthWishlist", JSON.stringify(updatedWishlist))
    sessionStorage.setItem(`wishlist_${itemId}_${itemType}`, newStatus.toString())
    sessionStorage.setItem("wishlistCount", updatedWishlist.length.toString())

    window.dispatchEvent(
      new CustomEvent("wishlistUpdated", {
        detail: {
          count: updatedWishlist.length,
          items: updatedWishlist,
          action: newStatus ? "added" : "removed",
          itemId,
          itemType,
        },
      })
    )

    if (onWishlistChange) onWishlistChange(newStatus)
  }

  const updateLocalWishlist = (newStatus, entityData = null) => {
    const cacheKey = `wishlist_${itemId}_${itemType}`
    sessionStorage.setItem(cacheKey, newStatus.toString())
    sessionStorage.setItem(`${cacheKey}_time`, Date.now().toString())

    const storedWishlist = JSON.parse(sessionStorage.getItem("wishlist") || "[]")
    let updatedWishlist

    if (newStatus) {
      updatedWishlist = [
        ...storedWishlist,
        {
          item_id: itemId,
          item_type: itemType,
          client_id: user?.id,
          created_at: new Date().toISOString(),
          entity: entityData, // ✅ Save entity
        },
      ]
    } else {
      updatedWishlist = storedWishlist.filter(
        (item) => !(item.item_id === itemId && item.item_type === itemType)
      )
    }

    sessionStorage.setItem("wishlist", JSON.stringify(updatedWishlist))
    sessionStorage.setItem("wishlistCount", updatedWishlist.length.toString())

    window.dispatchEvent(
      new CustomEvent("wishlistUpdated", {
        detail: {
          count: updatedWishlist.length,
          items: updatedWishlist,
          action: newStatus ? "added" : "removed",
          itemId,
          itemType,
        },
      })
    )

    if (onWishlistChange) onWishlistChange(newStatus)
  }

  const syncWithServer = async (newStatus, entityData = null) => {
    setIsLoading(true)
    try {
      const endpoint = "https://www.ss.mastersclinics.com/api/wishlist"
      const method = newStatus ? "POST" : "DELETE"

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          client_id: user.id,
          item_type: itemType,
          item_id: itemId,
          entity: entityData, // ✅ Include full entity data
        }),
      })

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

      setIsWishlisted(newStatus)
    } catch (err) {
      setLocalWishlistStatus(!newStatus)
      updateLocalWishlist(!newStatus)
      toast.error(`حدث خطأ أثناء ${newStatus ? "الإضافة إلى" : "الإزالة من"} المفضلة`, {
        autoClose: 2000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const sizeClasses = {
    sm: "text-base p-2",
    md: "text-lg p-2.5",
    lg: "text-xl p-3",
  }

  return (
    <button
      onClick={toggleWishlist}
      className={`${className} ${sizeClasses[size]} bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-gray-100 transition-colors ${
        isLoading ? "opacity-70 cursor-not-allowed" : ""
      }`}
      aria-label={
        displayStatus
          ? `إزالة ${itemType === "doctor" ? "الطبيب" : itemType === "device" ? "الجهاز" : "العرض"} من المفضلة`
          : `إضافة ${itemType === "doctor" ? "الطبيب" : itemType === "device" ? "الجهاز" : "العرض"} إلى المفضلة`
      }
      disabled={isLoading}
    >
      {displayStatus ? (
        <FaHeart className="text-[#dec06a] animate-pulse" />
      ) : (
        <FaRegHeart className="text-gray-400 hover:text-[#dec06a]" />
      )}
    </button>
  )
}

export default WishlistButton
"use client"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { FaHeart, FaRegHeart } from "react-icons/fa"

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
    console.log(`[WishlistButton] Initializing for ${itemType} ${itemId}`)
    
    const checkAuthAndWishlist = async () => {
      const authStatus = localStorage.getItem("isAuthenticated") === "true"
      const userData = JSON.parse(localStorage.getItem("clientInfo") || "null")
      setIsAuthenticated(authStatus)
      setUser(userData)

      if (authStatus && userData) {
        // Check sessionStorage for immediate response
        const cacheKey = `wishlist_${itemId}_${itemType}`
        const cachedResult = sessionStorage.getItem(cacheKey)
        
        if (cachedResult !== null) {
          console.log(`[WishlistButton] Using cached result for ${itemId}: ${cachedResult}`)
          setLocalWishlistStatus(cachedResult === "true")
          if (onWishlistChange) onWishlistChange(cachedResult === "true")
        }

        // Verify with server in background
        verifyWithServer(userData.id)
      } else {
        // Check localStorage for unauthenticated wishlist
        checkUnauthenticatedWishlist()
      }
    }

    const checkUnauthenticatedWishlist = () => {
      const unauthWishlist = JSON.parse(localStorage.getItem("unauthWishlist") || "[]")
      const isInWishlist = unauthWishlist.some(
        item => item.item_id === itemId && item.item_type === itemType
      )
      console.log(`[WishlistButton] Unauthenticated wishlist status for ${itemId}: ${isInWishlist}`)
      setLocalWishlistStatus(isInWishlist)
      if (onWishlistChange) onWishlistChange(isInWishlist)
    }

    const verifyWithServer = async (userId) => {
      const cacheKey = `wishlist_${itemId}_${itemType}`
      const cachedResult = sessionStorage.getItem(cacheKey)
      const cacheTime = sessionStorage.getItem(`${cacheKey}_time`)

      // Use cached result if less than 5 minutes old
      if (cachedResult && cacheTime && Date.now() - parseInt(cacheTime) < 300000) {
        console.log(`[WishlistButton] Using recent cache for ${itemId}`)
        setIsWishlisted(cachedResult === "true")
        return
      }

      try {
        console.log(`[WishlistButton] Fetching server status for ${itemId}`)
        const response = await fetch(
          `https://www.ss.mastersclinics.com/api/wishlist/check/status?client_id=${userId}&item_id=${itemId}&item_type=${itemType}`,
          {
            headers: {
              'Cache-Control': 'no-cache'
            }
          }
        )

        if (response.ok) {
          const data = await response.json()
          console.log(`[WishlistButton] Server response for ${itemId}:`, data)
          
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

    // Listen for authentication changes
    const handleAuthChange = () => {
      const authStatus = localStorage.getItem("isAuthenticated") === "true"
      const userData = JSON.parse(localStorage.getItem("clientInfo") || "null")
      
      // Only update state if it actually changed
      if (authStatus !== isAuthenticated) {
        setIsAuthenticated(authStatus)
      }
      
      if (userData?.id !== user?.id) {
        setUser(userData)
      }

      if (authStatus && userData) {
        // If user just authenticated, sync unauthenticated wishlist
        syncUnauthenticatedWishlist(userData.id)
      }
    }

    // Listen for storage changes (auth status)
    window.addEventListener('storage', handleAuthChange)
    
    // Also check for auth changes within the same tab
    const interval = setInterval(() => {
      const currentAuthStatus = localStorage.getItem("isAuthenticated") === "true"
      const currentUserData = JSON.parse(localStorage.getItem("clientInfo") || "null")
      
      if (currentAuthStatus !== isAuthenticated || currentUserData?.id !== user?.id) {
        handleAuthChange()
      }
    }, 1000)

    return () => {
      window.removeEventListener('storage', handleAuthChange)
      clearInterval(interval)
    }
  }, [itemId, itemType, onWishlistChange]) // Removed isAuthenticated and user from dependencies

  // Sync unauthenticated wishlist with server after login
  const syncUnauthenticatedWishlist = async (userId) => {
    const unauthWishlist = JSON.parse(localStorage.getItem("unauthWishlist") || "[]")
    
    if (unauthWishlist.length === 0) return
    
    console.log(`[WishlistButton] Syncing ${unauthWishlist.length} items from unauthenticated wishlist`)
    
    try {
      for (const item of unauthWishlist) {
        if (item.item_id === itemId && item.item_type === itemType) {
          // This item is in the unauthenticated wishlist, update UI
          setLocalWishlistStatus(true)
        }
        
        await fetch("https://www.ss.mastersclinics.com/api/wishlist", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
            client_id: userId,
            item_type: item.item_type,
            item_id: item.item_id
          })
        })
      }
      
      // Clear unauthenticated wishlist after successful sync
      localStorage.removeItem("unauthWishlist")
      console.log("[WishlistButton] Unauthenticated wishlist synced and cleared")
      
    } catch (err) {
      console.error("[WishlistButton] Failed to sync unauthenticated wishlist:", err)
    }
  }

  const toggleWishlist = async (e) => {
    e.stopPropagation()
    e.preventDefault()

    const newStatus = !displayStatus
    console.log(`[WishlistButton] Toggling ${itemId} to ${newStatus}`)
    
    // Immediate UI update
    setLocalWishlistStatus(newStatus)
    
    if (!isAuthenticated || !user) {
      // Handle unauthenticated user
      handleUnauthenticatedWishlist(newStatus)
      toast.success(
        newStatus
          ? `تمت إضافة ${itemType === "doctor" ? "الطبيب" : "الجهاز"} إلى المفضلة`
          : `تمت إزالة ${itemType === "doctor" ? "الطبيب" : "الجهاز"} من المفضلة`,
        { autoClose: 2000 }
      )
      return
    }

    // Handle authenticated user
    updateLocalWishlist(newStatus)
    toast.success(
      newStatus
        ? `تمت إضافة ${itemType === "doctor" ? "الطبيب" : "الجهاز"} إلى المفضلة`
        : `تمت إزالة ${itemType === "doctor" ? "الطبيب" : "الجهاز"} من المفضلة`,
      { autoClose: 2000 }
    )

    // Sync with server
    await syncWithServer(newStatus)
  }

  const handleUnauthenticatedWishlist = (newStatus) => {
    // Get current unauthenticated wishlist
    const unauthWishlist = JSON.parse(localStorage.getItem("unauthWishlist") || "[]")
    let updatedWishlist

    if (newStatus) {
      // Add to unauthenticated wishlist
      updatedWishlist = [
        ...unauthWishlist,
        {
          item_id: itemId,
          item_type: itemType,
          added_at: new Date().toISOString()
        }
      ]
    } else {
      // Remove from unauthenticated wishlist
      updatedWishlist = unauthWishlist.filter(
        item => !(item.item_id === itemId && item.item_type === itemType)
      )
    }

    // Save updated wishlist to localStorage
    localStorage.setItem("unauthWishlist", JSON.stringify(updatedWishlist))
    
    // Update session storage for UI consistency
    const cacheKey = `wishlist_${itemId}_${itemType}`
    sessionStorage.setItem(cacheKey, newStatus.toString())
    sessionStorage.setItem(`${cacheKey}_time`, Date.now().toString())

    // Update wishlist count in sessionStorage
    sessionStorage.setItem("wishlistCount", updatedWishlist.length.toString())

    // Notify other components
    window.dispatchEvent(
      new CustomEvent("wishlistUpdated", {
        detail: {
          count: updatedWishlist.length,
          items: updatedWishlist,
          action: newStatus ? "added" : "removed",
          itemId,
          itemType
        }
      })
    )

    if (onWishlistChange) {
      onWishlistChange(newStatus)
    }
  }

  const updateLocalWishlist = (newStatus) => {
    const cacheKey = `wishlist_${itemId}_${itemType}`
    sessionStorage.setItem(cacheKey, newStatus.toString())
    sessionStorage.setItem(`${cacheKey}_time`, Date.now().toString())

    // Update wishlist items array
    const storedWishlist = JSON.parse(sessionStorage.getItem("wishlist") || "[]")
    let updatedWishlist

    if (newStatus) {
      updatedWishlist = [
        ...storedWishlist,
        {
          item_id: itemId,
          item_type: itemType,
          client_id: user?.id,
          created_at: new Date().toISOString()
        }
      ]
    } else {
      updatedWishlist = storedWishlist.filter(
        item => !(item.item_id === itemId && item.item_type === itemType)
      )
    }

    sessionStorage.setItem("wishlist", JSON.stringify(updatedWishlist))
    sessionStorage.setItem("wishlistCount", updatedWishlist.length.toString())

    // Notify other components
    window.dispatchEvent(
      new CustomEvent("wishlistUpdated", {
        detail: {
          count: updatedWishlist.length,
          items: updatedWishlist,
          action: newStatus ? "added" : "removed",
          itemId,
          itemType
        }
      })
    )

    if (onWishlistChange) {
      onWishlistChange(newStatus)
    }
  }

  const syncWithServer = async (newStatus) => {
    setIsLoading(true)
    
    try {
      const endpoint = "https://www.ss.mastersclinics.com/api/wishlist"
      const method = newStatus ? "POST" : "DELETE"

      console.log(`[WishlistButton] Syncing ${itemId} with server (${method})`)
      const response = await fetch(endpoint, {
        method,
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          client_id: user.id,
          item_type: itemType,
          item_id: itemId
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Only update server state if successful
      setIsWishlisted(newStatus)
      console.log(`[WishlistButton] Successfully synced ${itemId}`)
    } catch (err) {
      console.error(`[WishlistButton] Sync failed for ${itemId}:`, err)
      
      // Rollback UI
      setLocalWishlistStatus(!newStatus)
      updateLocalWishlist(!newStatus)
      
      toast.error(
        `حدث خطأ أثناء ${newStatus ? "الإضافة إلى" : "الإزالة من"} المفضلة`,
        { autoClose: 2000 }
      )
    } finally {
      setIsLoading(false)
    }
  }

  const sizeClasses = {
    sm: "text-base p-2",
    md: "text-lg p-2.5",
    lg: "text-xl p-3"
  }

  return (
    <button
      onClick={toggleWishlist}
      className={`${className} ${sizeClasses[size]} bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-gray-100 transition-colors ${
        isLoading ? "opacity-70 cursor-not-allowed" : ""
      }`}
      aria-label={
        displayStatus
          ? `إزالة ${itemType === "doctor" ? "الطبيب" : "الجهاز"} من المفضلة`
          : `إضافة ${itemType === "doctor" ? "الطبيب" : "الجهاز"} إلى المفضلة`
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
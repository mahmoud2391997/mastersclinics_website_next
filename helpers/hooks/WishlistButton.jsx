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
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuthAndWishlist = async () => {
      const authStatus = localStorage.getItem("isAuthenticated") === "true";
      const userData = JSON.parse(localStorage.getItem("clientInfo") || "null");
      setIsAuthenticated(authStatus);
      setUser(userData);

      if (authStatus && userData) {
        const storedWishlist = JSON.parse(sessionStorage.getItem("wishlist") || "[]");
        const optimistic = storedWishlist.some((item) => item.item_id === itemId && item.item_type === itemType);
        setIsWishlisted(optimistic);
        if (onWishlistChange) onWishlistChange(optimistic);

        const cacheKey = `wishlist_${itemId}_${itemType}`;
        const cachedResult = sessionStorage.getItem(cacheKey);
        const cacheTime = sessionStorage.getItem(`${cacheKey}_time`);

        if (cachedResult && cacheTime && Date.now() - Number.parseInt(cacheTime) < 300000) {
          const isWishlistedCached = cachedResult === "true";
          setIsWishlisted(isWishlistedCached);
          if (onWishlistChange) onWishlistChange(isWishlistedCached);
          return;
        }

        try {
          const response = await fetch(
            `https://www.ss.mastersclinics.com/api/wishlist/check/status?client_id=${userData.id}&item_id=${itemId}&item_type=${itemType}`,
          );

          if (!response.ok) {
            if (response.status === 429) {
              console.warn("Rate limited, using cached data");
              return;
            }
            throw new Error("Failed to check wishlist status");
          }

          const data = await response.json();
          setIsWishlisted(data.isWishlisted);
          if (onWishlistChange) onWishlistChange(data.isWishlisted);

          sessionStorage.setItem(cacheKey, data.isWishlisted.toString());
          sessionStorage.setItem(`${cacheKey}_time`, Date.now().toString());
        } catch (err) {
          console.error("Failed to verify wishlist status:", err);
        }
      }
    };

    checkAuthAndWishlist();
  }, [itemId, itemType, onWishlistChange]);

const toggleWishlist = async (e) => {
  e.stopPropagation();
  e.preventDefault();

  if (!isAuthenticated || !user) {
    toast.error("يجب تسجيل الدخول أولاً لإضافة إلى المفضلة");
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (setShowAuthPopup) setShowAuthPopup(true);
    return;
  }

  const newWishlistStatus = !isWishlisted;

  // ✅ Optimistic UI update
  setIsWishlisted(newWishlistStatus);
  if (onWishlistChange) onWishlistChange(newWishlistStatus);

  // ✅ Update sessionStorage immediately
  const storedWishlist = JSON.parse(sessionStorage.getItem("wishlist") || "[]");
  let updatedWishlist;
  if (newWishlistStatus) {
    updatedWishlist = [
      ...storedWishlist,
      {
        item_id: itemId,
        item_type: itemType,
        client_id: user.id,
        created_at: new Date().toISOString(),
      },
    ];
  } else {
    updatedWishlist = storedWishlist.filter(
      (item) => !(item.item_id === itemId && item.item_type === itemType)
    );
  }

  sessionStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  sessionStorage.setItem("wishlistCount", updatedWishlist.length.toString());

  const cacheKey = `wishlist_${itemId}_${itemType}`;
  sessionStorage.setItem(cacheKey, newWishlistStatus.toString());
  sessionStorage.setItem(`${cacheKey}_time`, Date.now().toString());

  // ✅ Fire global event immediately
  window.dispatchEvent(
    new CustomEvent("wishlistUpdated", {
      detail: {
        count: updatedWishlist.length,
        items: updatedWishlist,
        action: newWishlistStatus ? "added" : "removed",
        itemId,
        itemType,
      },
    })
  );

  setIsLoading(true);

  try {
    // Call API in background
    const endpoint = "https://www.ss.mastersclinics.com/api/wishlist";
    const method = newWishlistStatus ? "POST" : "DELETE";

    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: user.id,
        item_type: itemType,
        item_id: itemId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to ${newWishlistStatus ? "add to" : "remove from"} wishlist`);
    }

    // ✅ Success toast (delayed to avoid double firing when very fast)
    toast.success(
      newWishlistStatus
        ? `تمت إضافة ${itemType === "doctor" ? "الطبيب" : "العرض"} إلى المفضلة`
        : `تمت إزالة ${itemType === "doctor" ? "الطبيب" : "العرض"} من المفضلة`
    );
  } catch (err) {
    // ❌ Rollback if failed
    console.error("Wishlist error:", err);
    setIsWishlisted(!newWishlistStatus);
    if (onWishlistChange) onWishlistChange(!newWishlistStatus);

    // rollback sessionStorage + event
    sessionStorage.setItem("wishlist", JSON.stringify(storedWishlist));
    sessionStorage.setItem("wishlistCount", storedWishlist.length.toString());
    sessionStorage.setItem(cacheKey, (!newWishlistStatus).toString());
    sessionStorage.setItem(`${cacheKey}_time`, Date.now().toString());

    window.dispatchEvent(
      new CustomEvent("wishlistUpdated", {
        detail: {
          count: storedWishlist.length,
          items: storedWishlist,
          action: newWishlistStatus ? "rollback_add" : "rollback_remove",
          itemId,
          itemType,
        },
      })
    );

    toast.error(err.message || "حدث خطأ أثناء تحديث المفضلة");
  } finally {
    setIsLoading(false);
  }
};

  const sizeClasses = {
    sm: "text-base p-2",
    md: "text-lg p-2.5",
    lg: "text-xl p-3",
  };

  return (
    <button
      onClick={toggleWishlist}
      className={`${className} ${sizeClasses[size]} bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-gray-100 transition-colors ${
        isLoading ? "opacity-70 cursor-not-allowed" : ""
      }`}
      aria-label={
        isWishlisted
          ? `إزالة ${itemType === "doctor" ? "الطبيب" : "العرض"} من المفضلة`
          : `إضافة ${itemType === "doctor" ? "الطبيب" : "العرض"} إلى المفضلة`
      }
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="animate-pulse">
          <FaRegHeart className="text-gray-400" />
        </div>
      ) : isWishlisted ? (
        <FaHeart className="text-[#dec06a]" />
      ) : (
        <FaRegHeart className="text-gray-400 hover:text-[#dec06a]" />
      )}
    </button>
  );
};
export default WishlistButton

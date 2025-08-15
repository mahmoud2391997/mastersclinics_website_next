"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function useWishlist(itemType) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    const userData = JSON.parse(localStorage.getItem("user"));
    setIsAuthenticated(authStatus);
    setUser(userData);

    if (authStatus && userData) {
      fetchWishlistItems(userData.id);
    }
  }, []);

  const fetchWishlistItems = async (clientId) => {
    try {
      setLoading(prev => ({ ...prev, global: true }));
      const response = await fetch(
        `https://www.ss.mastersclinics.com/api/wishlist/${clientId}`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch wishlist items");
      }
      
      const data = await response.json();
      setWishlistItems(data.data || []);
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
      toast.error("Failed to load wishlist items");
      setWishlistItems([]);
    } finally {
      setLoading(prev => ({ ...prev, global: false }));
    }
  };

  const isWishlisted = (itemId) => {
    return wishlistItems.some(
      (item) => item.item_id === itemId && item.item_type === itemType
    );
  };

  const toggleWishlist = async (itemId) => {
    if (!isAuthenticated || !user) {
      toast.error("يجب تسجيل الدخول أولاً لإضافة إلى المفضلة");
      router.push("/auth/login");
      return;
    }

    const isCurrentlyWishlisted = isWishlisted(itemId);
    const newWishlistStatus = !isCurrentlyWishlisted;

    // Optimistic update
    setLoading(prev => ({ ...prev, [itemId]: true }));
    
    try {
      const endpoint = "https://www.ss.mastersclinics.com/api/wishlist";
      const method = newWishlistStatus ? "POST" : "DELETE";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: user.id,
          item_type: itemType,
          item_id: itemId
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to ${newWishlistStatus ? "add to" : "remove from"} wishlist`);
      }

      // Update local state based on the action
      if (newWishlistStatus) {
        setWishlistItems(prev => [
          ...prev,
          { item_id: itemId, item_type: itemType }
        ]);
      } else {
        setWishlistItems(prev => 
          prev.filter(item => !(item.item_id === itemId && item.item_type === itemType))
    )  }

      toast.success(
        newWishlistStatus 
          ? "تمت إضافة العنصر إلى المفضلة" 
          : "تمت إزالة العنصر من المفضلة"
      );
    } catch (err) {
      console.error("Wishlist error:", err);
      toast.error(err.message || "حدث خطأ أثناء تحديث المفضلة");
      // Rollback optimistic update
      setWishlistItems(prev => [...prev]);
    } finally {
      setLoading(prev => ({ ...prev, [itemId]: false }));
    }
  };

  return { isWishlisted, toggleWishlist, loading };
}
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FiX } from "react-icons/fi";
import { Heart, RefreshCw, Loader2, Trash2, Eye, UserCheck, Gift, MonitorSpeaker } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
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
} from "@/components/ui/alert-dialog";
import { getImageUrl } from "@/helpers/hooks/imageUrl";

// Types
interface BaseWishlistItem {
  id: number;
  created_at: string;
  updated_at: string;
  priority: number;
  is_active: number;
}

export interface DoctorWishlistItem extends BaseWishlistItem {
  type: "doctor";
  name: string;
  specialty: string;
  branch_id: number;
  department_id: number;
  services: string;
  image: string | null;
}

export interface OfferWishlistItem extends BaseWishlistItem {
  type: "offer";
  title: string;
  description: string;
  image: string;
  priceBefore: string;
  priceAfter: string;
  discountPercentage: string;
  branches: string;
  services_ids: string;
  doctors_ids: string;
}

export interface DeviceWishlistItem extends BaseWishlistItem {
  type: "device";
  name: string;
  typee: string;
  branches_ids: string;
  available_times: string;
  image_url: string;
}

export type WishlistItem = DoctorWishlistItem | OfferWishlistItem | DeviceWishlistItem;

// Type guards
export const isDoctor = (item: WishlistItem | undefined | null): item is DoctorWishlistItem => 
  item !== undefined && item !== null && item.type === "doctor";

export const isOffer = (item: WishlistItem | undefined | null): item is OfferWishlistItem => 
  item !== undefined && item !== null && item.type === "offer";

export const isDevice = (item: WishlistItem | undefined | null): item is DeviceWishlistItem => 
  item !== undefined && item !== null && item.type === "device";

// Utility functions
const getTypeIcon = (type: string) => {
  switch (type) {
    case "doctor":
      return <UserCheck className="text-[#CBA853] w-5 h-5" />;
    case "offer":
      return <Gift className="text-[#CBA853] w-5 h-5" />;
    case "device":
      return <MonitorSpeaker className="text-[#CBA853] w-5 h-5" />;
    default:
      return <Gift className="text-[#CBA853] w-5 h-5" />;
  }
};

const formatDate = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleDateString("ar-SA", {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
};

const parseAvailableTimes = (availableTimes: string | undefined) => {
  if (!availableTimes || availableTimes === "null") return "";
  
  try {
    const times = JSON.parse(availableTimes);
    return Array.isArray(times) ? times.join(", ") : times;
  } catch {
    return availableTimes.replace(/^"|"$/g, "");
  }
};

// Wishlist Item Component
interface WishlistItemProps {
  item: WishlistItem | undefined | null;
  onRemove: (item: WishlistItem) => void;
  variant?: "card" | "compact";
  showDetailsButton?: boolean;
  className?: string;
}

export function WishlistItemComponent({ 
  item, 
  onRemove, 
  variant = "card", 
  showDetailsButton = true,
  className = "" 
}: WishlistItemProps) {
  const router = useRouter();

  if (!item) {
    return (
      <div className={`border rounded-lg p-4 relative bg-gray-100 ${className}`}>
        <p className="text-gray-500 text-center">عنصر غير متوفر</p>
      </div>
    );
  }

  const handleDetailsClick = () => {
    let route = "";
    switch (item.type) {
      case "doctor":
        route = `/doctors/${item.id}`;
        break;
      case "offer":
        route = `/offers/${item.id}`;
        break;
      case "device":
        route = `/devices/${item.id}`;
        break;
    }
    
    if (route) {
      router.push(route);
    }
  };

  const baseClasses = variant === "compact" 
    ? "border rounded-lg p-3 relative hover:shadow-md transition-shadow bg-white"
    : "border rounded-lg p-4 relative hover:shadow-md transition-shadow bg-white";

  return (
    <div className={`${baseClasses} ${className} `}>
      {/* Header with type icon and delete button */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {getTypeIcon(item.type)}
          <Badge variant="secondary" className="text-xs capitalize">
            {item.type === "doctor" && "طبيب"}
            {item.type === "offer" && "عرض"}
            {item.type === "device" && "جهاز"}
          </Badge>
        </div>

        <DeleteConfirmButton onConfirm={() => onRemove(item)} />

      </div>

      {/* Doctor Item */}
      {isDoctor(item) && (
        <div className="space-y-3">
          <div>
            <h3 className={`font-semibold text-gray-900 ${variant === 'compact' ? 'text-base' : 'text-lg'}`}>
              {item.name}
            </h3>
            <p className="text-[#CBA853] text-sm font-medium">{item.specialty}</p>
          </div>
          
          {item.services && (
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {item.services}
            </p>
          )}
          
          {item.image && variant === "card" && (
            <div className="rounded-lg overflow-hidden">
              <img
                src={getImageUrl(item.image) || "/placeholder.svg"}
                alt={item.name}
                className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.svg";
                }}
              />
            </div>
          )}
          
          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <div className="text-xs text-gray-500">
              أضيف في: {formatDate(item.created_at)}
            </div>
            {showDetailsButton && (
              <Button
                onClick={handleDetailsClick}
                variant="outline"
                size="sm"
                className="text-[#CBA853] border-[#CBA853] hover:bg-[#CBA853] hover:text-white"
              >
                <Eye className="w-3 h-3 ml-1" />
                التفاصيل
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Offer Item */}
      {isOffer(item) && (
        <div className="space-y-3">
          <div>
            <h3 className={`font-semibold text-gray-900 ${variant === 'compact' ? 'text-base' : 'text-lg'}`}>
              {item.title}
            </h3>
            {item.description && (
              <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                {item.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {item.priceBefore && (
              <span className="text-gray-500 line-through text-sm">
                {item.priceBefore} ج.م
              </span>
            )}
            {item.priceAfter && (
              <span className="text-[#CBA853] font-bold text-lg">
                {item.priceAfter} ج.م
              </span>
            )}
            {item.discountPercentage && (
              <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs">
                خصم {item.discountPercentage}%
              </Badge>
            )}
          </div>

          {item.image && variant === "card" && (
            <div className="rounded-lg overflow-hidden">
              <img
                src={getImageUrl(item.image) || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.svg";
                }}
              />
            </div>
          )}

          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <div className="text-xs text-gray-500">
              أضيف في: {formatDate(item.created_at)}
            </div>
            {showDetailsButton && (
              <Button
                onClick={handleDetailsClick}
                variant="outline"
                size="sm"
                className="text-[#CBA853] border-[#CBA853] hover:bg-[#CBA853] hover:text-white"
              >
                <Eye className="w-3 h-3 ml-1" />
                التفاصيل
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Device Item */}
      {isDevice(item) && (
        <div className="space-y-3">
          <div>
            <h3 className={`font-semibold text-gray-900 ${variant === 'compact' ? 'text-base' : 'text-lg'}`}>
              {item.name}
            </h3>
            {item.typee && (
              <p className="text-[#CBA853] text-sm font-medium">{item.typee}</p>
            )}
          </div>

          {parseAvailableTimes(item.available_times) && (
            <div>
              <Label className="text-sm font-medium text-gray-700">مواعيد العمل:</Label>
              <p className="text-sm text-gray-600 mt-1 bg-gray-50 p-2 rounded">
                {parseAvailableTimes(item.available_times)}
              </p>
            </div>
          )}

          {item.image_url && variant === "card" && (
            <div className="rounded-lg overflow-hidden">
              <img
                src={getImageUrl(item.image_url) || "/placeholder.svg"}
                alt={item.name}
                className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.svg";
                }}
              />
            </div>
          )}

          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <div className="text-xs text-gray-500">
              أضيف في: {formatDate(item.created_at)}
            </div>
            {showDetailsButton && (
              <Button
                onClick={handleDetailsClick}
                variant="outline"
                size="sm"
                className="text-[#CBA853] border-[#CBA853] hover:bg-[#CBA853] hover:text-white"
              >
                <Eye className="w-3 h-3 ml-1" />
                التفاصيل
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Enhanced Wishlist Sidebar Component
interface ApiWishlistItem {
  item_id?: string | number;
  id?: string | number;
  item_type?: string;
  type?: string;
  created_at?: string;
  updated_at?: string;
  priority?: number;
  is_active?: number;
  doctor?: any;
  offer?: any;
  device?: any;
  entity?: any; // Added for WishlistButton compatibility
  [key: string]: any;
}

interface WishlistSidebarProps {
  wishlistOpen: boolean;
  setWishlistOpen: (open: boolean) => void;
}

const WishlistSidebar: React.FC<WishlistSidebarProps> = ({
  wishlistOpen,
  setWishlistOpen,
}) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getClientId = useCallback((): string | null => {
    if (typeof window === "undefined") return null;

    try {
      const clientInfo = localStorage.getItem("clientInfo");
      if (clientInfo) {
        const parsed = JSON.parse(clientInfo);
        return parsed.id?.toString();
      }
      return localStorage.getItem("client_id");
    } catch (error) {
      console.error("Error getting client ID:", error);
      return localStorage.getItem("client_id");
    }
  }, []);

  const checkAuthStatus = useCallback((): boolean => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("isAuthenticated") === "true";
  }, []);

  // Enhanced transformWishlistItem function to handle both API and localStorage formats
  const transformWishlistItem = useCallback((item: ApiWishlistItem): WishlistItem | null => {
    try {
      console.log("Transforming item:", item);

      // Handle different ID formats
      let itemId: number;
      if (item.item_id) {
        itemId = typeof item.item_id === 'string' ? parseInt(item.item_id) : item.item_id;
      } else if (item.id) {
        itemId = typeof item.id === 'string' ? parseInt(item.id) : item.id;
      } else {
        console.warn("No valid ID found in item:", item);
        return null;
      }

      // Handle different type formats
      const type = (item.item_type || item.type) as "doctor" | "offer" | "device";
      if (!type) {
        console.warn("No valid type found in item:", item);
        return null;
      }

      const baseItem = {
        id: itemId,
        created_at: item.created_at || item.added_at || new Date().toISOString(),
        updated_at: item.updated_at || new Date().toISOString(),
        priority: item.priority || 1,
        is_active: item.is_active || 1,
      };

      // Handle nested entity data (from WishlistButton) or direct data (from API)
      const entityData = item.entity || item[type] || item;

      switch (type) {
        case "doctor": {
          const doctorData = entityData.data || entityData; // Handle API response wrapper
          return {
            ...baseItem,
            type: "doctor",
            name: doctorData.name || doctorData.doctor_name || "اسم غير محدد",
            specialty: doctorData.specialty || doctorData.doctor_specialty || "تخصص غير محدد",
            branch_id: doctorData.branch_id || 0,
            department_id: doctorData.department_id || 0,
            services: doctorData.services || doctorData.description || "",
            image: doctorData.image || doctorData.doctor_image || null,
          };
        }
        case "offer": {
          const offerData = entityData.data || entityData;
          return {
            ...baseItem,
            type: "offer",
            title: offerData.title || offerData.offer_title || "عرض غير محدد",
            description: offerData.description || offerData.offer_description || "",
            priceBefore: offerData.price_before || offerData.priceBefore || offerData.original_price || "",
            priceAfter: offerData.price_after || offerData.priceAfter || offerData.discounted_price || "",
            discountPercentage: offerData.discount_percentage || offerData.discountPercentage || offerData.discount || "",
            branches: offerData.branches || "",
            services_ids: offerData.services_ids || "",
            doctors_ids: offerData.doctors_ids || "",
            image: offerData.image || offerData.offer_image || "",
          };
        }
        case "device": {
          const deviceData = entityData.data || entityData;
          return {
            ...baseItem,
            type: "device",
            name: deviceData.name || deviceData.device_name || "جهاز غير محدد",
            typee: deviceData.type || deviceData.typee || deviceData.device_type || "",
            branches_ids: deviceData.branches_ids || "",
            available_times: deviceData.available_times || deviceData.working_hours || "",
            image_url: deviceData.image_url || deviceData.device_image || deviceData.image || "",
          };
        }
        default:
          console.warn("Unknown item type:", type);
          return null;
      }
    } catch (error) {
      console.error("Error transforming wishlist item:", error, item);
      return null;
    }
  }, []);

  // Enhanced function to load wishlist from storage
  const loadWishlistFromStorage = useCallback((): WishlistItem[] => {
    try {
      const authStatus = checkAuthStatus();
      
      if (authStatus) {
        // For authenticated users, try sessionStorage first
        const sessionWishlist = sessionStorage.getItem("wishlist");
        if (sessionWishlist) {
          const parsed = JSON.parse(sessionWishlist);
          return Array.isArray(parsed) ? parsed : [];
        }
      } else {
        // For unauthenticated users, load from localStorage
        const unauthWishlist = JSON.parse(localStorage.getItem("unauthWishlist") || "[]");
        return unauthWishlist
          .map(transformWishlistItem)
          .filter((item: WishlistItem | null) => item !== null) as WishlistItem[];
      }
      
      return [];
    } catch (error) {
      console.error("Error loading wishlist from storage:", error);
      return [];
    }
  }, [checkAuthStatus, transformWishlistItem]);

  const fetchWishlist = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      const authStatus = checkAuthStatus();
      setIsAuthenticated(authStatus);

      if (!authStatus) {
        // Handle unauthenticated users
        const unauthItems = loadWishlistFromStorage();
        setWishlistItems(unauthItems);
        updateStorageAndDispatchEvent(unauthItems);
        return;
      }

      const clientId = getClientId();
      if (!clientId) {
        const storageItems = loadWishlistFromStorage();
        setWishlistItems(storageItems);
        updateStorageAndDispatchEvent(storageItems);
        return;
      }

      // Fetch from API for authenticated users
      const response = await fetch(
        `https://www.ss.mastersclinics.com/api/wishlist/${clientId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);
      
      const transformedItems = (data.data || [])
        .map(transformWishlistItem)
        .filter((item: WishlistItem | null) => item !== null) as WishlistItem[];

      setWishlistItems(transformedItems);
      updateStorageAndDispatchEvent(transformedItems);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      
      // Fallback to storage on API error
      const fallbackItems = loadWishlistFromStorage();
      setWishlistItems(fallbackItems);
      updateStorageAndDispatchEvent(fallbackItems);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const updateStorageAndDispatchEvent = useCallback((items: WishlistItem[]) => {
    const authStatus = checkAuthStatus();
    
    if (authStatus) {
      sessionStorage.setItem("wishlist", JSON.stringify(items));
    }
    
    sessionStorage.setItem("wishlistCount", items.length.toString());

    // Dispatch event for other components
    window.dispatchEvent(
      new CustomEvent("wishlistRefreshed", {
        detail: {
          items,
          count: items.length,
        },
      })
    );
  }, [checkAuthStatus]);



  const handleRefresh = useCallback(() => {
    fetchWishlist(true);
  }, []);
const removeFromWishlist = (item: WishlistItem) => {
  try {
    console.log("Attempting to remove item:", item);

    // Get current wishlist
    const raw = localStorage.getItem("unauthWishlist");
    const wishlist = raw ? JSON.parse(raw) : [];

    // Filter out the matching item
    const updatedWishlist = wishlist.filter((i: any) => {
      const matchesId = i.item_id == item.id.toString(); // Loose equality for safety
      const matchesType = i.item_type === item.type;
      return !(matchesId && matchesType);
    });

    // Save back to localStorage
    localStorage.setItem("unauthWishlist", JSON.stringify(updatedWishlist));

    // Update React state
    const transformedItems = updatedWishlist
      .map(transformWishlistItem)
      .filter((i: WishlistItem | null) => i !== null) as WishlistItem[];

    setWishlistItems(transformedItems);

    // Update count in sessionStorage
    sessionStorage.setItem("wishlistCount", transformedItems.length.toString());

    // Dispatch event for other components
    window.dispatchEvent(
      new CustomEvent("wishlistUpdated", {
        detail: {
          action: "removed",
          itemId: item.id,
          itemType: item.type,
          count: transformedItems.length,
          items: transformedItems,
        },
      })
    );

    console.log("✅ Successfully removed from localStorage and state", item);
  } catch (error) {
    console.error("❌ Error removing item from wishlist:", error);
  }
};
  // Enhanced storage event listener
  const handleStorageChange = useCallback((e: StorageEvent) => {
    // Listen for changes in localStorage and sessionStorage
    if (e.key === "unauthWishlist" || 
        e.key === "wishlist" || 
        e.key === "isAuthenticated" || 
        e.key === "clientInfo") {
      
      console.log("Storage change detected:", e.key, e.newValue);
      
      // Small delay to ensure other components have updated
      setTimeout(() => {
        const newItems = loadWishlistFromStorage();
        setWishlistItems(newItems);
        
        // Update auth status
        const newAuthStatus = checkAuthStatus();
        setIsAuthenticated(newAuthStatus);
      }, 100);
    }
  }, [loadWishlistFromStorage, checkAuthStatus]);

  // Enhanced custom event handlers
  const handleWishlistUpdate = useCallback((event: CustomEvent) => {
    const { action, itemId, itemType, items, count } = event.detail;
    
    console.log("Wishlist update event:", event.detail);

    if (action === "removed") {
      setWishlistItems((prev) =>
        prev.filter((item) => !(item.id.toString() === itemId?.toString() && item.type === itemType))
      );
    } else if (action === "added") {
      // For added items, refresh the entire wishlist if sidebar is open
      if (wishlistOpen) {
        setTimeout(() => fetchWishlist(), 100);
      }
    } else if (items && Array.isArray(items)) {
      // Direct items update
      setWishlistItems(items);
    }
  }, [wishlistOpen]);

  const handleWishlistRefresh = useCallback((event: CustomEvent) => {
    const { items } = event.detail;
    if (items && Array.isArray(items)) {
      setWishlistItems(items);
    }
  }, []);

  const handleAuthChange = useCallback(() => {
    const newAuthStatus = checkAuthStatus();
    if (newAuthStatus !== isAuthenticated) {
      setIsAuthenticated(newAuthStatus);
      // Refresh wishlist when auth status changes
      if (wishlistOpen) {
        fetchWishlist();
      }
    }
  }, [isAuthenticated, wishlistOpen, checkAuthStatus]);

  // Effect for initial load and when sidebar opens
  useEffect(() => {
    if (wishlistOpen) {
      // Load from storage immediately for quick display
      const storageItems = loadWishlistFromStorage();
      if (storageItems.length > 0) {
        setWishlistItems(storageItems);
      }
      
      // Then fetch fresh data
      fetchWishlist();
    }
  }, [wishlistOpen, loadWishlistFromStorage]);

  // Effect for all event listeners
  useEffect(() => {
    // Storage change listener (for cross-tab communication)
    window.addEventListener("storage", handleStorageChange);
    
    // Custom wishlist events
    window.addEventListener("wishlistUpdated", handleWishlistUpdate as EventListener);
    window.addEventListener("wishlistRefreshed", handleWishlistRefresh as EventListener);
    
    // Auth change polling (more reliable than storage events for same-tab changes)
    const authCheckInterval = setInterval(handleAuthChange, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate as EventListener);
      window.removeEventListener("wishlistRefreshed", handleWishlistRefresh as EventListener);
      clearInterval(authCheckInterval);
    };
  }, [handleStorageChange, handleWishlistUpdate, handleWishlistRefresh, handleAuthChange]);

  // Effect to sync items when auth status changes
  useEffect(() => {
    const currentAuthStatus = checkAuthStatus();
    if (currentAuthStatus !== isAuthenticated) {
      setIsAuthenticated(currentAuthStatus);
      if (wishlistOpen) {
        fetchWishlist();
      }
    }
  }, []);

  console.log("Current wishlist items:", wishlistItems);
  console.log("Is authenticated:", isAuthenticated);

  return (
    <div
      className={`z-[1111111] fixed top-0 right-0 h-full w-[95%] md:w-[90%] pt-5 lg:w-[70%] xl:w-[60%] bg-white shadow-2xl border-l border-gray-200 p-4 transform transition-transform ${
        wishlistOpen ? "translate-x-0" : "translate-x-full"
      } z-50 overflow-y-auto`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Heart className="text-red-500" size={24} />
          <h2 className="text-xl font-semibold">قائمة المفضلة</h2>
          <span className="text-sm text-gray-500">({wishlistItems.length})</span>
          {!isAuthenticated && (
            <Badge variant="outline" className="text-xs">
              غير مسجل
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing || isLoading}
            className="p-2 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
            title="تحديث القائمة"
          >
            {isRefreshing ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <RefreshCw className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={() => setWishlistOpen(false)}
            className="text-xl hover:text-gray-700 transition-colors"
          >
            <FiX />
          </button>
        </div>
      </div>

      {/* Wishlist Items */}
      <div className="flex flex-col space-y-4 pb-4">
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-[40vh]">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-[#CBA853]" />
              <p className="text-sm text-gray-500">
                جاري تحميل قائمة المفضلة...
              </p>
            </div>
          </div>
        ) : wishlistItems.length > 0 ? (
          wishlistItems.map((item) => (
            <WishlistItemComponent
              key={`${item.type}-${item.id}`}
              item={item}
              onRemove={removeFromWishlist}
              variant="compact"
              className="border-gray-200"
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-[40vh] text-gray-500">
            <Heart className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-lg mb-2">قائمة المفضلة فارغة</p>
            <p className="text-sm text-center">
              ابدأ بإضافة العناصر المفضلة لديك
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {wishlistItems.length > 0 && (
        <div className="border-t pt-4 mt-4 space-y-3 sticky bottom-0 bg-white pb-4">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isRefreshing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            تحديث القائمة
          </button>

          <button
            onClick={() => setWishlistOpen(false)}
            className="w-full bg-[#CBA853] text-white py-2 rounded-md hover:opacity-80 transition-opacity"
          >
            متابعة التصفح
          </button>
        </div>
      )}
    </div>
  );
};
const DeleteConfirmButton = ({ onConfirm }: { onConfirm: () => void }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="relative">
      {showConfirm ? (
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            className="text-xs text-gray-600 hover:text-gray-800 h-8"
            onClick={() => setShowConfirm(false)}
          >
            إلغاء
          </Button>
         <Button
  variant="destructive"
  size="sm"
  className="text-xs h-8 bg-red-600 hover:bg-red-700 text-white"
  onClick={() => {
    onConfirm();
    setShowConfirm(false);
  }}
>
  حذف
</Button>
        </div>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-700 p-1 h-auto"
          onClick={() => setShowConfirm(true)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};
export { WishlistSidebar };
export default WishlistSidebar;
"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import {
  Heart,
  User,
  Phone,
  Mail,
  Edit,
  Save,
  X,
  Trash2,
  Loader2,
  Lock,
  Key,
  RefreshCw,
  Calendar,
  CreditCard,
  Clock,
  MapPin,
  Eye,
  AlertCircle,
} from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserDoctor, faLaptopMedical, faGift } from "@fortawesome/free-solid-svg-icons"
import Navbar from "@/helpers/components/Navbar/Navbar"
import Footer from "@/helpers/components/footer/Footer"
import getImageUrl from "@/utilies/getImageUrl"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "react-toastify"
import Scrollbar from "@/helpers/components/scrollbar/scrollbar"

// Types (unchanged from your original code)
interface ClientInfo {
  id: number
  unique_number: string
  first_name: string
  last_name: string
  phone_number: string
  email: string
  identity_number: string
  created_at: string
}

interface DoctorWishlistItem {
  id: number
  name: string
  specialty: string
  branch_id: number
  department_id: number
  services: string
  image: string | null
  created_at: string
  updated_at: string
  priority: number
  is_active: number
  type: "doctor"
}

interface OfferWishlistItem {
  id: number
  title: string
  description: string
  image: string
  priceBefore: string
  priceAfter: string
  discountPercentage: string
  branches: string
  services_ids: string
  doctors_ids: string
  created_at: string
  updated_at: string
  is_active: number
  priority: number
  type: "offer"
}

interface DeviceWishlistItem {
  id: number
  name: string
  branches_ids: string
  available_times: string
  image_url: string
  is_active: number
  created_at: string
  updated_at: string
  priority: number
  typee: string
  type: "device"
}

type WishlistItem = DoctorWishlistItem | OfferWishlistItem | DeviceWishlistItem

interface ApiWishlistItem {
  id: number
  name?: string
  title?: string
  specialty?: string
  branch_id?: number
  department_id?: number
  services?: string
  image?: string | null
  image_url?: string
  description?: string
  priceBefore?: string
  priceAfter?: string
  discountPercentage?: string
  branches?: string
  services_ids?: string
  doctors_ids?: string
  branches_ids?: string
  available_times?: string
  is_active: number
  priority: number
  created_at: string
  updated_at: string
  typee?: string
}

interface CallLog {
  id: number;
  appointmentId: string;
  timestamp: string;
  status: string;
  notes: string;
  timestamp_str: string;
}

interface Appointment {
  status: "pending" | "confirmed" | "completed" | "cancelled";
  id: number;
  bookingId: string;
  type: "doctor" | "offer" | "device" | "branch";
  scheduledAt: string | null;
  createdAt: string;
  payment_status: string;
  phone?: string;
  branch?: string;
  callLogs?: CallLog[];
  related?: {
    id: number;
    payment_status: string;
    name?: string;
    specialty?: string;
    rating?: number;
    experience?: string;
    services?: string;
    image?: string;
    title?: string;
    description?: string;
    priceBefore?: string;
    priceAfter?: string;
    discountPercentage?: string;
    validUntil?: string;
    type?: string;
    available_times?: string;
    location?: string;
    address?: string;
    google_map_link?: string;
    image_url?: string;
  };
}

interface ProfileResponse {
  client: ClientInfo
  wishlist: ApiWishlistItem[]
  appointments: Appointment[]
}

interface EditState {
  isEditing: boolean
  isLoading: boolean
  errors: Record<string, string>
  tempData: Partial<ClientInfo>
}

interface EmailEditState {
  isEditing: boolean
  newEmail: string
  verificationCode: string
  isSendingCode: boolean
  isVerifying: boolean
  error: string
  codeSent: boolean
}

interface PaymentState {
  isProcessing: boolean
  sessionId: string | null
  appointmentId: number | null
}

// Helper Functions (unchanged from your original code)
const getTypeColor = () => {
  return "border-r-4 border-r-orange-500 bg-gradient-to-l from-orange-50 to-white hover:from-orange-100 dark:from-orange-950/20 dark:to-background dark:hover:from-orange-950/30"
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "doctor":
      return <FontAwesomeIcon icon={faUserDoctor} className="text-[#CBA853] text-xl" />
    case "offer":
      return <FontAwesomeIcon icon={faGift} className="text-[#CBA853] text-xl" />
    case "device":
      return <FontAwesomeIcon icon={faLaptopMedical} className="text-[#CBA853] text-xl" />
    default:
      return <FontAwesomeIcon icon={faGift} className="text-[#CBA853] text-xl" />
  }
}

const formatDate = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleDateString("ar-SA")
  } catch {
    return dateString
  }
}

const formatScheduledDate = (dateString: string | null) => {
  if (!dateString) return null
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

const transformWishlistItem = (item: ApiWishlistItem): WishlistItem | null => {
  if (!item) return null
  if (item.name && item.specialty) {
    return {
      id: item.id,
      name: item.name,
      specialty: item.specialty,
      branch_id: item.branch_id || 0,
      department_id: item.department_id || 0,
      services: item.services || "",
      image: item.image || null,
      created_at: item.created_at,
      updated_at: item.updated_at,
      priority: item.priority,
      is_active: item.is_active,
      type: "doctor",
    } as DoctorWishlistItem
  }
  if (item.title) {
    return {
      id: item.id,
      title: item.title,
      description: item.description || "",
      image: item.image || "",
      priceBefore: item.priceBefore || "",
      priceAfter: item.priceAfter || "",
      discountPercentage: item.discountPercentage || "",
      branches: item.branches || "",
      services_ids: item.services_ids || "",
      doctors_ids: item.doctors_ids || "",
      created_at: item.created_at,
      updated_at: item.updated_at,
      is_active: item.is_active,
      priority: item.priority,
      type: "offer",
    } as OfferWishlistItem
  }
  if (item.name && item.image_url) {
    return {
      id: item.id,
      name: item.name,
      typee: item.typee || "",
      branches_ids: item.branches_ids || "",
      available_times: item.available_times || "",
      image_url: item.image_url,
      is_active: item.is_active,
      created_at: item.created_at,
      updated_at: item.updated_at,
      priority: item.priority,
      type: "device",
    } as DeviceWishlistItem
  }
  return null
}

// Sub-component for Appointment Status Dialog (unchanged)
const AppointmentStatusDialog = ({ appointment, onStatusUpdate }: {
  appointment: Appointment,
  onStatusUpdate: (id: number, status: string) => Promise<boolean>
}) => {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true)
    const success = await onStatusUpdate(appointment.id, newStatus)
    setIsUpdating(false)
    return success
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`transition-colors p-2 h-auto rounded-full ${
            appointment.status === "cancelled"
              ? "text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-950/20"
              : "text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
          }`}
          disabled={isUpdating}
        >
          {isUpdating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent dir="rtl" className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold">
            {appointment.status === "cancelled" ? "إعادة تفعيل الموعد" : "تأكيد الإلغاء"}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base text-gray-600 dark:text-gray-400">
            {appointment.status === "cancelled"
              ? "هل تريد إعادة تفعيل هذا الموعد؟"
              : "هل أنت متأكد من إلغاء هذا الموعد؟ يمكن استعادته لاحقًا."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="font-medium">إلغاء</AlertDialogCancel>
          <AlertDialogAction
            className={`font-medium ${
              appointment.status === "cancelled"
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600"
            }`}
            onClick={async (e) => {
              e.preventDefault()
              const newStatus = appointment.status === "cancelled" ? "pending" : "cancelled"
              await handleStatusChange(newStatus)
            }}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : null}
            {appointment.status === "cancelled" ? "نعم، إعادة التفعيل" : "نعم، إلغاء الموعد"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

// Main Component
export default function ProfilePage() {
  const [clientInfo, setClientInfo] = useState<ClientInfo | null>(null)
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  console.log(appointments);
  
  const [editState, setEditState] = useState<EditState>({
    isEditing: false,
    isLoading: false,
    errors: {},
    tempData: {},
  })
  const [emailEditState, setEmailEditState] = useState<EmailEditState>({
    isEditing: false,
    newEmail: "",
    verificationCode: "",
    isSendingCode: false,
    isVerifying: false,
    error: "",
    codeSent: false,
  })
  const [paymentState, setPaymentState] = useState<PaymentState>({
    isProcessing: false,
    sessionId: null,
    appointmentId: null,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [lastRequestTime, setLastRequestTime] = useState<number>(0)
  const searchParams = useSearchParams()
  const router = useRouter()
  // Focus handling for notifications deep-link
  useEffect(() => {
    const focusId = searchParams.get("focus")
    if (focusId) {
      // Wait a tick to ensure appointments are rendered
      setTimeout(() => {
        const el = document.querySelector(`[data-appointment-id="${focusId}"]`)
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" })
          el.classList.add("ring-2", "ring-[#CBA853]", "ring-offset-2")
          setTimeout(() => {
            el.classList.remove("ring-2", "ring-[#CBA853]", "ring-offset-2")
          }, 3000)
        }
      }, 300)
    }
  }, [searchParams, appointments])

  const activeTab = searchParams.get("tab") || "info"

  const handleTabChange = (tab: string) => {
    if (tab === "info") {
      router.push("/profile#")
    } else {
      router.push(`/profile?tab=${tab}#`)
    }
  }

  const getClientId = (): number | null => {
    try {
      const clientInfo = localStorage.getItem("clientInfo")
      if (!clientInfo) return null
      const parsed = JSON.parse(clientInfo)
      return parsed.id || null
    } catch (e) {
      console.error("Error parsing clientInfo:", e)
      return null
    }
  }

  const validateFields = (data: Partial<ClientInfo>) => {
    const errors: Record<string, string> = {}
    if (data.first_name !== undefined && !data.first_name.trim()) {
      errors.first_name = "الاسم الأول مطلوب"
    }
    if (data.last_name !== undefined && !data.last_name.trim()) {
      errors.last_name = "الاسم الأخير مطلوب"
    }
    if (data.phone_number !== undefined) {
      if (!data.phone_number.trim()) {
        errors.phone_number = "رقم الهاتف مطلوب"
      } else if (!/^[0-9+\-\s()]+$/.test(data.phone_number)) {
        errors.phone_number = "رقم الهاتف غير صحيح"
      }
    }
    if (data.identity_number !== undefined) {
      if (!data.identity_number.trim()) {
        errors.identity_number = "رقم الهوية مطلوب"
      } else if (!/^\d{10,14}$/.test(data.identity_number.replace(/\s/g, ""))) {
        errors.identity_number = "رقم الهوية يجب أن يكون من 10 إلى 14 رقم"
      }
    }
    return errors
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Rate limiting helper
  const canMakeRequest = () => {
    const now = Date.now()
    const timeSinceLastRequest = now - lastRequestTime
    // Only allow 1 request per 2 seconds to avoid rate limiting
    return timeSinceLastRequest > 2000
  }

  const fetchProfileData = async () => {
    try {
      // Check rate limiting
      if (!canMakeRequest()) {
        console.log("Rate limiting - skipping request")
        return
      }
      
      setLoading(true)
      setError(null)
      const clientId = getClientId()
      if (!clientId) {
        console.error("Authentication failed - missing clientId")
        router.push("/")
        return
      }
      
      setLastRequestTime(Date.now())
      
      const response = await fetch(`https://www.ss.mastersclinics.com/api/client-auth/profile/${clientId}`, {
        method: "GET",
        headers: {
          'Cache-Control': 'no-cache',
        }
      })
console.log(response);

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("clientInfo")
          router.push("/")
          return
        }
        
        if (response.status === 429) {
          setError("تم تجاوز عدد الطلبات المسموح بها. يرجى الانتظار قليلاً ثم المحاولة مرة أخرى.")
          return
        }
        
        const errorText = await response.text()
        throw new Error(`API Error: ${response.status} - ${errorText}`)
      }

      const data: ProfileResponse = await response.json()
      console.log(data);

      if (!data || !data.client) {
        throw new Error("Invalid response format: missing client data")
      }

      setAppointments(data.appointments || [])
      setClientInfo(data.client)
      localStorage.setItem("clientInfo", JSON.stringify(data.client))

      const transformedWishlist = (data.wishlist || [])
        .map(transformWishlistItem)
        .filter((item): item is WishlistItem => item !== null)

      setWishlist(transformedWishlist)
      sessionStorage.setItem("wishlist", JSON.stringify(transformedWishlist))
      sessionStorage.setItem("wishlistCount", transformedWishlist.length.toString())
    } catch (err) {
      console.error("Failed to load profile:", err)
      setError(err instanceof Error ? err.message : "Unknown error occurred")
      if (retryCount < 3) {
        setTimeout(() => setRetryCount((c) => c + 1), 2000)
      }
    } finally {
      setLoading(false)
    }
  }

  const refreshWishlistData = async () => {
    try {
      const clientId = getClientId()
      if (!clientId) return

      // Check rate limiting
      if (!canMakeRequest()) {
        console.log("Rate limiting - skipping wishlist refresh")
        return
      }
      
      setLastRequestTime(Date.now())
      
      const response = await fetch(`https://www.ss.mastersclinics.com/api/wishlist/${clientId}`)
      if (response.ok) {
        const data = await response.json()
        const transformedWishlist = (data.data || [])
          .map(transformWishlistItem)
          .filter((item: WishlistItem) => item !== null)

        setWishlist(transformedWishlist)
        sessionStorage.setItem("wishlist", JSON.stringify(transformedWishlist))
        sessionStorage.setItem("wishlistCount", transformedWishlist.length.toString())

        // Dispatch event to update header
        window.dispatchEvent(
          new CustomEvent("wishlistRefreshed", {
            detail: {
              items: transformedWishlist,
              count: transformedWishlist.length,
            },
          }),
        )
      }
    } catch (err) {
      console.error("Error refreshing wishlist:", err)
    }
  }

  const removeFromWishlist = async (item: WishlistItem) => {
    try {
      const clientId = getClientId()
      if (!clientId) throw new Error("Authentication required")

      // Optimistic update
      const updatedWishlist = wishlist.filter((i) => i.id !== item.id)
      setWishlist(updatedWishlist)

      // Dispatch event for other components
      window.dispatchEvent(
        new CustomEvent("wishlistUpdated", {
          detail: {
            action: "removed",
            itemId: item.id,
            itemType: item.type,
            items: updatedWishlist,
            count: updatedWishlist.length,
          },
        }),
      )

      // Check rate limiting
      if (!canMakeRequest()) {
        toast.info("جاري معالجة طلبات أخرى، سيتم إكمال العملية قريباً")
        return
      }
      
      setLastRequestTime(Date.now())
      
      const response = await fetch("https://www.ss.mastersclinics.com/api/wishlist", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          item_type: item.type,
          item_id: item.id,
        }),
      })

      if (!response.ok) {
        // If the request fails, revert the optimistic update
        setWishlist(wishlist)
        throw new Error(`Failed with status ${response.status}`)
      }

      toast.success(
        `تمت إزالة ${item.type === "doctor" ? "الطبيب" : item.type === "offer" ? "العرض" : "الجهاز"} من المفضلة`,
      )
    } catch (err) {
      console.error("Remove failed:", err)
      toast.error("فشلت عملية الإزالة. يرجى المحاولة مرة أخرى")
      fetchProfileData()
    }
  }

  const updateAppointmentStatus = async (appointmentId: number, newStatus: string) => {
    try {
      // Check rate limiting
      if (!canMakeRequest()) {
        toast.info("جاري معالجة طلبات أخرى، سيتم إكمال العملية قريباً")
        return false
      }
      
      setLastRequestTime(Date.now())
      
      const response = await fetch(`https://www.ss.mastersclinics.com/appointments/${appointmentId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("انتهت جلسة التسجيل، يرجى تسجيل الدخول مرة أخرى");
          localStorage.removeItem("authToken");
          localStorage.removeItem("clientInfo");
          router.push("/");
          return false;
        }
        
        if (response.status === 429) {
          toast.error("تم تجاوز عدد الطلبات المسموح بها. يرجى الانتظار قليلاً ثم المحاولة مرة أخرى.")
          return false
        }
        
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "فشل في تحديث حالة الموعد");
      }

      // Update local state
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === appointmentId ? { ...apt, status: newStatus as "pending" | "confirmed" | "completed" | "cancelled" } : apt
        )
      );

      const statusMessages = {
        "cancelled": "تم إلغاء الموعد بنجاح",
        "confirmed": "تم تأكيد الموعد بنجاح",
        "completed": "تم تحديث الموعد كمكتمل",
        "pending": "تم إعادة الموعد إلى قيد الانتظار"
      };
      toast.success(statusMessages[newStatus as keyof typeof statusMessages] || "تم تحديث الموعد بنجاح");

      // Ask header to refresh notifications immediately
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('refreshNotifications'))
      }
      return true;
    } catch (err) {
      console.error("Update appointment status error:", err);
      toast.error(err instanceof Error ? err.message : "فشل في تحديث حالة الموعد. يرجى المحاولة لاحقًا.");
      return false;
    }
  }

  const handleCreatePayment = async (appointmentId: number, id: number) => {
    console.log("Creating payment for appointment:", appointmentId, "and entity:", id);

    try {
      // Check rate limiting
      if (!canMakeRequest()) {
        toast.info("جاري معالجة طلبات أخرى، سيتم إكمال العملية قريباً")
        return
      }
      
      setPaymentState({
        isProcessing: true,
        sessionId: null,
        appointmentId,
      });
      
      setLastRequestTime(Date.now())

      const response = await fetch("https://www.ss.mastersclinics.com/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointmentId,
          entityId: id,
        }),
      });

      // 🔎 Log raw response status
      console.log("Payment API status:", response.status);

      if (!response.ok) {
        if (response.status === 429) {
          toast.error("تم تجاوز عدد الطلبات المسموح بها. يرجى الانتظار قليلاً ثم المحاولة مرة أخرى.")
          setPaymentState({
            isProcessing: false,
            sessionId: null,
            appointmentId: null,
          });
          return
        }
        
        const errorText = await response.text();
        throw new Error(errorText || `Failed with status ${response.status}`);
      }

      const data = await response.json();

      // 🔎 Log full response body
      console.log("Payment API response:", data);

      if (data.success && data.url && data.sessionId) {
        setPaymentState((prev) => ({ ...prev, sessionId: data.sessionId }));
        console.log("Redirecting to payment:", data.url);
        window.location.href = data.url;
      } else if (data.url) {
        // Handle case where response structure might be different
        console.log("Redirecting to payment (alternative format):", data.url);
        window.location.href = data.url;
      } else {
        throw new Error(data?.error || "Invalid payment response");
      }
    } catch (err) {
      console.error("Payment creation failed:", err);
      toast.error("فشل في إنشاء جلسة الدفع. يرجى المحاولة مرة أخرى.");
      setPaymentState({
        isProcessing: false,
        sessionId: null,
        appointmentId: null,
      });
    }
  };

  const checkPaymentStatus = async (sessionId: string) => {
    try {
      const response = await fetch(
        `https://www.ss.mastersclinics.com/payment/status/${sessionId}`
      )
      
      if (response.ok) {
        const data = await response.json()
        if (data.paymentStatus === 'paid') {
          toast.success("تم الدفع بنجاح!")
          // Refresh appointments to update status
          fetchProfileData()
          setPaymentState({
            isProcessing: false,
            sessionId: null,
            appointmentId: null,
          })
        }
      }
    } catch (err) {
      console.error("Error checking payment status:", err)
    }
  }

  const handleEditProfile = () => {
    if (!clientInfo) return
    setEditState({
      isEditing: true,
      isLoading: false,
      errors: {},
      tempData: { ...clientInfo },
    })
  }

  const handleSaveProfile = async () => {
    if (!clientInfo) return

    const errors = validateFields(editState.tempData)
    if (Object.keys(errors).length > 0) {
      setEditState((prev) => ({ ...prev, errors }))
      return
    }

    setEditState((prev) => ({ ...prev, isLoading: true }))

    try {
      const clientId = getClientId()
      if (!clientId) throw new Error("Authentication required")

      const updatedClientData = {
        ...clientInfo,
        first_name: editState.tempData.first_name || clientInfo.first_name,
        last_name: editState.tempData.last_name || clientInfo.last_name,
        phone_number: editState.tempData.phone_number || clientInfo.phone_number,
        identity_number: editState.tempData.identity_number || clientInfo.identity_number,
      }

      // Check rate limiting
      if (!canMakeRequest()) {
        toast.info("جاري معالجة طلبات أخرى، سيتم إكمال العملية قريباً")
        setEditState((prev) => ({ ...prev, isLoading: false }))
        return
      }
      
      setLastRequestTime(Date.now())
      
      const response = await fetch("https://www.ss.mastersclinics.com/api/client-auth/edit-client", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId,
          first_name: updatedClientData.first_name,
          last_name: updatedClientData.last_name,
          phone_number: updatedClientData.phone_number,
          identity_number: updatedClientData.identity_number,
        }),
      })

      if (!response.ok) throw new Error(`Failed with status ${response.status}`)

      const data = await response.json()
      const newClientInfo = data.data?.client || updatedClientData

      setClientInfo(newClientInfo)
      localStorage.setItem("clientInfo", JSON.stringify(newClientInfo))

      setEditState({
        isEditing: false,
        isLoading: false,
        errors: {},
        tempData: {},
      })

      toast.success("تم تحديث البيانات بنجاح")
    } catch (err) {
      console.error("Update failed:", err)
      toast.error("فشل التحديث. يرجى المحاولة مرة أخرى")
      setEditState((prev) => ({ ...prev, isLoading: false }))
    }
  }

  const handleCancelEdit = () => {
    if (Object.keys(editState.tempData).length > 0 && !window.confirm("هل تريد تجاهل التغييرات؟")) return
    setEditState({
      isEditing: false,
      isLoading: false,
      errors: {},
      tempData: {},
    })
  }

  const handleFieldChange = (field: keyof ClientInfo, value: string) => {
    setEditState((prev) => ({
      ...prev,
      tempData: { ...prev.tempData, [field]: value },
      errors: { ...prev.errors, [field]: "" },
    }))
  }

  const handleSendVerificationCode = async () => {
    if (!emailEditState.newEmail) {
      setEmailEditState((prev) => ({ ...prev, error: "البريد الإلكتروني مطلوب" }))
      return
    }
    if (!validateEmail(emailEditState.newEmail)) {
      setEmailEditState((prev) => ({ ...prev, error: "البريد الإلكتروني غير صحيح" }))
      return
    }
    try {
      setEmailEditState((prev) => ({ ...prev, isSendingCode: true, error: "" }))
      const clientId = getClientId()
      if (!clientId) throw new Error("Authentication required")

      // Check rate limiting
      if (!canMakeRequest()) {
        toast.info("جاري معالجة طلبات أخرى، سيتم إكمال العملية قريباً")
        setEmailEditState((prev) => ({ ...prev, isSendingCode: false }))
        return
      }
      
      setLastRequestTime(Date.now())
      
      const response = await fetch("https://www.ss.mastersclinics.com/api/client-auth/authorize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailEditState.newEmail,
        }),
      })

      if (!response.ok) throw new Error(`Failed with status ${response.status}`)

      setEmailEditState((prev) => ({ ...prev, codeSent: true }))
      toast.success("تم إرسال رمز التحقق إلى البريد الإلكتروني الجديد")
    } catch (err) {
      console.error("Send verification code failed:", err)
      setEmailEditState((prev) => ({
        ...prev,
        error: err instanceof Error ? err.message : "فشل إرسال رمز التحقق",
      }))
      toast.error("فشل إرسال رمز التحقق. يرجى المحاولة مرة أخرى")
    } finally {
      setEmailEditState((prev) => ({ ...prev, isSendingCode: false }))
    }
  }

  const verifyAndChangeEmail = async () => {
    if (!emailEditState.verificationCode) {
      setEmailEditState((prev) => ({ ...prev, error: "رمز التحقق مطلوب" }))
      return
    }
    try {
      setEmailEditState((prev) => ({ ...prev, isVerifying: true, error: "" }))
      const clientId = getClientId()
      if (!clientId) throw new Error("Authentication required")

      // Check rate limiting
      if (!canMakeRequest()) {
        toast.info("جاري معالجة طلبات أخرى، سيتم إكمال العملية قريباً")
        setEmailEditState((prev) => ({ ...prev, isVerifying: false }))
        return
      }
      
      setLastRequestTime(Date.now())
      
      const response = await fetch("https://www.ss.mastersclinics.com/api/client-auth/change-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId,
          newEmail: emailEditState.newEmail,
          verificationCode: emailEditState.verificationCode,
        }),
      })

      if (!response.ok) throw new Error(`Failed with status ${response.status}`)

      const data = await response.json()
      setClientInfo(data.client)
      localStorage.setItem("clientInfo", JSON.stringify(data.client))

      toast.success("تم تغيير البريد الإلكتروني بنجاح")
      setEmailEditState({
        isEditing: false,
        newEmail: "",
        verificationCode: "",
        isSendingCode: false,
        isVerifying: false,
        error: "",
        codeSent: false,
      })
    } catch (err) {
      setEmailEditState((prev) => ({
        ...prev,
        error: err instanceof Error ? err.message : "فشل تغيير البريد الإلكتروني",
        isVerifying: false,
      }))
    }
  }

  const handleCancelEmailEdit = () => {
    setEmailEditState({
      isEditing: false,
      newEmail: "",
      verificationCode: "",
      isSendingCode: false,
      isVerifying: false,
      error: "",
      codeSent: false,
    })
  }

  useEffect(() => {
    fetchProfileData()
  }, [retryCount])

  useEffect(() => {
    const handleWishlistUpdate = (event: CustomEvent) => {
      const { action, itemId, itemType, items, count } = event.detail
      console.log("[Profile] Wishlist update received:", { action, itemId, itemType })
      if (action === "removed") {
        setWishlist((prev) => prev.filter((item) => !(item.id === itemId && item.type === itemType)))
        const updatedItems = items || wishlist.filter((item) => !(item.id === itemId && item.type === itemType))
        sessionStorage.setItem("wishlist", JSON.stringify(updatedItems))
        sessionStorage.setItem("wishlistCount", (count || updatedItems.length).toString())
      } else if (action === "added") {
        refreshWishlistData()
      }
    }

    const handleRefreshRequest = () => {
      refreshWishlistData()
    }

    window.addEventListener("wishlistUpdated", handleWishlistUpdate as EventListener)
    window.addEventListener("refreshWishlist", handleRefreshRequest as EventListener)

    return () => {
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate as EventListener)
      window.removeEventListener("refreshWishlist", handleRefreshRequest as EventListener)
    }
  }, [wishlist])

  useEffect(() => {
    // Ensure hash is present on initial load
    if (typeof window !== 'undefined' && !window.location.hash) {
      window.location.hash = "#"
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        setError("Request timed out. Please check your connection.")
        setLoading(false)
      }
    }, 10000)
    return () => clearTimeout(timer)
  }, [loading])

  useEffect(() => {
    if (paymentState.sessionId) {
      // Check status every 5 seconds
      const interval = setInterval(() => {
        checkPaymentStatus(paymentState.sessionId as string)
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [paymentState.sessionId])

  // Render Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar nav={true} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <Loader2 className="w-12 h-12 mx-auto animate-spin text-[#CBA853]" />
            <p className="mt-4 text-gray-600">جاري تحميل البيانات...</p>
            {retryCount > 0 && <p className="text-sm text-gray-500">محاولة {retryCount} من 3</p>}
          </div>
        </div>
      </div>
    )
  }

  // Render Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar nav={true} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="bg-red-100 text-red-700 p-4 rounded-lg max-w-md mx-auto">
              <p className="font-medium">حدث خطأ</p>
              <p className="text-sm mt-2">{error}</p>
            </div>
            <Button
              onClick={() => {
                setRetryCount(0)
                setLoading(true)
                setError(null)
              }}
              className="mt-6 bg-[#CBA853] hover:bg-[#A58532]"
            >
              إعادة المحاولة
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Render No Data State
  if (!clientInfo) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar nav={true} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-600">لا توجد بيانات متاحة</p>
            <Button onClick={() => router.push("/")} className="mt-4 bg-[#CBA853] hover:bg-[#A58532]">
              تسجيل الدخول
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Main Render (unchanged from your original code)
  return (
    <div className="min-h-screen px-2">
      <Navbar nav={true} />
      <div className="container mx-auto px-4 py-8 bg-gray-50" dir="rtl">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">الملف الشخصي</h1>

          <Tabs value={activeTab} className="w-full" dir="rtl">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger
                value="info"
                className="flex items-center gap-2"
                onClick={() => handleTabChange("info")}
              >
                <User className="w-4 h-4" />
                المعلومات الشخصية
              </TabsTrigger>
              <TabsTrigger
                value="wishlist"
                className="flex items-center gap-2"
                onClick={() => handleTabChange("wishlist")}
              >
                <Heart className="w-4 h-4" />
                قائمة الأمنيات ({wishlist.length})
              </TabsTrigger>
              <TabsTrigger
                value="appointments"
                className="flex items-center gap-2"
                onClick={() => handleTabChange("appointments")}
              >
                <Calendar className="w-4 h-4" />
                المواعيد
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-[#CBA853]" />
                    المعلومات الشخصية
                  </CardTitle>
                  {!editState.isEditing && !emailEditState.isEditing ? (
                    <Button onClick={handleEditProfile} variant="outline" size="sm">
                      <Edit className="w-4 h-4 ml-2" />
                      تعديل
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      {editState.isEditing && (
                        <>
                          <Button
                            onClick={handleSaveProfile}
                            size="sm"
                            className="bg-[#CBA853] hover:bg-[#A58532]"
                            disabled={editState.isLoading}
                          >
                            {editState.isLoading ? (
                              <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                            ) : (
                              <Save className="w-4 h-4 ml-2" />
                            )}
                            حفظ
                          </Button>
                          <Button onClick={handleCancelEdit} variant="outline" size="sm" disabled={editState.isLoading}>
                            <X className="w-4 h-4 ml-2" />
                            إلغاء
                          </Button>
                        </>
                      )}
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">الاسم الأول</Label>
                      {editState.isEditing ? (
                        <>
                          <Input
                            id="firstName"
                            value={editState.tempData.first_name ?? clientInfo.first_name}
                            onChange={(e) => handleFieldChange("first_name", e.target.value)}
                          />
                          {editState.errors.first_name && (
                            <p className="text-red-500 text-sm mt-1">{editState.errors.first_name}</p>
                          )}
                        </>
                      ) : (
                        <p className="mt-1 p-2 bg-gray-50 rounded">{clientInfo.first_name}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName">الاسم الأخير</Label>
                      {editState.isEditing ? (
                        <>
                          <Input
                            id="lastName"
                            value={editState.tempData.last_name ?? clientInfo.last_name}
                            onChange={(e) => handleFieldChange("last_name", e.target.value)}
                          />
                          {editState.errors.last_name && (
                            <p className="text-red-500 text-sm mt-1">{editState.errors.last_name}</p>
                          )}
                        </>
                      ) : (
                        <p className="mt-1 p-2 bg-gray-50 rounded">{clientInfo.last_name}</p>
                      )}
                    </div>
                    <div>
                      <Label>البريد الإلكتروني</Label>
                      {emailEditState.isEditing ? (
                        <div className="space-y-4 mt-2">
                          <div className="flex flex-col gap-2">
                            <Input
                              type="email"
                              value={emailEditState.newEmail}
                              onChange={(e) =>
                                setEmailEditState((prev) => ({
                                  ...prev,
                                  newEmail: e.target.value,
                                  error: "",
                                }))
                              }
                              placeholder="البريد الإلكتروني الجديد"
                              disabled={emailEditState.codeSent}
                            />
                            {emailEditState.codeSent && (
                              <div className="flex items-center gap-2">
                                <Key className="w-4 h-4 text-[#CBA853]" />
                                <Input
                                  value={emailEditState.verificationCode}
                                  onChange={(e) =>
                                    setEmailEditState((prev) => ({
                                      ...prev,
                                      verificationCode: e.target.value,
                                      error: "",
                                    }))
                                  }
                                  placeholder="أدخل رمز التحقق"
                                  maxLength={6}
                                />
                              </div>
                            )}
                          </div>
                          {emailEditState.error && <p className="text-red-500 text-sm">{emailEditState.error}</p>}
                          <div className="flex gap-2">
                            {!emailEditState.codeSent ? (
                              <>
                                <Button
                                  onClick={handleSendVerificationCode}
                                  disabled={emailEditState.isSendingCode}
                                  className="bg-[#CBA853] hover:bg-[#A58532]"
                                >
                                  {emailEditState.isSendingCode ? (
                                    <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                                  ) : (
                                    <>
                                      <Mail className="w-4 h-4 ml-2" />
                                      إرسال رمز التحقق
                                    </>
                                  )}
                                </Button>
                                <Button
                                  onClick={handleCancelEmailEdit}
                                  variant="outline"
                                  disabled={emailEditState.isSendingCode}
                                >
                                  <X className="w-4 h-4 ml-2" />
                                  إلغاء
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button
                                  onClick={verifyAndChangeEmail}
                                  disabled={emailEditState.isVerifying}
                                  className="bg-[#CBA853] hover:bg-[#A58532]"
                                >
                                  {emailEditState.isVerifying ? (
                                    <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                                  ) : (
                                    <>
                                      <Lock className="w-4 h-4 ml-2" />
                                      تأكيد التغيير
                                    </>
                                  )}
                                </Button>
                                <Button
                                  onClick={() =>
                                    setEmailEditState((prev) => ({
                                      ...prev,
                                      codeSent: false,
                                      verificationCode: "",
                                    }))
                                  }
                                  variant="outline"
                                >
                                  <X className="w-4 h-4 ml-2" />
                                  تراجع
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="mt-1 p-2 bg-gray-50 rounded flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-500" />
                            {clientInfo.email}
                          </div>
                          {!editState.isEditing && (
                            <Button
                              onClick={() =>
                                setEmailEditState((prev) => ({
                                  ...prev,
                                  isEditing: true,
                                  newEmail: clientInfo.email,
                                }))
                              }
                              variant="ghost"
                              size="sm"
                              className="text-[#CBA853] hover:text-[#A58532]"
                            >
                              <Edit className="w-3 h-3 ml-1" />
                              تغيير
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phoneNumber">رقم الهاتف</Label>
                      {editState.isEditing ? (
                        <>
                          <Input
                            id="phoneNumber"
                            value={editState.tempData.phone_number ?? clientInfo.phone_number}
                            onChange={(e) => handleFieldChange("phone_number", e.target.value)}
                          />
                          {editState.errors.phone_number && (
                            <p className="text-red-500 text-sm mt-1">{editState.errors.phone_number}</p>
                          )}
                        </>
                      ) : (
                        <div className="mt-1 p-2 bg-gray-50 rounded flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          {clientInfo.phone_number}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="identityNumber">رقم الهوية</Label>
                      {editState.isEditing ? (
                        <>
                          <Input
                            id="identityNumber"
                            value={editState.tempData.identity_number ?? clientInfo.identity_number}
                            onChange={(e) => handleFieldChange("identity_number", e.target.value)}
                          />
                          {editState.errors.identity_number && (
                            <p className="text-red-500 text-sm mt-1">{editState.errors.identity_number}</p>
                          )}
                        </>
                      ) : (
                        <div className="mt-1 p-2 bg-gray-50 rounded flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-gray-500" />
                          {clientInfo.identity_number || "غير محدد"}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="pt-4 border-t text-sm text-gray-600 flex gap-4">
                    <span>
                      رقم العضوية: <strong className="text-[#CBA853]">{clientInfo.unique_number}</strong>
                    </span>
                    <span>تاريخ التسجيل: {formatDate(clientInfo.created_at)}</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="wishlist">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-[#CBA853]" />
                    قائمة الأمنيات ({wishlist.length})
                  </CardTitle>
                  <Button onClick={refreshWishlistData} variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 ml-2" />
                    مزامنة
                  </Button>
                </CardHeader>
                <CardContent>
                  {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {wishlist.map((item) => (
                        <div
                          key={`${item.type}-${item.id}`}
                          className="border rounded-lg p-4 relative hover:shadow-md transition-shadow"
                        >
                          <div className="absolute top-2 left-2">{getTypeIcon(item.type)}</div>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="absolute top-2 right-2 text-[#CBA853] hover:text-red-700 p-1 h-auto"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent dir="rtl">
                              <AlertDialogHeader>
                                <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                                <AlertDialogDescription>
                                  هل أنت متأكد من إزالة هذا العنصر من قائمة الأمنيات؟
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => removeFromWishlist(item)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  حذف
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          {/* Doctor Item */}
                          {item.type === "doctor" && (
                            <>
                              <h3 className="font-semibold text-lg mt-6">{item.name}</h3>
                              <p className="text-[#CBA853] text-sm">{item.specialty}</p>
                              <div className="mt-2 text-sm text-gray-600 line-clamp-3">{item.services}</div>
                              {item.image && (
                                <div className="mt-4">
                                  <img
                                    src={getImageUrl(item.image) || "/placeholder.svg"}
                                    alt={item.name}
                                    className="w-full h-40 object-cover rounded"
                                  />
                                </div>
                              )}
                              <div className="mt-4 flex justify-between items-center">
                                <div className="text-xs text-gray-500">أضيف في: {formatDate(item.created_at)}</div>
                                <Button
                                  onClick={() => router.push(`/doctors/${item.id}`)}
                                  variant="outline"
                                  size="sm"
                                  className="text-[#CBA853] border-[#CBA853] hover:bg-[#CBA853] hover:text-white"
                                >
                                  عرض التفاصيل
                                </Button>
                              </div>
                            </>
                          )}
                          {/* Offer Item */}
                          {item.type === "offer" && (
                            <>
                              <h3 className="font-semibold text-lg mt-6">{item.title}</h3>
                              {item.description && <p className="text-gray-600 text-sm">{item.description}</p>}
                              <div className="mt-2 flex items-center gap-2">
                                <span className="text-gray-500 line-through">{item.priceBefore} ج.م</span>
                                <span className="text-[#CBA853] font-bold">{item.priceAfter} ج.م</span>
                                {item.discountPercentage && (
                                  <Badge variant="outline" className="text-[#CBA853] border-red-600">
                                    خصم {item.discountPercentage}%
                                  </Badge>
                                )}
                              </div>
                              {item.image && (
                                <div className="mt-4">
                                  <img
                                    src={getImageUrl(item.image) || "/placeholder.svg"}
                                    alt={item.title}
                                    className="w-full h-40 object-cover rounded"
                                  />
                                </div>
                              )}
                              <div className="mt-4 flex justify-between items-center">
                                <div className="text-xs text-gray-500">أضيف في: {formatDate(item.created_at)}</div>
                                <Button
                                  onClick={() => router.push(`/offers/${item.id}`)}
                                  variant="outline"
                                  size="sm"
                                  className="text-[#CBA853] border-[#CBA853] hover:bg-[#CBA853] hover:text-white"
                                >
                                  عرض التفاصيل
                                </Button>
                              </div>
                            </>
                          )}
                          {/* Device Item */}
                          {item.type === "device" && (
                            <>
                              <h3 className="font-semibold text-lg mt-6">{item.name}</h3>
                              <p className="text-[#CBA853] text-sm">{item.typee}</p>
                              {item.available_times && item.available_times !== "null" && (
                                <div className="mt-2">
                                  <Label className="text-sm text-gray-600">مواعيد العمل:</Label>
                                  <p className="text-sm text-gray-600">
                                    {(() => {
                                      try {
                                        const times = JSON.parse(item.available_times)
                                        return Array.isArray(times) ? times.join(", ") : times
                                      } catch {
                                        return item.available_times.replace(/^"|"$/g, "")
                                      }
                                    })()}
                                  </p>
                                </div>
                              )}
                              {item.image_url && (
                                <div className="mt-4">
                                  <img
                                    src={getImageUrl(item.image_url) || "/placeholder.svg"}
                                    alt={item.name}
                                    className="w-full h-40 object-cover rounded"
                                  />
                                </div>
                              )}
                              <div className="mt-4 flex justify-between items-center">
                                <div className="text-xs text-gray-500">أضيف في: {formatDate(item.created_at)}</div>
                                <Button
                                  onClick={() => router.push(`/devices/${item.id}`)}
                                  variant="outline"
                                  size="sm"
                                  className="text-[#CBA853] border-[#CBA853] hover:bg-[#CBA853] hover:text-white"
                                >
                                  عرض التفاصيل
                                </Button>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>قائمة الأمنيات فارغة</p>
                      <p className="text-sm">أضف الخدمات والمنتجات التي تهمك</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appointments">
              <Card className="shadow-xl border-0 bg-white dark:bg-gray-900 overflow-hidden">
                <CardHeader className=" border-b border-gray-100 dark:border-gray-800 p-6">
                  <CardTitle className="flex items-center gap-4 text-2xl font-bold text-[#CBA853]">
                    <div className="p-3  rounded-xl border border-emerald-500/20">
                      <Calendar className="w-7 h-7 text-[#CBA853]" />
                    </div>
                    <div>
                      <div>المواعيد المحجوزة</div>
                      <div className="text-sm font-normal text-gray-600 dark:text-gray-400 mt-1">
                        {appointments.length} موعد نشط
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {appointments.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {appointments.map((appointment) => (
                        <Card
                          key={appointment.id}
                          data-appointment-id={`${appointment.id}`}
                          className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-0 shadow-lg ${getTypeColor()}`}
                        >
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-5">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-sm">
                                  {getTypeIcon(appointment.type)}
                                </div>
                                <Badge
                                  variant="secondary"
                                  className="text-xs font-semibold px-3 py-1 bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 border-0 shadow-sm"
                                >
                                  {appointment.type === "doctor" && "طبيب"}
                                  {appointment.type === "offer" && "عرض"}
                                  {appointment.type === "device" && "جهاز"}
                                  {appointment.type === "branch" && "فرع"}
                                </Badge>
                              </div>
                              <AppointmentStatusDialog
                                appointment={appointment}
                                onStatusUpdate={updateAppointmentStatus}
                              />
                            </div>

                            {appointment.scheduledAt ? (
                              <div className="flex items-center justify-start gap-2 mt-3 mb-4 bg-gray-50 px-3 py-2 rounded-lg">
                                <Clock className="w-4 h-4 text-black" />
                                <span className="text-black font-medium">
                                  موعد الحجز : {formatScheduledDate(appointment.scheduledAt)}
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-center justify-start gap-2 mt-3 mb-4 bg-gray-50 dark:bg-gray-950/20 px-3 py-2 rounded-lg">
                                <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                <span className="text-gray-700 dark:text-gray-300 font-medium">
لم يتم تحديد موعد الحجز بعد                                </span>
                              </div>
                            )}
                                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50 px-3 py-2 rounded-lg mt-3">
  <CreditCard className="w-4 h-4 ml-2" />
  دفع الحجز : {
    appointment.payment_status === "paid" ? "مدفوع" :
    appointment.payment_status === "pending" ? "قيد المعالجة" :
    appointment.payment_status === "failed" ? "فشل الدفع" :
    appointment.payment_status === "unpaid" ? "غير مدفوع" :
    "غير محدد"
  }
</p>

                            {/* Doctor Appointment */}
                            {appointment.type === "doctor" && appointment.related && (
                              <div className="space-y-4">
                                <div>
                                  <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2 leading-tight">
                                    {appointment.related.name}
                                  </h3>
                                  <p className="text-[#CBA853] dark:text-emerald-400 font-semibold text-sm mb-3">
                                    {appointment.related.specialty}
                                  </p>
                                  {/* <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    <span className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-950/20 px-2 py-1 rounded-full">
                                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                      {appointment.related.rating}
                                    </span>
                                    <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full text-xs">
                                      {appointment.related.experience}
                                    </span>
                                  </div> */}
                                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                                    {appointment.related.services}
                                  </p>
                                </div>
                                {appointment.related.image && (
                                  <div className="rounded-xl overflow-hidden shadow-md">
                                    <img
                                      src={getImageUrl(appointment.related.image) || "/placeholder.svg"}
                                      alt={appointment.related.name}
                                      className="w-full h-36 object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                  </div>
                                )}
                                
                                {/* Payment Button for Unpaid Doctor Appointments */}
                                {appointment.payment_status !== "paid" && appointment.status !== "cancelled" && (
                                  <div className="mt-4">
                                    <Button
                                      onClick={() => {
                                        const entityId = appointment.related?.id
                                        if (entityId) {
                                          handleCreatePayment(appointment.id, entityId)
                                        } else {
                                          toast.error("لا يمكن معالجة الدفع لهذا الموعد - معلومات ناقصة")
                                        }
                                      }}
                                      disabled={paymentState.isProcessing && paymentState.appointmentId === appointment.id}
                                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                                    >
                                      {paymentState.isProcessing && paymentState.appointmentId === appointment.id ? (
                                        <>
                                          <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                                          جاري التوجيه للدفع...
                                        </>
                                      ) : (
                                        <>
                                          <CreditCard className="w-4 h-4 ml-2" />
                                          ادفع الآن
                                        </>
                                      )}
                                    </Button>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Offer Appointment */}
                            {appointment.type === "offer" && appointment.related && (
                              <div className="space-y-4">
                                <div>
                                  <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-3 leading-tight">
                                    {appointment.related.title}
                                  </h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                                    {appointment.related.description}
                                  </p>
                                  <div className="flex items-center gap-3 mb-3">
                                    <span className="text-gray-500 dark:text-gray-400 line-through text-base">
                                      {appointment.related.priceBefore} ج.م
                                    </span>
                                    <span className="text-[#CBA853] dark:text-orange-400 font-bold text-xl">
                                      {appointment.related.priceAfter} ج.م
                                    </span>
                                    <Badge className="bg-red-500 hover:bg-red-600 text-white border-0 text-xs font-semibold">
                                      خصم {appointment.related.discountPercentage}%
                                    </Badge>
                                  </div>
          

                                </div>
                                {appointment.related.image && (
                                  <div className="rounded-xl overflow-hidden shadow-md">
                                    <img
                                      src={getImageUrl(appointment.related.image) || "/placeholder.svg"}
                                      alt={appointment.related.title}
                                      className="w-full h-36 object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                  </div>
                                )}
                                
                                {/* Payment Button for Unpaid Offer Appointments */}
                                {appointment.payment_status !== "paid" && appointment.status !== "cancelled" && (
                                  <div className="mt-4">
                                    <Button
                                      onClick={() => {
                                        const entityId = appointment.related?.id
                                        if (entityId) {
                                          handleCreatePayment(appointment.id, entityId)
                                        } else {
                                          toast.error("لا يمكن معالجة الدفع لهذا الموعد - معلومات ناقصة")
                                        }
                                      }}
                                      disabled={paymentState.isProcessing && paymentState.appointmentId === appointment.id}
                                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                                    >
                                      {paymentState.isProcessing && paymentState.appointmentId === appointment.id ? (
                                        <>
                                          <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                                          جاري التوجيه للدفع...
                                        </>
                                      ) : (
                                        <>
                                          <CreditCard className="w-4 h-4 ml-2" />
                                          ادفع الآن
                                        </>
                                      )}
                                    </Button>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Device Appointment */}
                            {appointment.type === "device" && appointment.related && (
                              <div className="space-y-4">
                                <div>
                                  <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2 leading-tight">
                                    {appointment.related.name}
                                  </h3>
                                  <p className="text-[#CBA853] dark:text-blue-400 font-semibold text-sm mb-4">
                                    {appointment.related.type}
                                  </p>
                                  
                                  {/* Branch Information */}
                                  {appointment.branch && (
                                    <div className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg mb-3">
                                      <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                                      <span className="text-gray-700 dark:text-gray-300">
                                        الفرع: {appointment.branch}
                                      </span>
                                    </div>
                                  )}
                                  
                                  <div className="space-y-3 text-sm">
                                    <div className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                                      <Clock className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                                      <span className="text-gray-700 dark:text-gray-300">
                                        مواعيد الفرع: {appointment.related.available_times ? appointment.related.available_times.replace(/^"|"$/g, "") : "غير محدد"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                        
                                {appointment.related.image_url && (
                                  <div className="rounded-xl overflow-hidden shadow-md">
                                    <img
                                      src={getImageUrl(appointment.related.image_url) || "/placeholder.svg"}
                                      alt={appointment.related.name}
                                      className="w-full h-36 object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                  </div>
                                )}
                                
                                {/* Payment Button for Unpaid Device Appointments */}
                                {appointment.payment_status !== "paid" && appointment.status !== "cancelled" && (
                                  <div className="mt-4">
                                    <Button
                                      onClick={() => {
                                        const entityId = appointment.related?.id
                                        if (entityId) {
                                          handleCreatePayment(appointment.id, entityId)
                                        } else {
                                          toast.error("لا يمكن معالجة الدفع لهذا الموعد - معلومات ناقصة")
                                        }
                                      }}
                                      disabled={paymentState.isProcessing && paymentState.appointmentId === appointment.id}
                                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                                    >
                                      {paymentState.isProcessing && paymentState.appointmentId === appointment.id ? (
                                        <>
                                          <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                                          جاري التوجيه للدفع...
                                        </>
                                      ) : (
                                        <>
                                          <CreditCard className="w-4 h-4 ml-2" />
                                          ادفع الآن
                                        </>
                                      )}
                                    </Button>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Branch Appointment */}
                            {appointment.type === "branch" && appointment.related && (
                              <div className="space-y-4">
                                <div>
                                  {appointment.related.image_url && (
                                    <img
                                      src={getImageUrl(appointment.related.image_url) || "/placeholder.svg"}
                                      alt={appointment.related.name}
                                      className="w-full h-40 object-cover rounded-lg mb-4"
                                    />
                                  )}
                                  <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2 leading-tight">
                                    {appointment.related.name}
                                  </h3>
                                  <div className="space-y-3 text-sm">
                                    <div className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                                      <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                                      <span className="text-gray-700 dark:text-gray-300">
                                        {appointment.related.address?.replace(/^"|"$/g, "")}
                                      </span>
                                    </div>
                                 
                                    {appointment.related.google_map_link && (
                                      <div className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                                        <a
                                          href={appointment.related.google_map_link}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-[#CBA853] hover:underline"
                                        >
                                          عرض على الخريطة
                                        </a>
                                      </div>
                                    )}
                                  </div>
     
                                  <Badge
                                    variant="outline"
                                    className="mt-3 border-purple-200 text-purple-700 dark:border-purple-800 dark:text-purple-300"
                                  >
                                    حجز مباشر بالفرع
                                  </Badge>
                                </div>
                              </div>
                            )}

                            {/* Status Badge */}
                            <div className="absolute top-6 left-4">
                              {appointment.status === "pending" && (
                                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                  ⏳ قيد الانتظار
                                </Badge>
                              )}
                              {appointment.status === "confirmed" && (
                                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                  ✅ مؤكد
                                </Badge>
                              )}
                              {appointment.status === "completed" && (
                                <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                                  ✔️ مكتمل
                                </Badge>
                              )}
                              {appointment.status === "cancelled" && (
                                <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                                  ❌ ملغى
                                </Badge>
                              )}
                            </div>

                            {/* Payment Status Badge */}
       

                            {/* Paid Status Badge */}
       

                            {/* Payment Processing Indicator */}
                            {paymentState.isProcessing && paymentState.appointmentId === appointment.id && (
                              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 ml-2">
                                <Loader2 className="w-3 h-3 ml-1 animate-spin" />
                                جاري الدفع
                              </Badge>
                            )}

                            {/* Payment Button for Unpaid Appointments */}
                            {/* {appointment.payment_status !== "paid" && appointment.status !== "cancelled" && (
                              <div className="mt-4">
                                <Button
                                  onClick={() => {
                                    const entityId = appointment.related?.id
                                    if (entityId) {
                                      handleCreatePayment(appointment.id, entityId)
                                    } else {
                                      console.log("asdasd");
                                      
                                      toast.error("لا يمكن معالجة الدفع لهذا الموعد - معلومات ناقصة")
                                    }
                                  }}
                                  disabled={paymentState.isProcessing && paymentState.appointmentId === appointment.id}
                                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                                >
                                  {paymentState.isProcessing && paymentState.appointmentId === appointment.id ? (
                                    <>
                                      <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                                      جاري التوجيه للدفع...
                                    </>
                                  ) : (
                                    <>
                                      <CreditCard className="w-4 h-4 ml-2" />
                                      ادفع الآن
                                    </>
                                  )}
                                </Button>
                              </div>
                            )} */}

                            <div className="flex justify-between items-center mt-6 pt-5 border-t border-gray-100 dark:border-gray-800">
                              <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 px-3 py-2 rounded-full">
                                {formatDate(appointment.createdAt)}
                              </div>
  <CallLogsDialog 
    appointment={appointment} 
    onStatusUpdate={updateAppointmentStatus} 
  />
                              <Button
                                onClick={() => router.push(`/${appointment.type}s/${appointment.related?.id}`)}
                                variant="outline"
                                size="sm"
                                className="text-[#CBA853] border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 dark:text-emerald-400 dark:border-emerald-800 dark:hover:bg-emerald-950/20 font-medium shadow-sm hover:shadow-xl transition-all bg-transparent"
                              >
                                <Eye className="w-4 h-4 ml-1" />
                                التفاصيل
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20">
                      <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-950/20 dark:to-emerald-900/20 rounded-full flex items-center justify-center shadow-lg">
                        <Calendar className="w-16 h-16 text-emerald-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">لا توجد مواعيد محجوزة</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
                        ابدأ رحلتك الصحية معنا واحجز موعدك الأول مع أفضل الأطباء والمتخصصين
                      </p>
                      <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 text-base shadow-lg hover:shadow-xl transition-all">
                        احجز موعد جديد
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer hclass={"wpo-site-footer"} />
      <Scrollbar />
    </div>
  )
}
// Add these helper functions outside your component

const arabicDays = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

// Arabic month names
const arabicMonths = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];

// Function to check if a date is today
const isToday = (date: Date) => {
  const today = new Date();
  return date.getDate() === today.getDate() &&
         date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear();
};

// Function to check if a date is yesterday
const isYesterday = (date: Date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.getDate() === yesterday.getDate() &&
         date.getMonth() === yesterday.getMonth() &&
         date.getFullYear() === yesterday.getFullYear();
};

// Custom Arabic time formatter
const formatToArabicTime = (timestamp: string | Date) => {
  try {
    const date = new Date(timestamp);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'وقت غير صالح';
    }
    
    const hour = date.getHours();
    const minute = date.getMinutes();
    
    // Convert to 12-hour format with AM/PM in Arabic
    const period = hour >= 12 ? 'م' : 'ص';
    const twelveHour = hour % 12 || 12;
    
    return `${twelveHour}:${minute.toString().padStart(2, '0')} ${period}`;
  } catch (error) {
    console.error('Error formatting time:', error);
    return 'وقت غير صالح';
  }
};

// Custom Arabic date formatter
const formatToArabicDateTime = (timestamp: string | Date) => {
  try {
    const date = new Date(timestamp);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'تاريخ غير صالح';
    }
    
    if (isToday(date)) {
      return `اليوم - ${formatToArabicTime(date)}`;
    }
    
    if (isYesterday(date)) {
      return `أمس - ${formatToArabicTime(date)}`;
    }
    
    const day = arabicDays[date.getDay()];
    const dayNumber = date.getDate();
    const month = arabicMonths[date.getMonth()];
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    
    // Convert to 12-hour format with AM/PM in Arabic
    const period = hour >= 12 ? 'م' : 'ص';
    const twelveHour = hour % 12 || 12;
    
    return `${day}، ${dayNumber} ${month} ${year} - ${twelveHour}:${minute.toString().padStart(2, '0')} ${period}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'تاريخ غير صالح';
  }
};

// CallLogsDialog component - place this before the main ProfilePage component
const CallLogsDialog = ({ appointment, onStatusUpdate }: {
  appointment: Appointment,
  onStatusUpdate: (id: number, status: string) => Promise<boolean>
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [callLogs, setCallLogs] = useState<CallLog[]>(appointment.callLogs || []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCallLogs = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`https://www.ss.mastersclinics.com/api/appointments/${appointment.id}/call-logs`);
      
      if (response.ok) {
        const data = await response.json();
        setCallLogs(data.callLogs || []);
      } else if (response.status === 500) {
        // Handle case where the table might not exist
        const errorData = await response.json();
        if (errorData.error?.code === 'ER_NO_SUCH_TABLE') {
          setError('سجل المكالمات غير متوفر حالياً');
        } else {
          setError('فشل في تحميل سجل المكالمات');
        }
      } else {
        setError('فشل في تحميل سجل المكالمات');
      }
    } catch (err) {
      console.error("Failed to fetch call logs:", err);
      setError('فشل في تحميل سجل المكالمات');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCallStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      'answered': 'تم الرد',
      'missed': 'مكالمة فائتة',
      'voicemail': 'البريد الصوتي',
      'no_answer': 'لم يتم الرد',
      'busy': 'خط مشغول',
      'failed': 'فشل الاتصال',
      'completed': 'مكتملة'
    };
    return statusMap[status] || status;
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          onClick={() => {
            setIsOpen(true);
            if (!appointment.callLogs || appointment.callLogs.length === 0) {
              fetchCallLogs();
            }
          }}
        >
          <Phone className="w-4 h-4 ml-1" />
          سجل المكالمات
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent dir="rtl" className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold flex items-center gap-2">
            <Phone className="w-5 h-5" />
            سجل المكالمات للموعد 
          </AlertDialogTitle>
        </AlertDialogHeader>
        
        <div className="py-4">
          {error ? (
            <div className="text-center py-8 text-red-500">
              <AlertCircle className="w-12 h-12 mx-auto mb-4" />
              <p>{error}</p>
            </div>
          ) : isLoading ? (
            <div className="text-center py-8">
              <Loader2 className="w-8 h-8 mx-auto animate-spin text-blue-500" />
              <p className="mt-2 text-gray-600">جاري تحميل سجل المكالمات...</p>
            </div>
          ) : callLogs.length > 0 ? (
            <div className="space-y-4">
              {callLogs.map((log) => (
                <div key={log.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{formatCallStatus(log.status)}</div>
                      <div className="text-sm text-gray-600">
                        {formatToArabicDateTime(log.timestamp_str) || formatToArabicDateTime(log.timestamp)}
                      </div>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      {formatToArabicDateTime(log.timestamp_str) || formatToArabicTime(log.timestamp)}
                    </Badge>
                  </div>
                  
                  {log.notes && (
                    <div className="mt-2 p-2 bg-white rounded border">
                      <div className="font-medium text-sm">ملاحظات:</div>
                      <div className="text-sm">{log.notes}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Phone className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>لا توجد مكالمات مسجلة لهذا الموعد</p>
            </div>
          )}
        </div>
        
        <AlertDialogFooter>
          <AlertDialogCancel className="font-medium">إغلاق</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// Then use these functions in your component instead:
// {log.timestamp_str || formatToCustomArabicDateTime(log.timestamp)}
// {log.timestamp_str || formatToCustomArabicTime(log.timestamp)}
import React, { useCallback, useEffect, useState, useReducer } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Heart, User, Phone, Mail, Edit, Save, X, Trash2, Loader2, Lock, Key } from "lucide-react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserDoctor, faLaptopMedical, faGift } from '@fortawesome/free-solid-svg-icons'
import Navbar from "@/helpers/components/Navbar/Navbar"
import Footer from "@/helpers/components/footer/Footer"
import getImageUrl from "@/utilies/getImageUrl"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "react-toastify"
import Scrollbar from "@/helpers/components/scrollbar/scrollbar"

// Toast Types
type Toast = {
  id: string
  title: string
  message: string
  type: "success" | "error" | "info" | "warning"
  duration?: number
  dismissed?: boolean
}

type ToastState = Toast[]

type ToastAction =
  | { type: "ADD_TOAST"; toast: Toast }
  | { type: "UPDATE_TOAST"; toast: Partial<Toast> & { id: string } }
  | { type: "DISMISS_TOAST"; toastId?: string }
  | { type: "REMOVE_TOAST"; toastId?: string }

// Toast Reducer
function toastReducer(state: ToastState, action: ToastAction): ToastState {
  switch (action.type) {
    case "ADD_TOAST":
      return [...state, action.toast]

    case "UPDATE_TOAST":
      return state.map((t) =>
        t.id === action.toast.id ? { ...t, ...action.toast } : t
      )

    case "DISMISS_TOAST":
      return state.map((t) =>
        action.toastId === undefined || t.id === action.toastId
          ? { ...t, dismissed: true }
          : t
      )

    case "REMOVE_TOAST":
      return state.filter(
        (t) => action.toastId === undefined || t.id !== action.toastId
      )

    default:
      return state
  }
}

// Toast Context
const ToastContext = React.createContext<{
  state: ToastState
  dispatch: React.Dispatch<ToastAction>
}>({
  state: [],
  dispatch: () => null
})

// Toast Provider
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(toastReducer, [])

  return (
    <ToastContext.Provider value={{ state, dispatch }}>
      {children}
    </ToastContext.Provider>
  )
}

// Toast Component
export function Toaster() {
  const { state, dispatch } = React.useContext(ToastContext)

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {state.map((toast) => (
        <div
          key={toast.id}
          className={`p-4 rounded-md shadow-lg ${
            toast.type === "success"
              ? "bg-green-100 text-green-800"
              : toast.type === "error"
              ? "bg-red-100 text-red-800"
              : toast.type === "info"
              ? "bg-blue-100 text-blue-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{toast.title}</h3>
              <p className="text-sm">{toast.message}</p>
            </div>
            <button
              onClick={() => dispatch({ type: "DISMISS_TOAST", toastId: toast.id })}
              className="ml-4"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

// Toast Hook
export function useToast() {
  const { dispatch } = React.useContext(ToastContext)

  const showToast = useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).substring(2, 9)
      dispatch({ type: "ADD_TOAST", toast: { ...toast, id } })

      // Auto-dismiss
      setTimeout(() => {
        dispatch({ type: "DISMISS_TOAST", toastId: id })
      }, toast.duration || 5000)
    },
    [dispatch]
  )

  return { showToast }
}

interface ClientInfo {
  id: number
  unique_number: string
  first_name: string
  last_name: string
  phone_number: string
  email: string
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

// API Response Types
interface ApiResponse<T> {
  success: boolean
  message?: string
  data?: T
}

interface ProfileResponse {
  client: ClientInfo
  wishlist: WishlistItem[]
}

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

export default function ProfilePage() {
  const [clientInfo, setClientInfo] = useState<ClientInfo | null>(null)
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [editState, setEditState] = useState({
    isEditing: false,
    isLoading: false,
    errors: {} as Record<string, string>,
    tempData: {} as Partial<ClientInfo>
  })
  const [emailEditState, setEmailEditState] = useState({
    isEditing: false,
    newEmail: "",
    verificationCode: "",
    isSendingCode: false,
    isVerifying: false,
    error: "",
    codeSent: false
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const searchParams = useSearchParams()
  const router = useRouter()
  const { showToast } = useToast()

  // Move makeRequest inside the component
  const makeRequest = useCallback(async (endpoint: string, options: RequestInit = {}) => {
    const API_BASE_URL = "https://www.ss.mastersclinics.com"
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000)

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : "",
          ...options.headers,
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Unknown error" }))
        throw new Error(errorData.message || `HTTP ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      clearTimeout(timeoutId)
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout')
      }
      throw error
    }
  }, [])

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

  const updateClientInfo = useCallback((client: ClientInfo) => {
    localStorage.setItem("clientInfo", JSON.stringify(client))
  }, [])

  const activeTab = searchParams.get('tab') === 'wishlist' ? 'wishlist' : 'info'

  const transformWishlistItem = (item: ApiWishlistItem): WishlistItem | null => {
    if (!item) return null;
    
    // Doctor item
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
        type: "doctor"
      } as DoctorWishlistItem;
    }
    
    // Offer item
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
        type: "offer"
      } as OfferWishlistItem;
    }
    
    // Device item
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
        type: "device"
      } as DeviceWishlistItem;
    }
    
    return null;
  }

  const fetchProfileData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const clientId = getClientId()
      
      if (!clientId) {
        console.error("Authentication failed - missing clientId or token")
        router.push("/")
        return
      }

      const response = await fetch(
        `https://www.ss.mastersclinics.com/api/client-auth/profile/${clientId}`,
        {
          method: "GET",
        }
      )

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`API Error: ${response.status} - ${errorText}`)
      }

      const data: ApiResponse<ProfileResponse> = await response.json()

      if (!data.data || !data.data.client) {
        throw new Error("Invalid response format: missing client data")
      }

      setClientInfo(data.data.client)
      localStorage.setItem("clientInfo", JSON.stringify(data.data.client))

      // Transform wishlist data
      const transformedWishlist = (data.data.wishlist || [])
        .map(transformWishlistItem)
        .filter((item): item is WishlistItem => item !== null)

      setWishlist(transformedWishlist)
    } catch (err) {
      console.error("Failed to load profile:", err)
      setError(err instanceof Error ? err.message : "Unknown error occurred")
      
      // Retry up to 3 times
      if (retryCount < 3) {
        setTimeout(() => setRetryCount(c => c + 1), 2000)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfileData()
  }, [retryCount])

  // Timeout after 10 seconds if still loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        setError("Request timed out. Please check your connection.")
        setLoading(false)
      }
    }, 10000)

    return () => clearTimeout(timer)
  }, [loading])

  const removeFromWishlist = async (item: WishlistItem) => {
    try {
      const clientId = getClientId()
      if (!clientId) throw new Error("Authentication required")

      // Optimistic update
      setWishlist(prev => prev.filter(i => i.id !== item.id))

      const response = await fetch(
        "https://www.ss.mastersclinics.com/api/wishlist",
        {
          method: "DELETE",
          headers: { 
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client_id: clientId,
            item_type: item.type,
            item_id: item.id,
          }),
        }
      )

      if (!response.ok) throw new Error(`Failed with status ${response.status}`)

      toast.success(`تمت إزالة ${item.type === "doctor" ? "الطبيب" : item.type === "offer" ? "العرض" : "الجهاز"} من المفضلة`)
    } catch (err) {
      console.error("Remove failed:", err)
      toast.error("فشلت عملية الإزالة. يرجى المحاولة مرة أخرى")
      fetchProfileData() // Refresh data
    }
  }

  const validateFields = (data: Partial<ClientInfo>) => {
    const errors: Record<string, string> = {}
    if (data.first_name && data.first_name.length < 2) {
      errors.first_name = "يجب أن يكون الاسم الأول أكثر من حرفين"
    }
    if (data.last_name && data.last_name.length < 2) {
      errors.last_name = "يجب أن يكون الاسم الأخير أكثر من حرفين"
    }
    if (data.phone_number && !/^\+?\d{10,15}$/.test(data.phone_number)) {
      errors.phone_number = "رقم الهاتف غير صحيح"
    }
    return errors
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEditProfile = () => {
    if (!clientInfo) return
    setEditState({
      isEditing: true,
      isLoading: false,
      errors: {},
      tempData: { ...clientInfo }
    })
  }

  const handleSaveProfile = async () => {
    if (!clientInfo) return

    const errors = validateFields(editState.tempData)
    if (Object.keys(errors).length > 0) {
      setEditState(prev => ({ ...prev, errors }))
      return
    }

    setEditState(prev => ({ ...prev, isLoading: true }))

    try {
      const clientId = getClientId()
      if (!clientId) throw new Error("Authentication required")

      const response = await fetch(
        "https://www.ss.mastersclinics.com/api/client-auth/edit-client",
        {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clientId,
            first_name: editState.tempData.first_name || clientInfo.first_name,
            last_name: editState.tempData.last_name || clientInfo.last_name,
            phone_number: editState.tempData.phone_number || clientInfo.phone_number
          })
        }
      )

      if (!response.ok) throw new Error(`Failed with status ${response.status}`)

      const data: ApiResponse<{ client: ClientInfo }> = await response.json()
      if (data.data) {
        setClientInfo(data.data.client)
        localStorage.setItem("clientInfo", JSON.stringify(data.data.client))
      }
      
      setEditState({
        isEditing: false,
        isLoading: false,
        errors: {},
        tempData: {}
      })

      toast.success("تم تحديث البيانات بنجاح")
    } catch (err) {
      console.error("Update failed:", err)
      toast.error("فشل التحديث. يرجى المحاولة مرة أخرى")
      setEditState(prev => ({ ...prev, isLoading: false }))
    }
  }

  const handleCancelEdit = () => {
    if (Object.keys(editState.tempData).length > 0 && 
        !window.confirm("هل تريد تجاهل التغييرات؟")) return
        
    setEditState({
      isEditing: false,
      isLoading: false,
      errors: {},
      tempData: {}
    })
  }

  const handleFieldChange = (field: keyof ClientInfo, value: string) => {
    setEditState(prev => ({
      ...prev,
      tempData: { ...prev.tempData, [field]: value },
      errors: { ...prev.errors, [field]: "" }
    }))
  }

  const handleSendVerificationCode = async () => {
    if (!emailEditState.newEmail) {
      setEmailEditState(prev => ({ ...prev, error: "البريد الإلكتروني مطلوب" }))
      return
    }

    if (!validateEmail(emailEditState.newEmail)) {
      setEmailEditState(prev => ({ ...prev, error: "البريد الإلكتروني غير صحيح" }))
      return
    }

    try {
      setEmailEditState(prev => ({ ...prev, isSendingCode: true, error: "" }))
      
      const clientId = getClientId()
      if (!clientId) throw new Error("Authentication required")

      const response = await fetch(
        "https://www.ss.mastersclinics.com/api/client-auth/authorize",
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailEditState.newEmail
          })
        }
      )

      if (!response.ok) throw new Error(`Failed with status ${response.status}`)

      setEmailEditState(prev => ({ ...prev, codeSent: true }))
      toast.success("تم إرسال رمز التحقق إلى البريد الإلكتروني الجديد")
    } catch (err) {
      console.error("Send verification code failed:", err)
      setEmailEditState(prev => ({ 
        ...prev, 
        error: err instanceof Error ? err.message : "فشل إرسال رمز التحقق" 
      }))
      toast.error("فشل إرسال رمز التحقق. يرجى المحاولة مرة أخرى")
    } finally {
      setEmailEditState(prev => ({ ...prev, isSendingCode: false }))
    }
  }

  const verifyAndChangeEmail = async () => {
    if (!emailEditState.verificationCode) {
      setEmailEditState(prev => ({ ...prev, error: "رمز التحقق مطلوب" }))
      return
    }

    try {
      setEmailEditState(prev => ({ ...prev, isVerifying: true, error: "" }))
      const clientId = getClientId()
      if (!clientId) throw new Error("Authentication required")

      const data = await makeRequest("/api/client-auth/change-email", {
        method: "POST",
        body: JSON.stringify({
          clientId,
          newEmail: emailEditState.newEmail,
          verificationCode: emailEditState.verificationCode
        })
      })

      setClientInfo(data.client)
      updateClientInfo(data.client)
      
      showToast({
        title: "نجح التغيير",
        message: "تم تغيير البريد الإلكتروني بنجاح",
        type: "success"
      })
      
      setEmailEditState({
        isEditing: false,
        newEmail: "",
        verificationCode: "",
        isSendingCode: false,
        isVerifying: false,
        error: "",
        codeSent: false
      })
    } catch (err) {
      setEmailEditState(prev => ({ 
        ...prev, 
        error: err instanceof Error ? err.message : "فشل تغيير البريد الإلكتروني",
        isVerifying: false 
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
      codeSent: false
    })
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "doctor": return <FontAwesomeIcon icon={faUserDoctor} className="text-[#CBA853] text-xl" />
      case "offer": return <FontAwesomeIcon icon={faGift} className="text-[#CBA853] text-xl" />
      case "device": return <FontAwesomeIcon icon={faLaptopMedical} className="text-[#CBA853] text-xl" />
      default: return <FontAwesomeIcon icon={faGift} className="text-gray-500 text-xl" />
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('ar-SA')
    } catch {
      return dateString
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar nav={true} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <Loader2 className="w-12 h-12 mx-auto animate-spin text-[#CBA853]" />
            <p className="mt-4 text-gray-600">جاري تحميل البيانات...</p>
            {retryCount > 0 && (
              <p className="text-sm text-gray-500">محاولة {retryCount} من 3</p>
            )}
          </div>
        </div>
      </div>
    )
  }

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

  if (!clientInfo) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar nav={true} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-600">لا توجد بيانات متاحة</p>
            <Button 
              onClick={() => router.push("/")}
              className="mt-4 bg-[#CBA853] hover:bg-[#A58532]"
            >
              تسجيل الدخول
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" >
      <Navbar nav={true} />
      <div className="container mx-auto px-4 py-8 bg-gray-50" dir="rtl">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">الملف الشخصي</h1>

          <Tabs value={activeTab} className="w-full" dir="rtl">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger 
                value="info" 
                className="flex items-center gap-2"
                onClick={() => router.push('/profile')}
              >
                <User className="w-4 h-4" />
                المعلومات الشخصية
              </TabsTrigger>
              <TabsTrigger 
                value="wishlist" 
                className="flex items-center gap-2"
                onClick={() => router.push('/profile?tab=wishlist')}
              >
                <Heart className="w-4 h-4" />
                قائمة الأمنيات ({wishlist.length})
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
                          <Button
                            onClick={handleCancelEdit}
                            variant="outline"
                            size="sm"
                            disabled={editState.isLoading}
                          >
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
                            value={editState.tempData.first_name || ""}
                            onChange={e => handleFieldChange("first_name", e.target.value)}
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
                            value={editState.tempData.last_name || ""}
                            onChange={e => handleFieldChange("last_name", e.target.value)}
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
                              onChange={e => setEmailEditState(prev => ({ 
                                ...prev, 
                                newEmail: e.target.value,
                                error: ""
                              }))}
                              placeholder="البريد الإلكتروني الجديد"
                              disabled={emailEditState.codeSent}
                            />
                            {emailEditState.codeSent && (
                              <div className="flex items-center gap-2">
                                <Key className="w-4 h-4 text-[#CBA853]" />
                                <Input
                                  value={emailEditState.verificationCode}
                                  onChange={e => setEmailEditState(prev => ({ 
                                    ...prev, 
                                    verificationCode: e.target.value,
                                    error: ""
                                  }))}
                                  placeholder="أدخل رمز التحقق"
                                  maxLength={6}
                                />
                              </div>
                            )}
                          </div>
                          
                          {emailEditState.error && (
                            <p className="text-red-500 text-sm">{emailEditState.error}</p>
                          )}

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
                                  onClick={() => setEmailEditState(prev => ({ 
                                    ...prev, 
                                    codeSent: false, 
                                    verificationCode: "" 
                                  }))}
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
                              onClick={() => setEmailEditState(prev => ({ 
                                ...prev, 
                                isEditing: true,
                                newEmail: clientInfo.email
                              }))}
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
                      <Label htmlFor="phone">رقم الهاتف</Label>
                      {editState.isEditing ? (
                        <>
                          <Input
                            id="phone"
                            value={editState.tempData.phone_number || ""}
                            onChange={e => handleFieldChange("phone_number", e.target.value)}
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
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-[#CBA853]" />
                    قائمة الأمنيات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {wishlist.map(item => (
                        <div 
                          key={`${item.type}-${item.id}`}
                          className="border rounded-lg p-4 relative hover:shadow-md transition-shadow"
                        >
                          <div className="absolute top-2 left-2">
                            {getTypeIcon(item.type)}
                          </div>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="absolute top-2 right-2 text-red-600 hover:text-red-700 p-1 h-auto"
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
                              <div className="mt-2 text-sm text-gray-600 line-clamp-3">
                                {item.services}
                              </div>
                              {item.image && (
                                <div className="mt-4">
                                  <img 
                                    src={getImageUrl(item.image)} 
                                    alt={item.name}
                                    className="w-full h-40 object-cover rounded"
                                  />
                                </div>
                              )}
                            </>
                          )}

                          {/* Offer Item */}
                          {item.type === "offer" && (
                            <>
                              <h3 className="font-semibold text-lg mt-6">{item.title}</h3>
                              {item.description && (
                                <p className="text-gray-600 text-sm">{item.description}</p>
                              )}
                              <div className="mt-2 flex items-center gap-2">
                                <span className="text-gray-500 line-through">{item.priceBefore} ج.م</span>
                                <span className="text-[#CBA853] font-bold">{item.priceAfter} ج.م</span>
                                {item.discountPercentage && (
                                  <Badge variant="outline" className="text-red-600 border-red-600">
                                    خصم {item.discountPercentage}%
                                  </Badge>
                                )}
                              </div>
                              {item.image && (
                                <div className="mt-4">
                                  <img 
                                    src={getImageUrl(item.image)} 
                                    alt={item.title}
                                    className="w-full h-40 object-cover rounded"
                                  />
                                </div>
                              )}
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
                                        const times = JSON.parse(item.available_times);
                                        return Array.isArray(times) ? times.join(", ") : times;
                                      } catch {
                                        return item.available_times.replace(/^"|"$/g, '');
                                      }
                                    })()}
                                  </p>
                                </div>
                              )}
                              
                              {item.image_url && (
                                <div className="mt-4">
                                  <img 
                                    src={getImageUrl(item.image_url)} 
                                    alt={item.name}
                                    className="w-full h-40 object-cover rounded"
                                  />
                                </div>
                              )}
                              
                              <div className="mt-4 flex justify-between items-center">
                                <div className="text-xs text-gray-500">
                                  أضيف في: {formatDate(item.created_at)}
                                </div>
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
          </Tabs>
        </div>
      </div>
      <Footer hclass={'wpo-site-footer'}/>
      <Scrollbar/>
    </div>
  )
}